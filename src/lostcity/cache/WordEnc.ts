import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

export default class WordEnc {
    private static fragments: number[] = [];
    private static bads: Uint16Array[] = [];
    private static badCombinations: number[][][] = [];
    private static domains: Uint16Array[] = [];
    private static tlds: Uint16Array[] = [];
    private static tldTypes: number[] = [];

    private static whitelist: string[] = ['cook', 'cook\'s', 'cooks', 'seeks', 'sheet'];
    private static period: Uint16Array = new Uint16Array(['d', 'o', 't'].join('').split('').map((char) => char.charCodeAt(0)));
    private static ampersat: Uint16Array = new Uint16Array(['(', 'a', ')'].join('').split('').map((char) => char.charCodeAt(0)));
    private static slash: Uint16Array = new Uint16Array(['s', 'l', 'a', 's', 'h'].join('').split('').map((char) => char.charCodeAt(0)));

    static load(dir: string): void {
        if (!fs.existsSync(`${dir}/wordenc`)) {
            console.log('Warning: No wordenc found.');
            return;
        }

        const wordenc = Jagfile.load(`${dir}/wordenc`);

        const fragmentsenc = wordenc.read('fragmentsenc.txt');
        if (!fragmentsenc) {
            console.log('Warning: No fragmentsenc found.');
            return;
        }

        const badenc = wordenc.read('badenc.txt');
        if (!badenc) {
            console.log('Warning: No badenc found.');
            return;
        }

        const domainenc = wordenc.read('domainenc.txt');
        if (!domainenc) {
            console.log('Warning: No domainenc found.');
            return;
        }

        const tldlist = wordenc.read('tldlist.txt');
        if (!tldlist) {
            console.log('Warning: No tldlist found.');
            return;
        }

        this.decodeBadEnc(badenc);
        this.decodeDomainEnc(domainenc);
        this.decodeFragmentsEnc(fragmentsenc);
        this.decodeTldList(tldlist);
    }

    static filter(input: string): string {
        const characters: string[] = [...input];
        this.filterCharacters(characters);
        const trimmed = characters.join('').trim();
        const lowercase = trimmed.toLowerCase();
        const filtered: string[] = [...lowercase];
        this.filterTlds(filtered);
        this.filterBad(filtered);
        this.filterDomains(filtered);
        this.filterFragments(filtered);
        for (let index = 0; index < this.whitelist.length; index++) {
            let offset = -1;
            while ((offset = lowercase.indexOf(this.whitelist[index], offset + 1)) !== -1) {
                const whitelisted: string[] = [...this.whitelist[index]];
                for (let charIndex = 0; charIndex < whitelisted.length; charIndex++) {
                    filtered[charIndex + offset] = whitelisted[charIndex];
                }
            }
        }
        this.replaceUppercases(filtered, [...trimmed]);
        this.formatUppercases(filtered);
        return filtered.join('').trim();
    }

    // ---- TLDLIST

    private static decodeTldList(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.tldTypes[index] = packet.g1();
            this.tlds[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
        }
    }

    // ---- BADENC

    private static decodeBadEnc(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.bads[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
            const combos: number[][] = new Array(packet.g1()).fill([]).map(() => [packet.g1s(), packet.g1s()]);
            if (combos.length > 0) {
                this.badCombinations[index] = combos;
            }
        }
    }

    // ---- DOMAINENC

    private static decodeDomainEnc(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.domains[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
        }
    }

    // ---- FRAGMENTS

