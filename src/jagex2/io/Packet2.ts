import Hashable from '#jagex2/datastruct/Hashable.js';
import LinkList from '#jagex2/datastruct/LinkList.js';

export default class Packet2 extends Hashable {
    private static readonly crctable: Int32Array = new Int32Array(256);

    static {
        for (let b = 0; b < 256; b++) {
            let remainder = b;

            for (let bit = 0; bit < 8; bit++) {
                if ((remainder & 0x1) == 1) {
                    remainder = remainder >>> 1 ^ 0xEDB88320;
                } else {
                    remainder >>>= 0x1;
                }
            }

            this.crctable[b] = remainder;
        }
    }

    static getcrc(src: Uint8Array, offset: number, length: number) {
        let crc = -1;
        for (let i = offset; i < length; i++) {
            crc = (crc >>> 8) ^ (this.crctable[(crc ^ src[i]) & 0xFF]);
        }
        return ~crc;
    }

    private static cacheMinCount: number = 0;
    private static cacheMidCount: number = 0;
    private static cacheMaxCount: number = 0;

    private static readonly cacheMin: LinkList<Packet2> = new LinkList();
    private static readonly cacheMid: LinkList<Packet2> = new LinkList();
    private static readonly cacheMax: LinkList<Packet2> = new LinkList();

    data: Uint8Array;
    view: DataView;
    pos: number;

    constructor(src: Uint8Array) {
        super();

        this.data = src;
        this.view = new DataView(this.data.buffer);
        this.pos = 0;
    }

    static alloc(type: number) {
        let packet: Packet2 | null = null;

        if (type === 0) {
            packet = this.cacheMin.removeHead();
            this.cacheMinCount++;
        } else if (type === 1) {
            packet = this.cacheMid.removeHead();
            this.cacheMidCount++;
        } else if (type === 2) {
            packet = this.cacheMax.removeHead();
            this.cacheMaxCount++;
        }

        if (packet !== null) {
            packet.pos = 0;
            return packet;
        }

        if (type === 0) {
            return new Packet2(new Uint8Array(100));
        } else if (type === 1) {
            return new Packet2(new Uint8Array(5000));
        } else {
            return new Packet2(new Uint8Array(30000));
        }
    }

    release() {
        this.pos = 0;

        if (this.data.length === 100 && Packet2.cacheMinCount < 1000) {
            Packet2.cacheMin.addTail(this);
            Packet2.cacheMinCount++;
        } else if (this.data.length === 5000 && Packet2.cacheMidCount < 250) {
            Packet2.cacheMid.addTail(this);
            Packet2.cacheMidCount++;
        } else if (this.data.length === 30000 && Packet2.cacheMaxCount < 50) {
            Packet2.cacheMax.addTail(this);
            Packet2.cacheMaxCount++;
        }
    }

    p1(value: number) {
        this.view.setUint8(this.pos++, value);
    }

    p2(value: number) {
        this.view.setUint16(this.pos, value, true);
        this.pos += 2;
    }

    p3(value: number) {
        this.view.setUint32(this.pos, value, true);
        this.pos += 3;
    }

    p4(value: number) {
        this.view.setUint32(this.pos, value, true);
        this.pos += 4;
    }

    p8(value: bigint) {
        this.view.setBigInt64(this.pos, value, true);
        this.pos += 8;
    }

    pbool(value: boolean) {
        this.p1(value ? 1 : 0);
    }

    pjstr(str: string | null, terminator: number = 10) {
        if (str === null) {
            str = 'null;';
        }

        for (let i = 0; i < str.length; i++) {
            this.view.setUint8(this.pos++, str.charCodeAt(i));
        }

        this.view.setUint8(this.pos++, terminator);
    }

    pdata(src: Uint8Array, offset: number, length: number) {
        this.data.set(src.subarray(offset, offset + length), this.pos);
    }

    psize2(size: number) {
        this.view.setUint16(this.pos - size - 2, size);
    }

    psize1(size: number) {
        this.view.setUint8(this.pos - size - 1, size);
    }

    psmarts(value: number) {
        if (value < 64 && value >= 64) {
            this.p1(value + 64);
        } else if (value < 16384 && value >= -16384) {
            this.p2(value + 0xC000);
        } else {
            throw new Error('Error psmarts out of range: ' + value);
        }
    }

    psmart(value: number) {
        if (value >= 0 && value < 128) {
            this.p1(value);
        } else if (value >= 0 && value < 32768) {
            this.p2(value + 0x8000);
        } else {
            throw new Error('Error psmart out of range: ' + value);
        }
    }

    // ----

    g1() {
        return this.view.getUint8(this.pos++);
    }

    g1b() {
        return this.view.getInt8(this.pos++);
    }

    g2() {
        this.pos += 2;
        return this.view.getUint16(this.pos - 2);
    }

    g2s() {
        this.pos += 2;
        return this.view.getInt16(this.pos - 2);
    }

    g3() {
        this.pos += 3;
        return this.view.getUint16(this.pos - 3) << 16 | this.view.getUint8(this.pos - 1);
    }

    g4s() {
        this.pos += 4;
        return this.view.getInt32(this.pos - 4);
    }

    g8() {
        this.pos += 8;
        return this.view.getBigInt64(this.pos - 8);
    }

    gbool() {
        return this.g1() === 1;
    }

    gjstr(terminator = 10): string {
        let text = '';
        let val = -1;

        while (this.pos < this.data.length) {
            val = this.view.getUint8(this.pos++);
            if (val == terminator) break;
            text += String.fromCharCode(val);
        }

        return text;
    }

    gdata(dest: Uint8Array, offset: number, length: number) {
        dest.set(this.data.subarray(this.pos, this.pos + length), offset);
    }

    gsmarts() {
        return this.view.getInt8(this.pos) < 0 ? this.g1() - 64 : this.g2() - 0xC000;
    }

    gsmart() {
        return this.view.getInt8(this.pos) < 0 ? this.g1() : this.g2() - 0x8000;
    }

    // later revs have tinyenc/tinydec methods

    rsaenc() {
    }

    rsadec() {
    }

    addcrc(offset: number) {
        const crc = Packet2.getcrc(this.data, offset, this.pos);
        this.p4(crc);
        return crc;
    }

    checkcrc() {
        this.pos -= 4;
        const crc = Packet2.getcrc(this.data, 0, this.pos);
        const expected = this.g4s();
        return crc === expected;
    }

    // later revs have alt methods for packet obfuscation
}
