import fs from 'fs';
import { dirname } from 'path';

import forge from 'node-forge';

const priv = forge.pki.privateKeyFromPem(fs.readFileSync('data/config/private.pem'));

const BITMASK = [
    0,
    0x1, 0x3, 0x7, 0xF,
    0x1F, 0x3F, 0x7F, 0xFF,
    0x1FF, 0x3FF, 0x7FF, 0xFFF,
    0x1FFF, 0x3FFF, 0x7FFF, 0xFFFF,
    0x1FFFF, 0x3FFFF, 0x7FFFF, 0xFFFFF,
    0x1FFFFF, 0x3FFFFF, 0x7FFFFF, 0xFFFFFF,
    0x1FFFFFF, 0x3FFFFFF, 0x7FFFFFF, 0xFFFFFFF,
    0x1FFFFFFF, 0x3FFFFFFF, 0x7FFFFFFF, 0xFFFFFFFF
];

export default class Packet {
    static crctable = new Int32Array(256);

    static {
        for (let i = 0; i < 256; i++) {
            let crc = i;

            for (let j = 0; j < 8; j++) {
                if ((crc & 1) == 1) {
                    crc = crc >>> 1 ^ 0xEDB88320;
                } else {
                    crc >>>= 1;
                }
            }

            Packet.crctable[i] = crc;
        }
    }

    static crc32(src, length = src.length, offset = 0) {
        if (src instanceof Packet) {
            src = src.data;
        }

        let crc = 0xFFFFFFFF;

        for (let i = offset; i < offset + length; i++) {
            crc = crc >>> 8 ^ Packet.crctable[(crc ^ src[i]) & 0xFF];
        }

        return ~crc;
    }

    // ----

    constructor(src) {
        if (src instanceof Packet) {
            src = src.data;
        }

        this.data = new Uint8Array(src);
        this.pos = 0;
        this.bitPos = 0;
    }

    get length() {
        return this.data.length;
    }

    get available() {
        return this.data.length - this.pos;
    }

    resize(length) {
        if (this.length < length) {
            let temp = new Uint8Array(length);
            temp.set(this.data);
            this.data = temp;
        }
    }

    ensure(length) {
        if (this.available < length) {
            this.resize(this.length + length);
        }
    }

    // ----

    static load(path) {
        return new Packet(fs.readFileSync(path));
    }

