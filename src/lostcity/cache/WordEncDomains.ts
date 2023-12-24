import WordEncBadWords from '#lostcity/cache/WordEncBadWords.js';
import WordEnc from '#lostcity/cache/WordEnc.js';

export default class WordEncDomains {
    private readonly wordEncBadWords: WordEncBadWords;

    readonly domains: Uint16Array[] = [];

    constructor(wordEncBadWords: WordEncBadWords) {
        this.wordEncBadWords = wordEncBadWords;
    }

    filter(chars: string[]): void {
        const ampersat: string[] = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, ampersat, WordEnc.AMPERSAT);
        const period: string[] = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, period, WordEnc.PERIOD);
        for (let index = this.domains.length - 1; index >= 0; index--) {
            this.filterDomain(period, ampersat, this.domains[index], chars);
        }
    }

    getEmulatedDomainCharLen(nextChar: string, domainChar: string, currentChar: string): number {
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

    private filterDomain(period: string[], ampersat: string[], domain: Uint16Array, chars: string[]): void {
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
                            if (domainIndex >= domain.length || !WordEnc.isSymbol(currentChar)) {
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

    private getDomainAtFilterStatus(offset: number, chars: string[], ampersat: string[]): number {
        if (offset == 0) {
            return 2;
        }
        for (let index = offset - 1; index >= 0 && WordEnc.isSymbol(chars[index]); index--) {
            if (chars[index] == '@') {
                return 3;
            }
        }
        let filterCount = 0;
        for (let index = offset - 1; index >= 0 && WordEnc.isSymbol(ampersat[index]); index--) {
            if (ampersat[index] == '*') {
                filterCount++;
            }
        }
        if (filterCount >= 3) {
            return 4;
        } else if (WordEnc.isSymbol(chars[offset - 1])) {
            return 1;
        }
        return 0;
    }

    private getDomainDotFilterStatus(period: string[], chars: string[], offset: number): number {
        if (offset + 1 == chars.length) {
            return 2;
        }
        let charIndex = offset + 1;
        while (true) {
            if (charIndex < chars.length && WordEnc.isSymbol(chars[charIndex])) {
                if (chars[charIndex] != '.' && chars[charIndex] != ',') {
                    charIndex++;
                    continue;
                }
                return 3;
            }
            let filterCount = 0;
            for (let periodIndex = offset + 1; periodIndex < chars.length && WordEnc.isSymbol(period[periodIndex]); periodIndex++) {
                if (period[periodIndex] == '*') {
                    filterCount++;
                }
            }
            if (filterCount >= 3) {
                return 4;
            }
            if (WordEnc.isSymbol(chars[offset + 1])) {
                return 1;
            }
            return 0;
        }
    }
}
