import Packet from '#util/Packet.js';

export default class NpcType {
    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

    id = -1;
    models = [];
    name = '';
    desc = '';
    size = 1;
    readyanim = -1;
    disposeAlpha = false; // probably auto-generated if an animation uses transparency
    walkanim = -1;
    walkanim_b = -1;
    walkanim_r = -1;
    walkanim_l = -1;
    ops = [];
    recol_s = [];
    recol_d = [];
    heads = [];
    opcode90 = -1;
    opcode91 = -1;
    opcode92 = -1;
    visonmap = true;
    vislevel = -1;
    resizex = 128;
    resizez = 128;

    // server only
    attack = 1;
    strength = 1;
    defence = 1;
    ranged = 1;
    magic = 1;
    hitpoints = 1;

    // read dat/idx from config archive
    static unpack(dat, idx, preload = false) {
        NpcType.dat = dat;
        NpcType.count = idx.g2();
        NpcType.offsets = [];
        NpcType.cache = [];

        let offset = 2;
        for (let i = 0; i < NpcType.count; i++) {
            NpcType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < NpcType.count; i++) {
                NpcType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('npc.dat');
        const idx = config.read('npc.idx');

        NpcType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(NpcType.count);
        dat.p2(NpcType.count);

        for (let i = 0; i < NpcType.count; i++) {
            let npcType;
            if (NpcType.cache[i]) {
                npcType = NpcType.cache[i];
            } else {
                npcType = new NpcType(i);
            }

            const npcTypeDat = npcType.encode();
            idx.p2(npcTypeDat.length);
            dat.pdata(npcTypeDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (NpcType.cache[id]) {
            return NpcType.cache[id];
        } else if (typeof NpcType.offsets[id] !== 'undefined') {
            return new NpcType(id);
        } else {
            return null;
        }
    }

    static getByName(name) {
        for (let i = 0; i < NpcType.count; i++) {
            if (NpcType.get(i).name.toLowerCase() == name.toLowerCase()) {
                return NpcType.get(i);
            }
        }
        return null;
    }

    static find(predicate) {
        for (let i = 0; i < NpcType.count; i++) {
            if (predicate(NpcType.get(i))) {
                return NpcType.get(i);
            }
        }
        return null;
    }

    static filter(predicate) {
        let filtered = [];

        for (let i = 0; i < NpcType.count; i++) {
            if (predicate(NpcType.get(i))) {
                filtered.push(NpcType.get(i));
            }
        }

        return filtered;
    }

    static indexOf(predicate, start = 0) {
        for (let i = start; i < NpcType.count; i++) {
            if (predicate(NpcType.get(i))) {
                return i;
            }
        }

        return -1;
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < NpcType.count; i++) {
            config += NpcType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let npc;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                npc = new NpcType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const key = lines[offset].slice(0, lines[offset].indexOf('='));
                const value = lines[offset].slice(lines[offset].indexOf('=') + 1).replaceAll('model_', '').replaceAll('seq_', '');

                if (key.startsWith('model')) {
                    let index = parseInt(key.slice(5)) - 1;
                    npc.models[index] = parseInt(value);
                } else if (key == 'name') {
                    npc.name = value;
                } else if (key == 'desc') {
                    npc.desc = value;
                } else if (key == 'size') {
                    npc.size = parseInt(value);
                } else if (key == 'readyanim') {
                    npc.readyanim = parseInt(value);
                } else if (key == 'walkanim') {
                    npc.walkanim = parseInt(value);
                } else if (key == 'disposealpha') {
                    npc.disposeAlpha = value == 'yes';
                } else if (key == 'walkanim_b') {
                    npc.walkanim_b = parseInt(value);
                } else if (key == 'walkanim_r') {
                    npc.walkanim_r = parseInt(value);
                } else if (key == 'walkanim_l') {
                    npc.walkanim_l = parseInt(value);
                } else if (key.startsWith('op')) {
                    let index = parseInt(key.charAt(2)) - 1;
                    npc.ops[index] = value;
                } else if (key.startsWith('recol')) {
                    let index = parseInt(key.charAt(5)) - 1;
                    let type = key.charAt(6);

                    if (type == 's') {
                        npc.recol_s[index] = parseInt(value);
                    } else if (type == 'd') {
                        npc.recol_d[index] = parseInt(value);
                    }
                } else if (key.startsWith('head')) {
                    let index = parseInt(key.slice(4)) - 1;
                    npc.heads[index] = parseInt(value);
                } else if (key == 'visonmap') {
                    npc.visonmap = value == 'yes';
                } else if (key == 'vislevel') {
                    npc.vislevel = parseInt(value);
                } else if (key == 'resizex') {
                    npc.resizex = parseInt(value);
                } else if (key == 'resizez') {
                    npc.resizez = parseInt(value);
                } else if (key === 'attack') {
                    npc.attack = parseInt(value);
                } else if (key === 'strength') {
                    npc.strength = parseInt(value);
                } else if (key === 'defence') {
                    npc.defence = parseInt(value);
                } else if (key === 'ranged') {
                    npc.ranged = parseInt(value);
                } else if (key === 'magic') {
                    npc.magic = parseInt(value);
                } else if (key === 'hitpoints') {
                    npc.hitpoints = parseInt(value);
                } else {
                    console.log(`Unknown npc key: ${key}`);
                }

                offset++;
            }

            NpcType.cache[npc.id] = npc;
        }

        NpcType.count = NpcType.cache.length;
    }

    constructor(id = 0, decode = true, addToCache = true) {
        this.id = id;

        if (decode) {
            const offset = NpcType.offsets[id];
            if (!offset) {
                return;
            }

            NpcType.dat.pos = offset;
            this.#decode();
        }

        if (addToCache) {
            NpcType.cache[id] = this;
        }
    }

    #decode() {
        const dat = NpcType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.models[i] = dat.g2();
                }
            } else if (opcode == 2) {
                this.name = dat.gjstr();
            } else if (opcode == 3) {
                this.desc = dat.gjstr();
            } else if (opcode == 12) {
                this.size = dat.g1b();
            } else if (opcode == 13) {
                this.readyanim = dat.g2();
            } else if (opcode == 14) {
                this.walkanim = dat.g2();
            } else if (opcode == 16) {
                this.disposeAlpha = true;
            } else if (opcode == 17) {
                this.walkanim = dat.g2();
                this.walkanim_b = dat.g2();
                this.walkanim_r = dat.g2();
                this.walkanim_l = dat.g2();
            } else if (opcode >= 30 && opcode < 40) {
                this.ops[opcode - 30] = dat.gjstr();
            } else if (opcode == 40) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.recol_s[i] = dat.g2();
                    this.recol_d[i] = dat.g2();
                }
            } else if (opcode == 60) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.heads[i] = dat.g2();
                }
            } else if (opcode == 90) {
                this.opcode90 = dat.g2();
            } else if (opcode == 91) {
                this.opcode91 = dat.g2();
            } else if (opcode == 92) {
                this.opcode92 = dat.g2();
            } else if (opcode == 93) {
                this.visonmap = false;
            } else if (opcode == 95) {
                this.vislevel = dat.g2();
            } else if (opcode == 97) {
                this.resizex = dat.g2();
            } else if (opcode == 98) {
                this.resizez = dat.g2();
            } else {
                console.error('Unknown NpcType opcode:', opcode);
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

        if (this.size != 1) {
            dat.p1(12);
            dat.p1(this.size);
        }

        if (this.readyanim != -1) {
            dat.p1(13);
            dat.p2(this.readyanim);
        }

        if (this.walkanim != -1 && this.walkanim_b == -1 && this.walkanim_r == -1 && this.walkanim_l == -1) {
            dat.p1(14);
            dat.p2(this.walkanim);
        }

        if (this.disposeAlpha) {
            dat.p1(16);
        }

        if (this.walkanim_b != -1 || this.walkanim_r != -1 || this.walkanim_l != -1) {
            dat.p1(17);
            dat.p2(this.walkanim);
            dat.p2(this.walkanim_b);
            dat.p2(this.walkanim_r);
            dat.p2(this.walkanim_l);
        }

        for (let i = 0; i < 10; i++) {
            if (this.ops[i]) {
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

        if (this.heads.length) {
            dat.p1(60);
            dat.p1(this.heads.length);

            for (let i = 0; i < this.heads.length; i++) {
                dat.p2(this.heads[i]);
            }
        }

        if (this.opcode90 != -1) {
            dat.p1(90);
            dat.p2(this.opcode90);
        }

        if (this.opcode91 != -1) {
            dat.p1(91);
            dat.p2(this.opcode91);
        }

        if (this.opcode92 != -1) {
            dat.p1(92);
            dat.p2(this.opcode92);
        }

        if (!this.visonmap) {
            dat.p1(93);
        }

        let vislevel = this.vislevel;
        if (vislevel === -1 && (this.attack != 1 || this.strength != 1 || this.defence != 1 || this.hitpoints != 1 || this.ranged != 1 || this.magic != 1)) {
            let defensive = 0.25 * (this.defence + this.hitpoints);

            let melee = 0.325 * (this.attack + this.strength);
            let range = 0.325 * Math.floor(Math.floor(this.ranged / 2) + this.ranged);
            let magic = 0.325 * Math.floor(Math.floor(this.magic / 2) + this.magic);
            let offensive = Math.max(melee, range, magic);

            // TODO: this produces a different result than the cache has.
            // there was an update in august 2004 that corrected a bug with NPC levels.
            // in the meantime we're overriding the computed value with vislevel= and skipping this block of code
            vislevel = Math.floor(defensive + offensive);
        }

        if (vislevel != -1) {
            dat.p1(95);
            dat.p2(vislevel);
        }

        if (this.resizex != 128) {
            dat.p1(97);
            dat.p2(this.resizex);
        }

        if (this.resizez != 128) {
            dat.p1(98);
            dat.p2(this.resizez);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[npc_${this.id}]\n`;

        if (this.name) {
            config += `name=${this.name}\n`;
        }

        if (this.desc) {
            config += `desc=${this.desc}\n`;
        }

        for (let i = 0; i < this.models.length; ++i) {
            config += `model${i + 1}=model_${this.models[i]}\n`;
        }

        for (let i = 0; i < this.heads.length; ++i) {
            config += `head${i + 1}=model_${this.heads[i]}\n`;
        }

        if (this.readyanim != -1) {
            config += `readyanim=seq_${this.readyanim}\n`;
        }

        if (this.walkanim != -1) {
            config += `walkanim=seq_${this.walkanim}\n`;
        }

        if (this.walkanim_b != -1) {
            config += `walkanim_b=seq_${this.walkanim_b}\n`;
        }

        if (this.walkanim_r != -1) {
            config += `walkanim_r=seq_${this.walkanim_r}\n`;
        }

        if (this.walkanim_l != -1) {
            config += `walkanim_l=seq_${this.walkanim_l}\n`;
        }

        if (this.disposeAlpha) {
            config += `disposealpha=yes\n`;
        }

        if (this.size != 1) {
            config += `size=${this.size}\n`;
        }

        if (this.resizex != 128) {
            config += `resizex=${this.resizex}\n`;
        }

        if (this.resizez != 128) {
            config += `resizez=${this.resizez}\n`;
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

        if (this.vislevel != -1) {
            config += `vislevel=${this.vislevel}\n`;
        }

        if (!this.visonmap) {
            config += `visonmap=no\n`;
        }

        return config;
    }
}
