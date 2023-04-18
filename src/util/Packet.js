import fs from 'fs';
import child_process from 'child_process';
import zlib from 'zlib';
import { decompressBz2 } from '#util/Bzip2.js';
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

    static fromFile(path) {
        return new Packet(fs.readFileSync(path));
    }

    static crc32(src, length = src.length, offset = 0) {
        if (src instanceof Packet) {
            src = src.gdata(length, offset, false);
        }

        let crc = 0xFFFFFFFF;

        for (let i = offset; i < length; i++) {
            crc = crc >>> 8 ^ Packet.crctable[(crc ^ src[i]) & 0xFF];
        }

        return ~crc;
    }

    static bzip2(src, offset = 0, length = src.length, prependLength = true) {
        if (src instanceof Packet) {
            src = src.data;
        }

        let path = `dump/${Date.now()}.tmp`;

        fs.writeFileSync(path, src.slice(offset, offset + length));
        child_process.execSync(`java -jar JagCompress.jar bz2 ${path}`);
        fs.unlinkSync(path);
    
        let compressed = Packet.fromFile(path + '.bz2');
        fs.unlinkSync(path + '.bz2');
        if (prependLength) {
            // replace BZip2 header
            compressed.p4(src.length);
        } else {
            // remove BZip2 header
            compressed.pos += 4;
            compressed = compressed.gdata(compressed.length - 4, compressed.pos, false);
        }

        return compressed;
    }

    static bunzip2(src, offset = 0, length = src.length, prepend = true) {
        if (src instanceof Packet) {
            src = src.data;
        }

        return decompressBz2(src.slice(offset, offset + length), prepend);
    }

    static gzip(src, offset = 0, length = src.length) {
        if (src instanceof Packet) {
            src = src.data;
        }

        let path = `dump/${Date.now()}.tmp`;

        fs.writeFileSync(path, src.slice(offset, offset + length));
        child_process.execSync(`java -jar JagCompress.jar gz ${path}`);
        fs.unlinkSync(path);

        let compressed = Packet.fromFile(path + '.gz');
        fs.unlinkSync(path + '.gz');

        return compressed;
    }

    static gunzip(src, offset = 0, length = src.length) {
        if (src instanceof Packet) {
            src = src.data;
        }

        return zlib.gunzipSync(src.slice(offset, offset + length));
    }

    data = null;
    pos = 0;
    bitPos = 0;

    constructor(src) {
        if (src instanceof Buffer) {
            this.data = src;
        } else if (src instanceof Packet) {
            this.data = src.data;
        } else if (typeof src === 'string') {
            this.data = Buffer.from(src, 'hex');
        } else {
            this.data = src;
        }

        this.data = new Uint8Array(this.data);
    }

    get length() {
        return this.data.length;
    }

    get available() {
        return this.data.length - this.pos;
    }

    resize(length) {
        if (this.data.length < length) {
            this.data = new Uint8Array(Buffer.concat([this.data, Buffer.alloc(length - this.data.length)]));
        }
    }

    ensure(capacity) {
        if (this.available < capacity) {
            this.resize(capacity - this.available + this.length);
        }
    }

    toFile(path) {
        fs.writeFileSync(path, this.gdata(this.length, 0, false));
    }

    prepend(src) {
        this.data = new Uint8Array(Buffer.concat([src, this.data]));
    }

    gunzip() {
        return zlib.gunzipSync(this.data);
    }

    bunzip2(prependHeader = true) {
        return decompressBz2(this.data, prependHeader);
    }

    getcrc() {
        return Packet.crc32(this);
    }

    addcrc() {
        let crc = this.getcrc();
        this.p4(crc);
        return crc;
    }

    checkcrc() {
        this.pos -= 4;
        let storedCrc = this.g4();
        let thisCrc = Packet.crc32(this, this.length - this.pos, this.pos);
        return storedCrc === thisCrc;
    }

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

    // getters

    g1() {
        return this.data[this.pos++];
    }

    g1b() {
        return this.data[this.pos++] << 24 >> 24;
    }

    g2() {
        return ((this.data[this.pos++] << 8) | this.data[this.pos++]) >>> 0;
    }

    g2s() {
        return (this.data[this.pos++] << 8) | this.data[this.pos++];
    }

    g3() {
        return ((this.data[this.pos++] << 16) | (this.data[this.pos++] << 8) | this.data[this.pos++]) >>> 0;
    }

    g4() {
        return ((this.data[this.pos++] << 24) | (this.data[this.pos++] << 16) | (this.data[this.pos++] << 8) | this.data[this.pos++]) >>> 0;
    }

    g4s() {
        return (this.data[this.pos++] << 24) | (this.data[this.pos++] << 16) | (this.data[this.pos++] << 8) | this.data[this.pos++];
    }

    g8() {
        let a = this.g4();
        let b = this.g4();
        return (BigInt(a) << 32n) | BigInt(b);
    }

    gjstr() {
        let start = this.pos;
        while (this.data[this.pos++] !== 10) {}
        return Buffer.from(this.data.slice(start, this.pos - 1)).toString();
    }

    // 0 to 32767
    gsmart() {
        let value = this.data[this.pos];
        return value < 0x80 ? this.g1() : this.g2() - 0x8000;
    }

    // -16384 to 16383
    gsmarts() {
        let value = this.data[this.pos];
        return value < 0x80 ? this.g1() - 0x40 : this.g2() - 0xC000;
    }

    gdata(length = this.available, offset = this.pos, advance = true) {
        let data = this.data.slice(offset, offset + length);

        if (advance) {
            this.pos += length;
        }

        return data;
    }

    gPacket(length = this.length, offset = this.pos, advance = true) {
        return new Packet(this.gdata(length, offset, advance));
    }

    gbool() {
        return this.g1() === 1;
    }

    g1isaac(decryptor) {
        this.data[this.pos] -= decryptor.nextInt();
        return this.g1();
    }

    // putters

    p1(value) {
        this.ensure(1);
        this.data[this.pos++] = value;
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
        if (typeof value === 'bigint') {
            value = Number(value);
        }

        this.data[this.pos++] = value >> 24;
        this.data[this.pos++] = value >> 16;
        this.data[this.pos++] = value >> 8;
        this.data[this.pos++] = value;
    }

    p8(value) {
        this.ensure(8);
        this.p4(value >> 32n);
        this.p4(value & 0xFFFFFFFFn);
    }

    pjstr(str) {
        this.ensure(str.length + 1);
        this.data.set(Buffer.from(str), this.pos);
        this.pos += str.length;
        this.data[this.pos++] = 10;
    }

    psmart(value) {
        if (value < 0x80) {
            this.p1(value);
        } else {
            this.p2(value + 0x8000);
        }
    }

    psmarts(value) {
        if (value < 0x80) {
            this.p1(value + 0x40);
        } else {
            this.p2(value + 0xC000);
        }
    }

    pdata(src, advance = true) {
        this.ensure(src.length);

        if (src instanceof Packet) {
            src = src.data;
        }

        this.data.set(src, this.pos);

        if (advance) {
            this.pos += src.length;
        }
    }

    psize1(length) {
        this.data[this.pos - length - 1] = length;
    }

    psize2(length) {
        this.data[this.pos - length - 2] = length >> 8;
        this.data[this.pos - length - 1] = length;
    }

    psize4(length) {
        this.data[this.pos - length - 4] = length >> 24;
        this.data[this.pos - length - 3] = length >> 16;
        this.data[this.pos - length - 2] = length >> 8;
        this.data[this.pos - length - 1] = length;
    }

    pbool(value) {
        this.p1(value ? 1 : 0);
    }

    p1isaac(op, encryptor) {
        this.p1(op + encryptor.nextInt());
    }

    //

    accessBits() {
        this.bitPos = this.pos << 3;
    }

    accessBytes() {
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
