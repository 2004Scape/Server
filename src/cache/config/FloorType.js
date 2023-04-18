import Packet from '#util/Packet.js';

export default class FloorType {
    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

    id = -1;
    rgb = 0;
    texture = -1;
    opcode3 = false;
    occlude = true;
    name = '';

    static unpack(dat, idx, preload = false) {
        FloorType.dat = dat;
        FloorType.count = idx.g2();
        FloorType.offsets = [];
        FloorType.cache = [];

        let offset = 2;
        for (let i = 0; i < FloorType.count; i++) {
            FloorType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < FloorType.count; i++) {
                FloorType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('flo.dat');
        const idx = config.read('flo.idx');

        FloorType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(FloorType.count);
        dat.p2(FloorType.count);

        for (let i = 0; i < FloorType.count; i++) {
            const flo = FloorType.get(i);
            const floorDat = flo.encode();
            idx.p2(floorDat.length);
            dat.pdata(floorDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (FloorType.cache[id]) {
            return FloorType.cache[id];
        } else {
            return new FloorType(id);
        }
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < FloorType.count; i++) {
            config += FloorType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let flo;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                flo = new FloorType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const key = lines[offset].slice(0, lines[offset].indexOf('='));
                const value = lines[offset].slice(lines[offset].indexOf('=') + 1).replaceAll('texture_', '');

                if (key == 'name') {
                    flo.name = value;
                } else if (key == 'texture') {
                    flo.texture = parseInt(value);
                } else if (key == 'colour') {
                    flo.rgb = parseInt(value, 16);
                } else if (key == 'occlude') {
                    flo.occlude = value == 'yes';
                } else {
                    console.log(`Unknown flo key: ${key}`);
                }

                offset++;
            }

            FloorType.cache[flo.id] = flo;
        }

        FloorType.count = FloorType.cache.length;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        FloorType.cache[id] = this;

        if (decode) {
            const offset = FloorType.offsets[id];
            if (!offset) {
                return;
            }

            FloorType.dat.pos = offset;
            this.#decode();
        }
    }

    #decode() {
        const dat = FloorType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                this.rgb = dat.g3();
            } else if (opcode == 2) {
                this.texture = dat.g1();
            } else if (opcode == 3) {
                this.opcode3 = true;
            } else if (opcode == 5) {
                this.occlude = false;
            } else if (opcode == 6) {
                this.name = dat.gjstr();
            } else {
                console.error('Unknown FloorType opcode:', opcode);
            }
        }
    }

    encode() {
        const dat = new Packet();

        if (this.rgb != 0) {
            dat.p1(1);
            dat.p3(this.rgb);
        }

        if (this.texture != -1) {
            dat.p1(2);
            dat.p1(this.texture);
        }

        if (this.opcode3) {
            dat.p1(3);
        }

        if (!this.occlude) {
            dat.p1(5);
        }

        if (this.name) {
            dat.p1(6);
            dat.pjstr(this.name);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[flo_${this.id}]\n`;

        if (this.name) {
            config += `name=${this.name}\n`;
        }

        if (this.texture != -1) {
            config += `texture=texture_${this.texture}\n`;
        } else {
            // if (this.rgb == 0) {
            //     config += 'colour=^BLACK\n';
            // } else {
            // }

            config += `colour=0x${this.rgb.toString(16).padStart(6, '0').toUpperCase()}\n`;
        }

        if (!this.occlude) {
            config += 'occlude=no\n';
        }

        return config;
    }
}
