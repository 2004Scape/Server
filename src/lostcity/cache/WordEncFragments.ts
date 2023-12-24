import WordEnc from '#lostcity/cache/WordEnc.js';

export default class WordEncFragments {
    readonly fragments: number[] = [];

    filter(chars: string[]): void {
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
                    if (!WordEnc.isSymbol(chars[index]) && !WordEnc.isNotLowercaseAlpha(chars[index])) {
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

    isBadFragment(chars: string[]): boolean {
        let isNumerical = true;
        for (let index = 0; index < chars.length; index++) {
            if (!WordEnc.isNumeral(chars[index]) && chars[index] != '\u0000') {
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

    private getInteger(chars: string[]): number {
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

    private indexOfNumber(chars: string[], offset: number): number {
        for (let index = offset; index < chars.length && index >= 0; index++) {
            if (chars[index] >= '0' && chars[index] <= '9') {
                return index;
            }
        }
        return -1;
    }

    private indexOfNonNumber(offset: number, chars: string[]): number {
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
}
