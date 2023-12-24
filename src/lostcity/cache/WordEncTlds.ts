import WordEncBadWords from '#lostcity/cache/WordEncBadWords.js';
import WordEncDomains from '#lostcity/cache/WordEncDomains.js';
import WordEnc from '#lostcity/cache/WordEnc.js';

export default class WordEncTlds {
    private readonly wordEncBadWords: WordEncBadWords;
    private readonly wordEncDomains: WordEncDomains;

    readonly tlds: Uint16Array[] = [];
    readonly tldTypes: number[] = [];

    constructor(wordEncBadWords: WordEncBadWords, wordEncDomains: WordEncDomains) {
        this.wordEncBadWords = wordEncBadWords;
        this.wordEncDomains = wordEncDomains;
    }

    filter(chars: string[]): void {
        const period: string[] = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, period, WordEnc.PERIOD);
        const slash: string[] = [...chars];
        this.wordEncBadWords.filterBadCombinations(null, slash, WordEnc.SLASH);
        for (let index = 0; index < this.tlds.length; index++) {
            this.filterTld(slash, this.tldTypes[index], chars, this.tlds[index], period);
        }
    }

    private filterTld(slash: string[], tldType: number, chars: string[], tld: Uint16Array, period: string[]): void {
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
                    if (tldIndex < tld.length && (currentLength = this.wordEncDomains.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex]), currentChar)) > 0) {
                        currentIndex += currentLength;
                        tldIndex++;
                    } else {
                        if (tldIndex == 0) {
                            break label;
                        }
                        let previousLength: number;
                        if ((previousLength = this.wordEncDomains.getEmulatedDomainCharLen(nextChar, String.fromCharCode(tld[tldIndex - 1]), currentChar)) > 0) {
                            currentIndex += previousLength;
                            if (tldIndex == 1) {
                                offset++;
                            }
                        } else {
                            if (tldIndex >= tld.length || !WordEnc.isSymbol(currentChar)) {
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
                                if (WordEnc.isSymbol(chars[periodIndex])) {
                                    break;
                                }
                                startFilterIndex = periodIndex;
                            } else if (!WordEnc.isSymbol(chars[periodIndex])) {
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
                                if (WordEnc.isSymbol(chars[periodIndex])) {
                                    break;
                                }
                                endFilterIndex = periodIndex;
                            } else if (!WordEnc.isSymbol(chars[periodIndex])) {
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

    private getTldDotFilterStatus(chars: string[], period: string[], offset: number): number {
        if (offset == 0) {
            return 2;
        }
        let charIndex = offset - 1;
        while (true) {
            if (charIndex >= 0 && WordEnc.isSymbol(chars[charIndex])) {
                if (chars[charIndex] != ',' && chars[charIndex] != '.') {
                    charIndex--;
                    continue;
                }
                return 3;
            }
            let filterCount = 0;
            for (let periodIndex = offset - 1; periodIndex >= 0 && WordEnc.isSymbol(period[periodIndex]); periodIndex--) {
                if (period[periodIndex] == '*') {
                    filterCount++;
                }
            }
            if (filterCount >= 3) {
                return 4;
            }
            if (WordEnc.isSymbol(chars[offset - 1])) {
                return 1;
            }
            return 0;
        }
    }

    private getTldSlashFilterStatus(slash: string[], offset: number, chars: string[]): number {
        if (offset + 1 == chars.length) {
            return 2;
        }
        let charIndex = offset + 1;
        while (true) {
            if (charIndex < chars.length && WordEnc.isSymbol(chars[charIndex])) {
                if (chars[charIndex] != '\\' && chars[charIndex] != '/') {
                    charIndex++;
                    continue;
                }
                return 3;
            }
            let filterCount = 0;
            for (let slashIndex = offset + 1; slashIndex < chars.length && WordEnc.isSymbol(slash[slashIndex]); slashIndex++) {
                if (slash[slashIndex] == '*') {
                    filterCount++;
                }
            }
            if (filterCount >= 5) {
                return 4;
            }
            if (WordEnc.isSymbol(chars[offset + 1])) {
                return 1;
            }
            return 0;
        }
    }
}