    private static decodeFragmentsEnc(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.fragments[index] = packet.g2();
        }
    }

    // ---- FILTERING

    private static filterCharacters(chars: string[]): void {
        let pos = 0;
        for (let index = 0; index < chars.length; index++) {
            if (this.isCharacterAllowed(chars[index])) {
                chars[pos] = chars[index];
            } else {
                chars[pos] = ' ';
            }
            if (pos === 0 || chars[pos] !== ' ' || chars[pos - 1] !== ' ') {
                pos++;
            }
        }
        for (let index = pos; index < chars.length; index++) {
            chars[index] = ' ';
        }
    }

    private static filterFragments(chars: string[]): void {
        let currentIndex = 0;
        let startIndex = 0;
        let count = 0;
        while (true) {
            do {
                let numberIndex;
                if ((numberIndex = this.indexOfNumber(chars, currentIndex)) === -1) {
                    return;
                }
                let isSymbolOrNotLowercaseAlpha = false;
                for (let index = currentIndex; index >= 0 && index < numberIndex && !isSymbolOrNotLowercaseAlpha; index++) {
                    if (!this.isSymbol(chars[index]) && !this.isNotLowercaseAlpha(chars[index])) {
                        isSymbolOrNotLowercaseAlpha = true;
                    }
                }
                if (isSymbolOrNotLowercaseAlpha) {
                    startIndex = 0;
                }
                if (startIndex == 0) {
                    count = numberIndex;
                }
                currentIndex = this.indexOfNonNumber(numberIndex, chars);
                let value = 0;
                for (let index = numberIndex; index < currentIndex; index++) {
                    value = value * 10 + chars[index].charCodeAt(0) - 48;
                }
                if (value <= 255 && currentIndex - numberIndex <= 8) {
                    startIndex++;
                } else {
                    startIndex = 0;
                }
            } while (startIndex != 4);
            for (let index = count; index < currentIndex; index++) {
                chars[index] = '*';
            }
            startIndex = 0;
        }
    }

    private static filterBad(chars: string[]): void {
        for (let comboIndex = 0; comboIndex < 2; comboIndex++) {
            for (let index = this.bads.length - 1; index >= 0; index--) {
                this.filterBadCombinations(this.badCombinations[index], chars, this.bads[index]);
            }
        }
    }

    private static filterBadCombinations(combos: number[][] | null, chars: string[], bads: Uint16Array): void {
        if (bads.length > chars.length) {
            return;
        }
        let offset: number;
        for (let startIndex = 0; startIndex <= chars.length - bads.length; startIndex += offset) {
            let currentIndex = startIndex;
            let badIndex = 0;
            let count = 0;
            offset = 1;
            let hasSymbol = false;
            let hasNumber = false;
            let hasDigit = false;
            let currentChar: string;
            let nextChar: string;
            label: while (true) {
                while (true) {
                    if (currentIndex >= chars.length || hasNumber && hasDigit) {
                        break label;
                    }
                    currentChar = chars[currentIndex];
                    nextChar = '\u0000';
                    if (currentIndex + 1 < chars.length) {
                        nextChar = chars[currentIndex + 1];
                    }
                    let currentLength: number;
                    if (badIndex < bads.length && (currentLength = this.getEmulatedBadCharLen(nextChar, String.fromCharCode(bads[badIndex]), currentChar)) > 0) {
                        if (currentLength == 1 && this.isNumeral(currentChar)) {
                            hasNumber = true;
                        }
                        if (currentLength == 2 && (this.isNumeral(currentChar) || this.isNumeral(nextChar))) {
                            hasNumber = true;
                        }
                        currentIndex += currentLength;
                        badIndex++;
                    } else {
                        if (badIndex == 0) {
                            break label;
                        }
                        let previousLength: number;
                        if ((previousLength = this.getEmulatedBadCharLen(nextChar, String.fromCharCode(bads[badIndex - 1]), currentChar)) > 0) {
                            currentIndex += previousLength;
                            if (badIndex == 1) {
                                offset++;
                            }
                        } else {
                            if (badIndex >= bads.length || !this.isNotLowercaseAlpha(currentChar)) {
                                break label;
                            }
                            if (this.isSymbol(currentChar) && currentChar != '\'') {
                                hasSymbol = true;
                            }
                            if (this.isNumeral(currentChar)) {
                                hasDigit = true;
                            }
                            currentIndex++;
                            count++;
                            if (count * 100 / (currentIndex - startIndex) > 90) {
                                break label;
                            }
                        }
                    }
                }
            }
            if (badIndex >= bads.length && (!hasNumber || !hasDigit)) {
                let shouldFilter = true;
                let localIndex;
                if (hasSymbol) {
                    let isBeforeSymbol = false;
                    let isAfterSymbol = false;
                    if (startIndex - 1 < 0 || this.isSymbol(chars[startIndex - 1]) && chars[startIndex - 1] != '\'') {
                        isBeforeSymbol = true;
                    }
                    if (currentIndex >= chars.length || this.isSymbol(chars[currentIndex]) && chars[currentIndex] != '\'') {
                        isAfterSymbol = true;
                    }
                    if (!isBeforeSymbol || !isAfterSymbol) {
                        let isSubstringValid = false;
                        localIndex = startIndex - 2;
                        if (isBeforeSymbol) {
                            localIndex = startIndex;
                        }
                        while (!isSubstringValid && localIndex < currentIndex) {
                            if (localIndex >= 0 && (!this.isSymbol(chars[localIndex]) || chars[localIndex] == '\'')) {
                                const localSubString: string[] = [];
                                let localSubStringIndex;
                                for (localSubStringIndex = 0; localSubStringIndex < 3 && localIndex + localSubStringIndex < chars.length && (!this.isSymbol(chars[localIndex + localSubStringIndex]) || chars[localIndex + localSubStringIndex] == '\''); localSubStringIndex++) {
                                    localSubString[localSubStringIndex] = chars[localIndex + localSubStringIndex];
                                }
                                let isSubStringValidCondition = true;
                                if (localSubStringIndex == 0) {
                                    isSubStringValidCondition = false;
                                }
                                if (localSubStringIndex < 3 && localIndex - 1 >= 0 && (!this.isSymbol(chars[localIndex - 1]) || chars[localIndex - 1] == '\'')) {
                                    isSubStringValidCondition = false;
                                }
                                if (isSubStringValidCondition && !this.isBadFragment(localSubString)) {
                                    isSubstringValid = true;
                                }
                            }
                            localIndex++;
                        }
                        if (!isSubstringValid) {
                            shouldFilter = false;
                        }
                    }
                } else {
                    currentChar = ' ';
                    if (startIndex - 1 >= 0) {
                        currentChar = chars[startIndex - 1];
                    }
                    nextChar = ' ';
                    if (currentIndex < chars.length) {
                        nextChar = chars[currentIndex];
                    }
                    const current = this.getIndex(currentChar);
                    const next = this.getIndex(nextChar);
                    if (combos != null && this.comboMatches(current, combos, next)) {
                        shouldFilter = false;
                    }
                }
                if (shouldFilter) {
                    let numeralCount = 0;
                    let alphaCount = 0;
                    for (let index = startIndex; index < currentIndex; index++) {
                        if (this.isNumeral(chars[index])) {
                            numeralCount++;
                        } else if (this.isAlpha(chars[index])) {
                            alphaCount++;
                        }
                    }
                    if (numeralCount <= alphaCount) {
                        for (localIndex = startIndex; localIndex < currentIndex; localIndex++) {
                            chars[localIndex] = '*';
                        }
                    }
                }
            }
        }
    }

    private static filterDomains(chars: string[]): void {
        const ampersat: string[] = [...chars];
        this.filterBadCombinations(null, ampersat, this.ampersat);
        const period: string[] = [...chars];
        this.filterBadCombinations(null, period, this.period);
        for (let index = this.domains.length - 1; index >= 0; index--) {
            this.filterDomain(period, ampersat, this.domains[index], chars);
        }
    }

    private static filterDomain(period: string[], ampersat: string[], domain: Uint16Array, chars: string[]): void {
        if (domain.length > chars.length) {
            return;
        }
        let offset: number;
        for (let startIndex = 0; startIndex <= chars.length - domain.length; startIndex += offset) {
            let currentIndex = startIndex;
            let domainIndex = 0;
            offset = 1;
            label: while (true) {
                while (true) {
                    if (currentIndex >= chars.length) {
                        break label;
                    }
                    const currentChar = chars[currentIndex];
                    let nextChar = '\u0000';
                    if (currentIndex + 1 < chars.length) {
                        nextChar = chars[currentIndex + 1];
                    }
                    let currentLength: number;
                    if (domainIndex < domain.length && (currentLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex]), currentChar)) > 0) {
                        currentIndex += currentLength;
                        domainIndex++;
                    } else {
                        if (domainIndex == 0) {
                            break label;
                        }
                        let previousLength: number;
                        if ((previousLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex - 1]), currentChar)) > 0) {
                            currentIndex += previousLength;
                            if (domainIndex == 1) {
                                offset++;
                            }
                        } else {
                            if (domainIndex >= domain.length || !this.isSymbol(currentChar)) {
                                break label;
                            }
                            currentIndex++;
                        }
                    }
                }
            }
            if (domainIndex >= domain.length) {
                let shouldFilter = false;
                const ampersatFilterStatus = this.getDomainAtFilterStatus(startIndex, chars, ampersat);
                const periodFilterStatus = this.getDomainDotFilterStatus(period, chars, currentIndex - 1);
                if (ampersatFilterStatus > 2 || periodFilterStatus > 2) {
                    shouldFilter = true;
                }
                if (shouldFilter) {
                    for (let index = startIndex; index < currentIndex; index++) {
                        chars[index] = '*';
                    }
                }
            }
        }
    }

    private static filterTlds(chars: string[]): void {
        const period: string[] = [...chars];
        this.filterBadCombinations(null, period, this.period);
        const slash: string[] = [...chars];
        this.filterBadCombinations(null, slash, this.slash);
        for (let index = 0; index < this.tlds.length; index++) {
            this.filterTld(slash, this.tldTypes[index], chars, this.tlds[index], period);
        }
    }

    private static filterTld(slash: string[], tldType: number, chars: string[], tld: Uint16Array, period: string[]): void {
        if (tld.length > chars.length) {
            return;
        }
        let offset: number;
        for (let startIndex = 0; startIndex <= chars.length - tld.length; startIndex += offset) {
            let currentIndex = startIndex;
            let tldIndex = 0;
            offset = 1;
            label: while (true) {
                while (true) {
                    if (currentIndex >= chars.length) {
                        break label;
                    }
                    const currentChar = chars[currentIndex];
                    let nextChar = '\u0000';
                    if (currentIndex + 1 < chars.length) {
                        nextChar = chars[currentIndex + 1];
                    }
                    let currentLength: number;
                    if (tldIndex < tld.length && (currentLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex]), currentChar)) > 0) {
                        currentIndex += currentLength;
                        tldIndex++;
                    } else {
                        if (tldIndex == 0) {
                            break label;
                        }
                        let previousLength: number;
                        if ((previousLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex - 1]), currentChar)) > 0) {
                            currentIndex += previousLength;
                            if (tldIndex == 1) {
                                offset++;
                            }
                        } else {
                            if (tldIndex >= tld.length || !this.isSymbol(currentChar)) {
                                break label;
                            }
                            currentIndex++;
                        }
                    }
                }
            }
            if (tldIndex >= tld.length) {
                let shouldFilter = false;
                const periodFilterStatus = this.getTldDotFilterStatus(chars, period, startIndex);
                const slashFilterStatus = this.getTldSlashFilterStatus(slash, currentIndex - 1, chars);
                if (tldType == 1 && periodFilterStatus > 0 && slashFilterStatus > 0) {
                    shouldFilter = true;
                }
                if (tldType == 2 && (periodFilterStatus > 2 && slashFilterStatus > 0 || periodFilterStatus > 0 && slashFilterStatus > 2)) {
                    shouldFilter = true;
                }
                if (tldType == 3 && periodFilterStatus > 0 && slashFilterStatus > 2) {
                    shouldFilter = true;
                }
                // dead code.
                /* boolean local172;
                if (tldType == 3 && periodFilterStatus > 2 && slashFilterStatus > 0) {
                    local172 = true;
                } else {
                    local172 = false;
                }*/
                if (shouldFilter) {
                    let startFilterIndex = startIndex;
                    let endFilterIndex = currentIndex - 1;
                    let foundPeriod = false;
                    let periodIndex;
                    if (periodFilterStatus > 2) {
                        if (periodFilterStatus == 4) {
                            foundPeriod = false;
                            for (periodIndex = startIndex - 1; periodIndex >= 0; periodIndex--) {
                                if (foundPeriod) {
                                    if (period[periodIndex] != '*') {
                                        break;
                                    }
                                    startFilterIndex = periodIndex;
                                } else if (period[periodIndex] == '*') {
                                    startFilterIndex = periodIndex;
                                    foundPeriod = true;
                                }
                            }
                        }
                        foundPeriod = false;
                        for (periodIndex = startFilterIndex - 1; periodIndex >= 0; periodIndex--) {
                            if (foundPeriod) {
                                if (this.isSymbol(chars[periodIndex])) {
                                    break;
                                }
                                startFilterIndex = periodIndex;
                            } else if (!this.isSymbol(chars[periodIndex])) {
                                foundPeriod = true;
                                startFilterIndex = periodIndex;
                            }
                        }
                    }
                    if (slashFilterStatus > 2) {
                        if (slashFilterStatus == 4) {
                            foundPeriod = false;
                            for (periodIndex = endFilterIndex + 1; periodIndex < chars.length; periodIndex++) {
                                if (foundPeriod) {
                                    if (slash[periodIndex] != '*') {
                                        break;
                                    }
                                    endFilterIndex = periodIndex;
                                } else if (slash[periodIndex] == '*') {
                                    endFilterIndex = periodIndex;
                                    foundPeriod = true;
                                }
                            }
                        }
                        foundPeriod = false;
                        for (periodIndex = endFilterIndex + 1; periodIndex < chars.length; periodIndex++) {
                            if (foundPeriod) {
                                if (this.isSymbol(chars[periodIndex])) {
                                    break;
                                }
                                endFilterIndex = periodIndex;
                            } else if (!this.isSymbol(chars[periodIndex])) {
                                foundPeriod = true;
                                endFilterIndex = periodIndex;
                            }
                        }
                    }
                    for (let index = startFilterIndex; index <= endFilterIndex; index++) {
                        chars[index] = '*';
                    }
                }
            }
        }
    }

    // ---- MISC

    private static isCharacterAllowed(char: string): boolean {
        return char >= ' ' && char <= '\u007f' || char == ' ' || char == '\n' || char == '\t' || char == '£' || char == '€';
    }

    private static replaceUppercases(chars: string[], comparison: string[]): void {
        for (let index = 0; index < comparison.length; index++) {
            if (chars[index] !== '*' && this.isUppercaseAlpha(comparison[index])) {
                chars[index] = comparison[index];
            }
        }
    }

    private static formatUppercases(chars: string[]): void {
        let flagged = true;
        for (let index = 0; index < chars.length; index++) {
            const char = chars[index];
            if (!this.isAlpha(char)) {
                flagged = true;
            } else if (flagged) {
                if (this.isLowercaseAlpha(char)) {
                    flagged = false;
                }
            } else if (this.isUppercaseAlpha(char)) {
                chars[index] = String.fromCharCode(char.charCodeAt(0) + 'a'.charCodeAt(0) - 65);
            }
        }
    }

    private static indexOfNumber(chars: string[], offset: number): number {
        for (let index = offset; index < chars.length && index >= 0; index++) {
            if (chars[index] >= '0' && chars[index] <= '9') {
                return index;
            }
        }
        return -1;
    }

    private static indexOfNonNumber(offset: number, chars: string[]): number {
        let index = offset;
        while (true) {
            if (index < chars.length && index >= 0) {
                if (chars[index] >= '0' && chars[index] <= '9') {
                    index++;
                    continue;
                }
                return index;
            }
            return chars.length;
        }
    }

    private static isSymbol(char: string): boolean {
        return !this.isAlpha(char) && !this.isNumeral(char);
    }

    private static isNotLowercaseAlpha(char: string): boolean {
        return char >= 'a' && char <= 'z' ? char == 'v' || char == 'x' || char == 'j' || char == 'q' || char == 'z' : true;
    }

    private static isAlpha(char: string): boolean {
        return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z';
    }

    private static isNumeral(char: string): boolean {
        return char >= '0' && char <= '9';
    }

    private static isLowercaseAlpha(char: string): boolean {
        return char >= 'a' && char <= 'z';
    }

    private static isUppercaseAlpha(char: string): boolean {
        return char >= 'A' && char <= 'Z';
    }

    private static getDomainAtFilterStatus(offset: number, chars: string[], ampersat: string[]): number {
        if (offset == 0) {
            return 2;
        }
        for (let index = offset - 1; index >= 0 && this.isSymbol(chars[index]); index--) {
            if (chars[index] == '@') {
                return 3;
            }
        }
        let filterCount = 0;
        for (let index = offset - 1; index >= 0 && this.isSymbol(ampersat[index]); index--) {
            if (ampersat[index] == '*') {
                filterCount++;
            }
        }
        if (filterCount >= 3) {
            return 4;
        } else if (this.isSymbol(chars[offset - 1])) {
            return 1;
        }
        return 0;
    }

    private static getDomainDotFilterStatus(period: string[], chars: string[], offset: number): number {
        if (offset + 1 == chars.length) {
            return 2;
        }
        let charIndex = offset + 1;
        while (true) {
            if (charIndex < chars.length && this.isSymbol(chars[charIndex])) {
                if (chars[charIndex] != '.' && chars[charIndex] != ',') {
                    charIndex++;
                    continue;
                }
                return 3;
            }
            let filterCount = 0;
            for (let periodIndex = offset + 1; periodIndex < chars.length && this.isSymbol(period[periodIndex]); periodIndex++) {
                if (period[periodIndex] == '*') {
                    filterCount++;
                }
            }
            if (filterCount >= 3) {
                return 4;
            }
            if (this.isSymbol(chars[offset + 1])) {
                return 1;
            }
            return 0;
        }
    }

    private static getTldDotFilterStatus(chars: string[], period: string[], offset: number): number {
        if (offset == 0) {
            return 2;
        }
        let charIndex = offset - 1;
        while (true) {
            if (charIndex >= 0 && this.isSymbol(chars[charIndex])) {
                if (chars[charIndex] != ',' && chars[charIndex] != '.') {
                    charIndex--;
                    continue;
                }
                return 3;
            }
            let filterCount = 0;
            for (let periodIndex = offset - 1; periodIndex >= 0 && this.isSymbol(period[periodIndex]); periodIndex--) {
                if (period[periodIndex] == '*') {
                    filterCount++;
                }
            }
            if (filterCount >= 3) {
                return 4;
            }
            if (this.isSymbol(chars[offset - 1])) {
                return 1;
            }
            return 0;
        }
    }

    private static getTldSlashFilterStatus(slash: string[], offset: number, chars: string[]): number {
        if (offset + 1 == chars.length) {
            return 2;
        }
        let charIndex = offset + 1;
        while (true) {
            if (charIndex < chars.length && this.isSymbol(chars[charIndex])) {
                if (chars[charIndex] != '\\' && chars[charIndex] != '/') {
                    charIndex++;
                    continue;
                }
                return 3;
            }
            let filterCount = 0;
            for (let slashIndex = offset + 1; slashIndex < chars.length && this.isSymbol(slash[slashIndex]); slashIndex++) {
                if (slash[slashIndex] == '*') {
                    filterCount++;
                }
            }
            if (filterCount >= 5) {
                return 4;
            }
            if (this.isSymbol(chars[offset + 1])) {
                return 1;
            }
            return 0;
        }
    }

    private static getEmulatedDomainCharLen(nextChar: string, domainChar: string, currentChar: string): number {
        if (domainChar == currentChar) {
            return 1;
        } else if (domainChar == 'o' && currentChar == '0') {
            return 1;
        } else if (domainChar == 'o' && currentChar == '(' && nextChar == ')') {
            return 2;
        } else if (domainChar == 'c' && (currentChar == '(' || currentChar == '<' || currentChar == '[')) {
            return 1;
        } else if (domainChar == 'e' && currentChar == '€') {
            return 1;
        } else if (domainChar == 's' && currentChar == '$') {
            return 1;
        } else if (domainChar == 'l' && currentChar == 'i') {
            return 1;
        }
        return 0;
    }

    private static getEmulatedBadCharLen(nextChar: string, badChar: string, currentChar: string): number {
        if (badChar == currentChar) {
            return 1;
        }
        if (badChar >= 'a' && badChar <= 'm') {
            if (badChar == 'a') {
                if (currentChar != '4' && currentChar != '@' && currentChar != '^') {
                    if (currentChar == '/' && nextChar == '\\') {
                        return 2;
                    }
                    return 0;
                }
                return 1;
            }
            if (badChar == 'b') {
                if (currentChar != '6' && currentChar != '8') {
                    if (currentChar == '1' && nextChar == '3') {
                        return 2;
                    }
                    return 0;
                }
                return 1;
            }
            if (badChar == 'c') {
                if (currentChar != '(' && currentChar != '<' && currentChar != '{' && currentChar != '[') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'd') {
                if (currentChar == '[' && nextChar == ')') {
                    return 2;
                }
                return 0;
            }
            if (badChar == 'e') {
                if (currentChar != '3' && currentChar != '€') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'f') {
                if (currentChar == 'p' && nextChar == 'h') {
                    return 2;
                }
                if (currentChar == '£') {
                    return 1;
                }
                return 0;
            }
            if (badChar == 'g') {
                if (currentChar != '9' && currentChar != '6') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'h') {
                if (currentChar == '#') {
                    return 1;
                }
                return 0;
            }
            if (badChar == 'i') {
                if (currentChar != 'y' && currentChar != 'l' && currentChar != 'j' && currentChar != '1' && currentChar != '!' && currentChar != ':' && currentChar != ';' && currentChar != '|') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'j') {
                return 0;
            }
            if (badChar == 'k') {
                return 0;
            }
            if (badChar == 'l') {
                if (currentChar != '1' && currentChar != '|' && currentChar != 'i') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'm') {
                return 0;
            }
        }
        if (badChar >= 'n' && badChar <= 'z') {
            if (badChar == 'n') {
                return 0;
            }
            if (badChar == 'o') {
                if (currentChar != '0' && currentChar != '*') {
                    if ((currentChar != '(' || nextChar != ')') && (currentChar != '[' || nextChar != ']') && (currentChar != '{' || nextChar != '}') && (currentChar != '<' || nextChar != '>')) {
                        return 0;
                    }
                    return 2;
                }
                return 1;
            }
            if (badChar == 'p') {
                return 0;
            }
            if (badChar == 'q') {
                return 0;
            }
            if (badChar == 'r') {
                return 0;
            }
            if (badChar == 's') {
                if (currentChar != '5' && currentChar != 'z' && currentChar != '$' && currentChar != '2') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 't') {
                if (currentChar != '7' && currentChar != '+') {
                    return 0;
                }
                return 1;
            }
            if (badChar == 'u') {
                if (currentChar == 'v') {
                    return 1;
                }
                if ((currentChar != '\\' || nextChar != '/') && (currentChar != '\\' || nextChar != '|') && (currentChar != '|' || nextChar != '/')) {
                    return 0;
                }
                return 2;
            }
            if (badChar == 'v') {
                if ((currentChar != '\\' || nextChar != '/') && (currentChar != '\\' || nextChar != '|') && (currentChar != '|' || nextChar != '/')) {
                    return 0;
                }
                return 2;
            }
            if (badChar == 'w') {
                if (currentChar == 'v' && nextChar == 'v') {
                    return 2;
                }
                return 0;
            }
            if (badChar == 'x') {
                if ((currentChar != ')' || nextChar != '(') && (currentChar != '}' || nextChar != '{') && (currentChar != ']' || nextChar != '[') && (currentChar != '>' || nextChar != '<')) {
                    return 0;
                }
                return 2;
            }
            if (badChar == 'y') {
                return 0;
            }
            if (badChar == 'z') {
                return 0;
            }
        }
        if (badChar >= '0' && badChar <= '9') {
            if (badChar == '0') {
                if (currentChar == 'o' || currentChar == 'O') {
                    return 1;
                } else if ((currentChar != '(' || nextChar != ')') && (currentChar != '{' || nextChar != '}') && (currentChar != '[' || nextChar != ']')) {
                    return 0;
                } else {
                    return 2;
                }
            } else if (badChar == '1') {
                return currentChar == 'l' ? 1 : 0;
            } else {
                return 0;
            }
        } else if (badChar == ',') {
            return currentChar == '.' ? 1 : 0;
        } else if (badChar == '.') {
            return currentChar == ',' ? 1 : 0;
        } else if (badChar == '!') {
            return currentChar == 'i' ? 1 : 0;
        }
        return 0;
    }

    private static comboMatches(currentIndex: number, combos: number[][], nextIndex: number): boolean {
        let start = 0;
        if (combos[0][0] == currentIndex && combos[0][1] == nextIndex) {
            return true;
        }
        let end = combos.length - 1;
        if (combos[end][0] == currentIndex && combos[end][1] == nextIndex) {
            return true;
        }
        do {
            const mid = Math.floor((start + end) / 2); // client does not floor here.
            if (combos[mid][0] == currentIndex && combos[mid][1] == nextIndex) {
                return true;
            }
            if (currentIndex < combos[mid][0] || currentIndex == combos[mid][0] && nextIndex < combos[mid][1]) {
                end = mid;
            } else {
                start = mid;
            }
        } while (start != end && start + 1 != end);
        return false;
    }

    private static isBadFragment(chars: string[]): boolean {
        let isNumerical = true;
        for (let index = 0; index < chars.length; index++) {
            if (!this.isNumeral(chars[index]) && chars[index] != '\u0000') {
                isNumerical = false;
                break; // client does not do this but this is faster.
            }
        }
        if (isNumerical) {
            return true;
        }
        const value = this.getInteger(chars);
        let start = 0;
        let end = this.fragments.length - 1;
        if (value == this.fragments[0] || value == this.fragments[end]) {
            return true;
        }
        do {
            const mid = Math.floor((start + end) / 2); // client does not floor here.
            if (value == this.fragments[mid]) {
                return true;
            }
            if (value < this.fragments[mid]) {
                end = mid;
            } else {
                start = mid;
            }
        } while (start != end && start + 1 != end);
        return false;
    }

    private static getInteger(chars: string[]): number {
        if (chars.length > 6) {
            return 0;
        }
        let value = 0;
        for (let index = 0; index < chars.length; index++) {
            const char = chars[chars.length - index - 1];
            if (char >= 'a' && char <= 'z') {
                value = value * 38 + char.charCodeAt(0) + 1 - 'a'.charCodeAt(0);
            } else if (char == '\'') {
                value = value * 38 + 27;
            } else if (char >= '0' && char <= '9') {
                value = value * 38 + char.charCodeAt(0) + 28 - '0'.charCodeAt(0);
            } else if (char != '\u0000') {
                return 0;
            }
        }
        return value;
    }

    private static getIndex(char: string): number {
        if (char >= 'a' && char <= 'z') {
            return char.charCodeAt(0) + 1 - 'a'.charCodeAt(0);
        } else if (char == '\'') {
            return 28;
        } else if (char >= '0' && char <= '9') {
            return char.charCodeAt(0) + 29 - '0'.charCodeAt(0);
        }
        return 27;
    }
}