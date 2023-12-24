import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import Packet from '#jagex2/io/Packet.js';

import WordEncFragments from '#lostcity/cache/WordEncFragments.js';
import WordEncBadWords from '#lostcity/cache/WordEncBadWords.js';
import WordEncDomains from '#lostcity/cache/WordEncDomains.js';
import WordEncTlds from '#lostcity/cache/WordEncTlds.js';

export default class WordEnc {
    static PERIOD = new Uint16Array(['d', 'o', 't'].join('').split('').map((char) => char.charCodeAt(0)));
    static AMPERSAT = new Uint16Array(['(', 'a', ')'].join('').split('').map((char) => char.charCodeAt(0)));
    static SLASH = new Uint16Array(['s', 'l', 'a', 's', 'h'].join('').split('').map((char) => char.charCodeAt(0)));

    private static wordEncFragments = new WordEncFragments();
    private static wordEncBadWords = new WordEncBadWords(this.wordEncFragments);
    private static wordEncDomains = new WordEncDomains(this.wordEncBadWords);
    private static wordEncTlds = new WordEncTlds(this.wordEncBadWords, this.wordEncDomains);

    private static whitelist = ['cook', 'cook\'s', 'cooks', 'seeks', 'sheet'];

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
        const characters = [...input];
        this.filterCharacters(characters);
        const trimmed = characters.join('').trim();
        const lowercase = trimmed.toLowerCase();
        const filtered = [...lowercase];
        this.wordEncTlds.filter(filtered);
        this.wordEncBadWords.filter(filtered);
        this.wordEncDomains.filter(filtered);
        this.wordEncFragments.filter(filtered);
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

    static isSymbol(char: string): boolean {
        return !this.isAlpha(char) && !this.isNumeral(char);
    }

    static isNotLowercaseAlpha(char: string): boolean {
        return char >= 'a' && char <= 'z' ? char == 'v' || char == 'x' || char == 'j' || char == 'q' || char == 'z' : true;
    }

    static isAlpha(char: string): boolean {
        return char >= 'a' && char <= 'z' || char >= 'A' && char <= 'Z';
    }

    static isNumeral(char: string): boolean {
        return char >= '0' && char <= '9';
    }

    private static decodeTldList(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncTlds.tldTypes[index] = packet.g1();
            this.wordEncTlds.tlds[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
        }
    }

    private static decodeBadEnc(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncBadWords.bads[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
            const combos: number[][] = new Array(packet.g1()).fill([]).map(() => [packet.g1s(), packet.g1s()]);
            if (combos.length > 0) {
                this.wordEncBadWords.badCombinations[index] = combos;
            }
        }
    }

    private static decodeDomainEnc(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncDomains.domains[index] = new Uint16Array(packet.g1()).map(() => packet.g1());
        }
    }

    private static decodeFragmentsEnc(packet: Packet): void {
        const count = packet.g4();
        for (let index = 0; index < count; index++) {
            this.wordEncFragments.fragments[index] = packet.g2();
        }
    }

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

    private static isLowercaseAlpha(char: string): boolean {
        return char >= 'a' && char <= 'z';
    }

    private static isUppercaseAlpha(char: string): boolean {
        return char >= 'A' && char <= 'Z';
    }
}
