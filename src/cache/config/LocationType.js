import Packet from '#util/Packet.js';

export default class LocationType {
    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

	static WALL_STRAIGHT = 0;
	static WALL_DIAGONALCORNER = 1;
	static WALL_L = 2;
	static WALL_SQUARECORNER = 3;

	static WALLDECOR_STRAIGHT = 4;
	static WALLDECOR_STRAIGHT_OFFSET = 5;
	static WALLDECOR_DIAGONAL_NOOFFSET = 6;
	static WALLDECOR_DIAGONAL_OFFSET = 7;
	static WALLDECOR_DIAGONAL_BOTH = 8;

	static WALL_DIAGONAL = 9;

	static CENTREPIECE_STRAIGHT = 10;
	static CENTREPIECE_DIAGONAL = 11;

	static ROOF_STRAIGHT = 12;
	static ROOF_DIAGONAL_WITH_ROOFEDGE = 13;
	static ROOF_DIAGONAL = 14;
	static ROOF_L_CONCAVE = 15;
	static ROOF_L_CONVEX = 16;
	static ROOF_FLAT = 17;

	static ROOFEDGE_STRAIGHT = 18;
	static ROOFEDGE_DIAGONALCORNER = 19;
	static ROOFEDGE_L = 20;
	static ROOFEDGE_SQUARECORNER = 21;

	static GROUNDDECOR = 22;

    // reverse lookup for toJagConfig
    static SHAPE = {
        0: 'WALL_STRAIGHT',
        1: 'WALL_DIAGONALCORNER',
        2: 'WALL_L',
        3: 'WALL_SQUARECORNER',
        9: 'WALL_DIAGONAL',

        4: 'WALLDECOR_STRAIGHT',
        5: 'WALLDECOR_STRAIGHT_OFFSET',
        6: 'WALLDECOR_DIAGONAL_NOOFFSET',
        7: 'WALLDECOR_DIAGONAL_OFFSET',
        8: 'WALLDECOR_DIAGONAL_BOTH',

        10: 'CENTREPIECE_STRAIGHT',
        11: 'CENTREPIECE_DIAGONAL',

        12: 'ROOF_STRAIGHT',
        13: 'ROOF_DIAGONAL_WITH_ROOFEDGE',
        14: 'ROOF_DIAGONAL',
        15: 'ROOF_L_CONCAVE',
        16: 'ROOF_L_CONVEX',
        17: 'ROOF_FLAT',

        18: 'ROOFEDGE_STRAIGHT',
        19: 'ROOFEDGE_DIAGONALCORNER',
        20: 'ROOFEDGE_L',
        21: 'ROOFEDGE_SQUARECORNER',

        22: 'GROUNDDECOR'
    };

    id = -1;
    models = [];
    shapes = [];
    name = '';
    desc = '';
    width = 1;
    length = 1;
    blockwalk = true;
    blockrange = true;
    interactable = false;
    _interactable = -1;
    hillskew = false;
    sharelight = false;
    occlude = false;
    anim = -1;
    disposeAlpha = false;
    walloff = 16;
    ambient = 0;
    contrast = 0;
    ops = [];
    recol_s = [];
    recol_d = [];
    mapfunction = -1;
    mirror = false;
    active = true;
    resizex = 128;
    resizey = 128;
    resizez = 128;
    mapscene = -1;
    blocksides = 0;
    xoff = 0;
    yoff = 0;
    zoff = 0;
    forcedecor = false;

