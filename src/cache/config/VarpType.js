import Packet from '#util/Packet.js';

export default class VarpType {
    static offsets = [];
    static count = 0;
    static dat = null;
    static cache = [];

    id = -1;
    opcode1 = 0;
    opcode2 = 0;
    opcode3 = false;
    opcode3_count = 0;
    opcode3_array = [];
    opcode4 = true;
    clientcode = 0;
    opcode6 = false;
    opcode7 = 0;
    opcode8 = false;
    opcode10 = '';
    transmit = false; // technically probably one of the unused opcodes

    static unpack(dat, idx, preload = false) {
        VarpType.dat = dat;
        VarpType.count = idx.g2();
        VarpType.offsets = [];
        VarpType.cache = [];

        let offset = 2;
        for (let i = 0; i < VarpType.count; i++) {
            VarpType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < VarpType.count; i++) {
                VarpType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('varp.dat');
        const idx = config.read('varp.idx');

        VarpType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(VarpType.count);
        dat.p2(VarpType.count);

        for (let i = 0; i < VarpType.count; i++) {
            let varp;
            if (VarpType.cache[i]) {
                varp = VarpType.cache[i];
            } else {
                varp = new VarpType(i);
            }

            const varpDat = varp.encode();
            idx.p2(varpDat.length);
            dat.pdata(varpDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (VarpType.cache[id]) {
            return VarpType.cache[id];
        } else {
            return new VarpType(id);
        }
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < VarpType.count; i++) {
            config += VarpType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let varp;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                varp = new VarpType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const key = lines[offset].slice(0, lines[offset].indexOf('='));
                const value = lines[offset].slice(lines[offset].indexOf('=') + 1);

                if (key == 'clientcode') {
                    varp.clientcode = parseInt(value);
                } else if (key === 'transmit') {
                    varp.transmit = value === 'yes';
                }

                offset++;
            }

            VarpType.cache[varp.id] = varp;
        }

        VarpType.count = VarpType.cache.length;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        VarpType.cache[id] = this;

        if (decode) {
            const offset = VarpType.offsets[id];
            if (!offset) {
                return;
            }

            VarpType.dat.pos = offset;
            this.#decode();
        }
    }

    #decode() {
        const dat = VarpType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                this.opcode1 = dat.g1();
            } else if (opcode == 2) {
                this.opcode2 = dat.g1();
            } else if (opcode == 3) {
                this.opcode3 = true;
                this.opcode3_array[this.opcode3_count++] = this.id;
            } else if (opcode == 4) {
                this.opcode4 = false;
            } else if (opcode == 5) {
                this.clientcode = dat.g2();
            } else if (opcode == 6) {
                this.opcode6 = true;
            } else if (opcode == 7) {
                this.opcode7 = dat.g4();
            } else if (opcode == 8) {
                this.opcode8 = true;
            } else if (opcode == 10) {
                this.opcode10 = dat.gjstr();
            } else {
                console.error('Unknown VarpType opcode:', opcode);
            }
        }
    }

    encode() {
        const dat = new Packet();

        if (this.opcode1 != 0) {
            dat.p1(1);
            dat.p1(this.opcode1);
        }

        if (this.opcode2 != 0) {
            dat.p1(2);
            dat.p1(this.opcode2);
        }

        if (this.opcode3) {
            dat.p1(3);
        }

        if (!this.opcode4) {
            dat.p1(4);
        }

        if (this.clientcode != 0) {
            dat.p1(5);
            dat.p2(this.clientcode);
        }

        if (this.opcode6) {
            dat.p1(6);
        }

        if (this.opcode7 != 0) {
            dat.p1(7);
            dat.p4(this.opcode7);
        }

        if (this.opcode8) {
            dat.p1(8);
        }

        if (this.opcode10) {
            dat.p1(10);
            dat.pjstr(this.opcode10);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[varp_${this.id}]\n`;

        if (this.clientcode != 0) {
            config += `clientcode=${this.clientcode}\n`;
        }

        return config;
    }
}
