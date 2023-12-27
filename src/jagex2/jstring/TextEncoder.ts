import Packet from '#jagex2/io/Packet.js';

export default class TextEncoder {
    private static CHAR_LOOKUP: string[] = [
        ' ',
        'e', 't', 'a', 'o', 'i', 'h', 'n', 's', 'r', 'd', 'l', 'u', 'm',
        'w', 'c', 'y', 'f', 'g', 'p', 'b', 'v', 'k', 'x', 'j', 'q', 'z',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        ' ', '!', '?', '.', ',', ':', ';', '(', ')', '-',
        '&', '*', '\\', '\'', '@', '#', '+', '=', '£', '$', '%', '"', '[', ']'
    ];

    static decode(packet: Packet, length: number): string {
        const stringBuilder: string[] = [];
        let offset = 0;
        let savedChar = -1;
        let currentChar;
        for (let index = 0; index < length && offset < 100; index++) {
            const data = packet.g1();
            currentChar = data >> 4 & 0xF;
            if (savedChar !== -1) {
                stringBuilder[offset++] = this.CHAR_LOOKUP[(savedChar << 4) + currentChar - 195];
                savedChar = -1;
            } else if (currentChar < 13) {
                stringBuilder[offset++] = this.CHAR_LOOKUP[currentChar];
            } else {
                savedChar = currentChar;
            }
            currentChar = data & 0xF;
            if (savedChar != -1) {
                stringBuilder[offset++] = this.CHAR_LOOKUP[(savedChar << 4) + currentChar - 195];
                savedChar = -1;
            } else if (currentChar < 13) {
                stringBuilder[offset++] = this.CHAR_LOOKUP[currentChar];
            } else {
                savedChar = currentChar;
            }
        }
        return this.toSentenceCase(stringBuilder.slice(0, offset).join(''));
    }

    static encode(packet: Packet, input: string): void {
        if (input.length > 80) {
            input = input.substring(0, 80);
        }
        input = input.toLowerCase();
        let savedChar = -1;
        for (let index = 0; index < input.length; index++) {
            const char = input.charAt(index);
            let currentChar = 0;
            for (let lookupIndex = 0; lookupIndex < this.CHAR_LOOKUP.length; lookupIndex++) {
                if (char === this.CHAR_LOOKUP[lookupIndex]) {
                    currentChar = lookupIndex;
                    break;
                }
            }
            if (currentChar > 12) {
                currentChar += 195;
            }
            if (savedChar == -1) {
                if (currentChar < 13) {
                    savedChar = currentChar;
                } else {
                    packet.p1(currentChar);
                }
            } else if (currentChar < 13) {
                packet.p1((savedChar << 4) + currentChar);
                savedChar = -1;
            } else {
                packet.p1((savedChar << 4) + (currentChar >> 4));
                savedChar = currentChar & 0xF;
            }
        }
        if (savedChar != -1) {
            packet.p1(savedChar << 4);
        }
    }

    static toSentenceCase(input: string): string {
        const chars: string[] = [...input.toLowerCase()];
        let punctuation = true;
        for (let index = 0; index < chars.length; index++) {
            const char = chars[index];
            if (punctuation && char >= 'a' && char <= 'z') {
                chars[index] = char.toUpperCase();
                punctuation = false;
            }
            if (char === '.' || char === '!') {
                punctuation = true;
            }
        }
        return chars.join('');
    }
}