    static unpack(dat, idx, preload = false) {
        LocationType.dat = dat;
        LocationType.count = idx.g2();
        LocationType.offsets = [];
        LocationType.cache = [];

        let offset = 2;
        for (let i = 0; i < LocationType.count; i++) {
            LocationType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < LocationType.count; i++) {
                LocationType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('loc.dat');
        const idx = config.read('loc.idx');

        LocationType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(LocationType.count);
        dat.p2(LocationType.count);

        for (let i = 0; i < LocationType.count; i++) {
            let locationType;
            if (LocationType.cache[i]) {
                locationType = LocationType.cache[i];
            } else {
                locationType = new LocationType(i);
            }

            const locationTypeDat = locationType.encode();
            idx.p2(locationTypeDat.length);
            dat.pdata(locationTypeDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (LocationType.cache[id]) {
            return LocationType.cache[id];
        } else {
            return new LocationType(id);
        }
    }

    static getByName(name) {
        for (let i = 0; i < LocationType.count; i++) {
            if (LocationType.get(i).name.toLowerCase() == name.toLowerCase()) {
                return LocationType.get(i);
            }
        }
        return null;
    }

    static find(predicate) {
        for (let i = 0; i < LocationType.count; i++) {
            if (predicate(LocationType.get(i))) {
                return LocationType.get(i);
            }
        }
        return null;
    }

    static filter(predicate) {
        let filtered = [];

        for (let i = 0; i < LocationType.count; i++) {
            if (predicate(LocationType.get(i))) {
                filtered.push(LocationType.get(i));
            }
        }

        return filtered;
    }

    static indexOf(predicate, start = 0) {
        for (let i = start; i < LocationType.count; i++) {
            if (predicate(LocationType.get(i))) {
                return i;
            }
        }

        return -1;
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < LocationType.count; i++) {
            config += LocationType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let loc;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                loc = new LocationType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const key = lines[offset].slice(0, lines[offset].indexOf('='));
                const value = lines[offset].slice(lines[offset].indexOf('=') + 1).replaceAll('model_', '').replaceAll('seq_', '');

                if (key.startsWith('model')) {
                    let index = parseInt(key.slice(5)) - 1;

                    if (value.indexOf(',') !== -1) {
                        const parts = value.split(',');
                        loc.models[index] = parseInt(parts[0]);
                        loc.shapes[index] = LocationType[parts[1].replace('^', '')];
                    } else {
                        loc.models[index] = parseInt(value);
                        loc.shapes[index] = LocationType.CENTREPIECE_STRAIGHT;
                    }
                } else if (key == 'name') {
                    loc.name = value;
                } else if (key == 'desc') {
                    loc.desc = value;
                } else if (key == 'width') {
                    loc.width = parseInt(value);
                } else if (key == 'length') {
                    loc.length = parseInt(value);
                } else if (key == 'blockwalk') {
                    loc.blockwalk = value == 'yes';
                } else if (key == 'blockrange') {
                    loc.blockrange = value == 'yes';
                } else if (key == 'interactable') {
                    loc._interactable = parseInt(value);
                } else if (key == 'hillskew') {
                    loc.hillskew = value == 'yes';
                } else if (key == 'sharelight') {
                    loc.sharelight = value == 'yes';
                } else if (key == 'occlude') {
                    loc.occlude = value == 'yes';
                } else if (key == 'anim') {
                    loc.anim = parseInt(value);
                } else if (key == 'disposealpha') {
                    loc.disposeAlpha = value == 'yes';
                } else if (key == 'walloff') {
                    loc.walloff = parseInt(value);
                } else if (key == 'ambient') {
                    loc.ambient = parseInt(value);
                } else if (key == 'contrast') {
                    loc.contrast = parseInt(value);
                } else if (key.startsWith('op')) {
                    let index = parseInt(key.charAt(2)) - 1;
                    loc.ops[index] = value;
                } else if (key.startsWith('recol')) {
                    let index = parseInt(key.charAt(5)) - 1;
                    let type = key.charAt(6);

                    if (type == 's') {
                        loc.recol_s[index] = parseInt(value);
                    } else if (type == 'd') {
                        loc.recol_d[index] = parseInt(value);
                    }
                } else if (key == 'mapfunction') {
                    loc.mapfunction = parseInt(value);
                } else if (key == 'mirror') {
                    loc.mirror = value == 'yes';
                } else if (key == 'active') {
                    loc.active = value == 'yes';
                } else if (key == 'resizex') {
                    loc.resizex = parseInt(value);
                } else if (key == 'resizey') {
                    loc.resizey = parseInt(value);
                } else if (key == 'resizez') {
                    loc.resizez = parseInt(value);
                } else if (key == 'mapscene') {
                    loc.mapscene = parseInt(value);
                } else if (key == 'blocksides') {
                    loc.blocksides = parseInt(value);
                } else if (key == 'xoff') {
                    loc.xoff = parseInt(value);
                } else if (key == 'yoff') {
                    loc.yoff = parseInt(value);
                } else if (key == 'zoff') {
                    loc.zoff = parseInt(value);
                } else if (key == 'forcedecor') {
                    loc.forcedecor = value == 'yes';
                } else {
                    console.log(`Unknown loc key: ${key}`);
                }

                offset++;
            }

            LocationType.cache[loc.id] = loc;
        }

        LocationType.count = LocationType.cache.length;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        LocationType.cache[id] = this;

        if (decode) {
            const offset = LocationType.offsets[id];
            if (!offset) {
                return;
            }

            LocationType.dat.pos = offset;
            this.#decode();
        }
    }

    #decode() {
        const dat = LocationType.dat;

        let interactive = -1;
        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.models[i] = dat.g2();
                    this.shapes[i] = dat.g1();
                }
            } else if (opcode == 2) {
                this.name = dat.gjstr();
            } else if (opcode == 3) {
                this.desc = dat.gjstr();
            } else if (opcode == 14) {
                this.width = dat.g1();
            } else if (opcode == 15) {
                this.length = dat.g1();
            } else if (opcode == 17) {
                this.blockwalk = false;
            } else if (opcode == 18) {
                this.blockrange = false;
            } else if (opcode == 19) {
                interactive = dat.g1();
                this._interactable = interactive; // so we can preserve the original value

                if (interactive == 1) {
                    this.interactable = true;
                }
            } else if (opcode == 21) {
                this.hillskew = true;
            } else if (opcode == 22) {
                this.sharelight = true;
            } else if (opcode == 23) {
                this.occlude = true;
            } else if (opcode == 24) {
                this.anim = dat.g2();

                if (this.anim == 65535) {
                    this.anim = -1;
                }
            } else if (opcode == 25) {
                this.disposeAlpha = true;
            } else if (opcode == 28) {
                this.walloff = dat.g1();
            } else if (opcode == 29) {
                this.ambient = dat.g1b();
            } else if (opcode == 39) {
                this.contrast = dat.g1b();
            } else if (opcode >= 30 && opcode < 35) {
                this.ops[opcode - 30] = dat.gjstr();
            } else if (opcode == 40) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.recol_s[i] = dat.g2();
                    this.recol_d[i] = dat.g2();
                }
            } else if (opcode == 60) {
                this.mapfunction = dat.g2();
            } else if (opcode == 62) {
                this.mirror = true;
            } else if (opcode == 64) {
                this.active = false;
            } else if (opcode == 65) {
                this.resizex = dat.g2();
            } else if (opcode == 66) {
                this.resizey = dat.g2();
            } else if (opcode == 67) {
                this.resizez = dat.g2();
            } else if (opcode == 68) {
                this.mapscene = dat.g2();
            } else if (opcode == 69) {
                this.blocksides = dat.g1();
            } else if (opcode == 70) {
                this.xoff = dat.g2s();
            } else if (opcode == 71) {
                this.yoff = dat.g2s();
            } else if (opcode == 72) {
                this.zoff = dat.g2s();
            } else if (opcode == 73) {
                this.forcedecor = true;
            } else {
                console.error('Unknown LocationType opcode:', opcode);
            }
        }

        if (interactive == -1) {
            this.interactable = false;

            if ((this.shapes.length && this.shapes[0] == LocationType.CENTREPIECE_STRAIGHT) || this.ops.length) {
                this.interactable = true;
            }
        }
    }

    encode() {
        const dat = new Packet();

        if (this.models.length) {
            dat.p1(1);
            dat.p1(this.models.length);

            for (let i = 0; i < this.models.length; i++) {
                dat.p2(this.models[i]);
                dat.p1(this.shapes[i]);
            }
        }

        if (this.name) {
            dat.p1(2);
            dat.pjstr(this.name);
        }

        if (this.desc) {
            dat.p1(3);
            dat.pjstr(this.desc);
        }

        if (this.width) {
            dat.p1(14);
            dat.p1(this.width);
        }

        if (this.length) {
            dat.p1(15);
            dat.p1(this.length);
        }

        if (!this.blockwalk) {
            dat.p1(17);
        }

        if (!this.blockrange) {
            dat.p1(18);
        }

        if (this._interactable != -1) {
            dat.p1(19);
            dat.p1(this._interactable);
        }

        if (this.hillskew) {
            dat.p1(21);
        }

        if (this.sharelight) {
            dat.p1(22);
        }

        if (this.occlude) {
            dat.p1(23);
        }

        if (this.anim != -1) {
            dat.p1(24);
            dat.p2(this.anim);
        }

        if (this.disposeAlpha) {
            dat.p1(25);
        }

        if (this.walloff != 16) {
            dat.p1(28);
            dat.p1(this.walloff);
        }

        if (this.ambient != 0) {
            dat.p1(29);
            dat.p1(this.ambient);
        }

        if (this.contrast != 0) {
            dat.p1(39);
            dat.p1(this.contrast);
        }

        for (let i = 0; i < 5; i++) {
            if (this.ops[i] != null) {
                dat.p1(30 + i);
                dat.pjstr(this.ops[i]);
            }
        }

        if (this.recol_s.length) {
            dat.p1(40);
            dat.p1(this.recol_s.length);

            for (let i = 0; i < this.recol_s.length; i++) {
                dat.p2(this.recol_s[i]);
                dat.p2(this.recol_d[i]);
            }
        }

        if (this.mapfunction != -1) {
            dat.p1(60);
            dat.p2(this.mapfunction);
        }

        if (this.mirror) {
            dat.p1(62);
        }

        if (!this.active) {
            dat.p1(64);
        }

        if (this.resizex != 128) {
            dat.p1(65);
            dat.p2(this.resizex);
        }

        if (this.resizey != 128) {
            dat.p1(66);
            dat.p2(this.resizey);
        }

        if (this.resizez != 128) {
            dat.p1(67);
            dat.p2(this.resizez);
        }

        if (this.mapscene != -1) {
            dat.p1(68);
            dat.p2(this.mapscene);
        }

        if (this.blocksides != 0) {
            dat.p1(69);
            dat.p1(this.blocksides);
        }

        if (this.xoff != 0) {
            dat.p1(70);
            dat.p2(this.xoff);
        }

        if (this.yoff != 0) {
            dat.p1(71);
            dat.p2(this.yoff);
        }

        if (this.zoff != 0) {
            dat.p1(72);
            dat.p2(this.zoff);
        }

        if (this.forcedecor) {
            dat.p1(73);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[loc_${this.id}]\n`;

        if (this.name) {
            config += `name=${this.name}\n`;
        }

        if (this.desc) {
            config += `desc=${this.desc}\n`;
        }

        for (let i = 0; i < this.models.length; ++i) {
            if (this.shapes[i] == LocationType.CENTREPIECE_STRAIGHT) {
                // this is the default
                config += `model${i + 1}=model_${this.models[i]}\n`;
            } else {
                config += `model${i + 1}=model_${this.models[i]},^${LocationType.SHAPE[this.shapes[i]]}\n`;
            }
        }

        if (this.width != 1) {
            config += `width=${this.width}\n`;
        }

        if (this.length != 1) {
            config += `length=${this.length}\n`;
        }

        if (!this.blockwalk) {
            config += `blockwalk=no\n`;
        }

        if (!this.blockrange) {
            config += `blockrange=no\n`;
        }

        if (this._interactable != -1) {
            config += `interactable=${this._interactable}\n`;
        }

        if (this.hillskew) {
            config += `hillskew=yes\n`;
        }

        if (this.occlude) {
            config += `occlude=yes\n`;
        }

        if (this.anim != -1) {
            config += `anim=seq_${this.anim}\n`;
        }

        if (this.disposeAlpha) {
            config += `disposealpha=yes\n`;
        }

        if (this.sharelight) {
            config += `sharelight=yes\n`;
        }

        if (this.ambient != 0) {
            config += `ambient=${this.ambient}\n`;
        }

        if (this.contrast != 0) {
            config += `contrast=${this.contrast}\n`;
        }

        if (this.mapfunction != -1) {
            config += `mapfunction=${this.mapfunction}\n`;
        }

        if (this.mapscene != -1) {
            config += `mapscene=${this.mapscene}\n`;
        }

        if (this.mirror) {
            config += `mirror=yes\n`;
        }

        if (!this.active) {
            config += `active=no\n`;
        }

        if (this.resizex != 128) {
            config += `resizex=${this.resizex}\n`;
        }

        if (this.resizey != 128) {
            config += `resizey=${this.resizey}\n`;
        }

        if (this.resizez != 128) {
            config += `resizez=${this.resizez}\n`;
        }

        if (this.blocksides != 0) {
            config += `blocksides=${this.blocksides}\n`;
        }

        if (this.xoff != 0) {
            config += `xoff=${this.xoff}\n`;
        }

        if (this.yoff != 0) {
            config += `yoff=${this.yoff}\n`;
        }

        if (this.zoff != 0) {
            config += `zoff=${this.zoff}\n`;
        }

        if (this.forcedecor) {
            config += `forcedecor=yes\n`;
        }

        for (let i = 0; i < this.recol_s.length; ++i) {
            config += `recol${i + 1}s=${this.recol_s[i]}\n`;
            config += `recol${i + 1}d=${this.recol_d[i]}\n`;
        }

        for (let i = 0; i < this.ops.length; ++i) {
            if (this.ops[i] == null) {
                continue;
            }

            config += `op${i + 1}=${this.ops[i]}\n`;
        }

        return config;
    }
}