    save(path, length = this.pos, start = 0) {
        let dir = dirname(path);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir, { recursive: true });
        }

        fs.writeFileSync(path, this.data.subarray(start, start + length));
    }

    // ----

    g1() {
        return this.data[this.pos++];
    }

    gbool() {
        return this.g1() === 1;
    }

    g1s() {
        let value = this.g1();
        if (value > 0x7F) {
            value -= 0x100;
        }
        return value;
    }

    g2() {
        return ((this.data[this.pos++] << 8) | this.data[this.pos++]) >>> 0;
    }

    g2s() {
        let value = this.g2();
        if (value > 0x7FFF) {
            value -= 0x10000;
        }
        return value;
    }

    g3() {
        return ((this.data[this.pos++] << 16) | (this.data[this.pos++] << 8) | this.data[this.pos++]) >>> 0;
    }

    g4() {
        return ((this.data[this.pos++] << 24) | (this.data[this.pos++] << 16) | (this.data[this.pos++] << 8) | this.data[this.pos++]) >>> 0;
    }

    g4s() {
        let value = this.g4();
        if (value > 0x7FFFFFFF) {
            value -= 0x100000000;
        }
        return value;
    }

    gjstr() {
        let str = '';
        while (this.data[this.pos] != 10) {
            str += String.fromCharCode(this.data[this.pos++]);
        }
        this.pos++;
        return str;
    }

    // TODO: redundant, only for scripts
    gjnstr() {
        let str = '';
        while (this.data[this.pos] != 0) {
            str += String.fromCharCode(this.data[this.pos++]);
        }
        this.pos++;
        return str;
    }

    gdata(length = this.available, offset = this.pos, advance = true) {
        let temp = this.data.subarray(offset, offset + length);
        if (advance) {
            this.pos += length;
        }
        return temp;
    }

    gPacket(length = this.available, offset = this.pos, advance = true) {
        return new Packet(this.gdata(length, offset, advance));
    }

    gsmart() {
        let value = this.data[this.pos] & 0xFF;
        if (value < 128) {
            return this.g1();
        } else {
            return this.g2() - 0x8000;
        }
    }

    gsmarts() {
        let value = this.data[this.pos] & 0xFF;
        if (value < 128) {
            return this.g1() - 0x40;
        } else {
            return this.g2() - 0xC000;
        }
    }

    // ----

    p1(value) {
        this.ensure(1);
        this.data[this.pos++] = value;
    }

    pbool(value) {
        this.p1(value ? 1 : 0);
    }

    p2(value) {
        this.ensure(2);
        this.data[this.pos++] = value >> 8;
        this.data[this.pos++] = value;
    }

    p3(value) {
        this.ensure(3);
        this.data[this.pos++] = value >> 16;
        this.data[this.pos++] = value >> 8;
        this.data[this.pos++] = value;
    }

    p4(value) {
        this.ensure(4);
        this.data[this.pos++] = value >> 24;
        this.data[this.pos++] = value >> 16;
        this.data[this.pos++] = value >> 8;
        this.data[this.pos++] = value;
    }

    p8(value) {
        this.ensure(8);
        this.p4(Number(value >> 32n));
        this.p4(Number(value & 0xFFFFFFFFn));
    }

    pjstr(str) {
        if (typeof str === 'undefined') {
            console.error('Attempted to pjstr(undefined);');
            return;
        }

        this.ensure(str.length + 1);
        for (let i = 0; i < str.length; i++) {
            this.data[this.pos++] = str.charCodeAt(i);
        }
        this.data[this.pos++] = 10;
    }

    pdata(src, advance = true) {
        if (src instanceof Packet) {
            src = src.data;
        }

        if (!src.length) {
            return;
        }

        this.ensure(src.length);
        this.data.set(src, this.pos);

        if (advance) {
            this.pos += src.length;
        }
    }

    psmart(value) {
        if (value < 128) {
            this.p1(value);
        } else {
            this.p2(value + 0x8000);
        }
    }

    psmarts(value) {
        if (value < 128) {
            this.p1(value + 0x40);
        } else {
            this.p2(value + 0xC000);
        }
    }

    psize1(length) {
        this.data[this.pos - length - 1] = length;
    }

    psize2(length) {
        this.data[this.pos - length - 2] = length >> 8;
        this.data[this.pos - length - 1] = length;
    }

    // ----

    rsadec() {
        let length = this.g1();
        let encrypted = this.gdata(length);

        // .modpow(...)
        if (encrypted.length > 64) {
            // Java BigInteger prepended a 0 to indicate it fits in 64-bytes
            while (encrypted.length > 64) {
                encrypted = encrypted.slice(1);
            }
        } else if (encrypted.length < 64) {
            // Java BigInteger didn't prepend 0 because it fits in less than 64-bytes
            while (encrypted.length < 64) {
                encrypted = new Uint8Array([0, ...encrypted]);
            }
        }

        let decrypted = new Uint8Array(Buffer.from(priv.decrypt(encrypted, 'RAW', 'NONE'), 'ascii'));
        let pos = 0;

        // .toByteArray()
        // skipping RSA padding
        while (decrypted[pos] == 0) {
            pos++;
        }
        decrypted = decrypted.subarray(pos);

        this.pos = 0;
        this.pdata(decrypted, false);
    }

    bits() {
        this.bitPos = this.pos << 3;
    }

    bytes() {
        this.pos = (this.bitPos + 7) >>> 3;
    }

    gBit(n) {
        let bytePos = this.bitPos >> 3;
        let remaining = 8 - (this.bitPos & 7);
        let value = 0;
        this.bitPos += n;

        for (; n > remaining; remaining = 8) {
            value += (this.data[bytePos++] & BITMASK[remaining]) << (n - remaining);
            n -= remaining;
        }

        if (n == remaining) {
            value += this.data[bytePos] & BITMASK[remaining];
        } else {
            value += (this.data[bytePos] >> (remaining - n)) & BITMASK[n];
        }

        return value;
    }

    pBit(n, value) {
        let bytePos = this.bitPos >>> 3;
        let remaining = 8 - (this.bitPos & 7);
        this.bitPos += n;

        // grow if necessary
        if (bytePos + 1 > this.length) {
            this.resize(bytePos + 1);
        }

        for (; n > remaining; remaining = 8) {
            this.data[bytePos] &= ~BITMASK[remaining];
            this.data[bytePos++] |= (value >>> (n - remaining)) & BITMASK[remaining];
            n -= remaining;

            // grow if necessary
            if (bytePos + 1 > this.length) {
                this.resize(bytePos + 1);
            }
        }

        if (n == remaining) {
            this.data[bytePos] &= ~BITMASK[remaining];
            this.data[bytePos] |= value & BITMASK[remaining];
        } else {
            this.data[bytePos] &= ~BITMASK[n] << (remaining - n);
            this.data[bytePos] |= (value & BITMASK[n]) << (remaining - n);
        }
    }
}
