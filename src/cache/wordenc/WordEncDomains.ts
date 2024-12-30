import WordEncBadWords from '#/cache/wordenc/WordEncBadWords.js';
import WordEnc from '#/cache/wordenc/WordEnc.js';

export default class WordEncDomains {
    private readonly wordEncBadWords: WordEncBadWords;

    readonly domains: Uint16Array[] = [];

    constructor(wordEncBadWords: WordEncBadWords) {
        this.wordEncBadWords = wordEncBadWords;
    }

    filter(chars: string[]): void {
        const ampersat = [...chars];
        const period = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, ampersat, WordEnc.AMPERSAT);
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
        const domainLength = domain.length;
        const charsLength = chars.length;
        for (let index = 0; index <= charsLength - domainLength; index++) {
            const { matched, currentIndex } = this.findMatchingDomain(index, domain, chars);
            if (!matched) {
                continue;
            }
            const ampersatStatus = WordEnc.prefixSymbolStatus(index, chars, 3, ampersat, ['@']);
            const periodStatus = WordEnc.suffixSymbolStatus(currentIndex - 1, chars, 3, period, ['.', ',']);
            const shouldFilter = ampersatStatus > 2 || periodStatus > 2;
            if (!shouldFilter) {
                continue;
            }
            WordEnc.maskChars(index, currentIndex, chars);
        }
    }

    private findMatchingDomain(startIndex: number, domain: Uint16Array, chars: string[]): { matched: boolean; currentIndex: number } {
        const domainLength = domain.length;
        let currentIndex = startIndex;
        let domainIndex = 0;

        while (currentIndex < chars.length && domainIndex < domainLength) {
            const currentChar = chars[currentIndex];
            const nextChar = currentIndex + 1 < chars.length ? chars[currentIndex + 1] : '\u0000';
            const currentLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex]), currentChar);

            if (currentLength > 0) {
                currentIndex += currentLength;
                domainIndex++;
            } else {
                if (domainIndex === 0) break;
                const previousLength = this.getEmulatedDomainCharLen(nextChar, String.fromCharCode(domain[domainIndex - 1]), currentChar);

                if (previousLength > 0) {
                    currentIndex += previousLength;
                    if (domainIndex === 1) startIndex++;
                } else {
                    if (domainIndex >= domainLength || !WordEnc.isSymbol(currentChar)) break;
                    currentIndex++;
                }
            }
        }

        return { matched: domainIndex >= domainLength, currentIndex };
    }
}
