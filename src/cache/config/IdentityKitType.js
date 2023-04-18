import Packet from '#util/Packet.js';

export default class IdentityKitType {
    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

    static BODYPART_MALE_HAIR = 0;
    static BODYPART_MALE_JAW = 1;
    static BODYPART_MALE_TORSO = 2;
    static BODYPART_MALE_ARMS = 3;
    static BODYPART_MALE_HANDS = 4;
    static BODYPART_MALE_LEGS = 5;
    static BODYPART_MALE_FEET = 6;
    static BODYPART_FEMALE_HAIR = 7;
    static BODYPART_FEMALE_JAW = 8;
    static BODYPART_FEMALE_TORSO = 9;
    static BODYPART_FEMALE_ARMS = 10;
    static BODYPART_FEMALE_HANDS = 11;
    static BODYPART_FEMALE_LEGS = 12;
    static BODYPART_FEMALE_FEET = 13;

    // reverse lookup for toJagConfig
    static BODYPART = {
        0: 'BODYPART_MALE_HAIR',
        1: 'BODYPART_MALE_JAW',
        2: 'BODYPART_MALE_TORSO',
        3: 'BODYPART_MALE_ARMS',
        4: 'BODYPART_MALE_HANDS',
        5: 'BODYPART_MALE_LEGS',
        6: 'BODYPART_MALE_FEET',
        7: 'BODYPART_FEMALE_HAIR',
        8: 'BODYPART_FEMALE_JAW',
        9: 'BODYPART_FEMALE_TORSO',
        10: 'BODYPART_FEMALE_ARMS',
        11: 'BODYPART_FEMALE_HANDS',
        12: 'BODYPART_FEMALE_LEGS',
        13: 'BODYPART_FEMALE_FEET'
    };

    id = -1;
    bodypart = -1;
    disable = false;
    models = [];
    recol_s = [];
    recol_d = [];
    heads = [];

    static unpack(dat, idx, preload = false) {
        IdentityKitType.dat = dat;
        IdentityKitType.count = idx.g2();
        IdentityKitType.offsets = [];
        IdentityKitType.cache = [];

        let offset = 2;
        for (let i = 0; i < IdentityKitType.count; i++) {
            IdentityKitType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < IdentityKitType.count; i++) {
                IdentityKitType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('idk.dat');
        const idx = config.read('idk.idx');

        IdentityKitType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(IdentityKitType.count);
        dat.p2(IdentityKitType.count);

        for (let i = 0; i < IdentityKitType.count; i++) {
            let identityKit;
            if (IdentityKitType.cache[i]) {
                identityKit = IdentityKitType.cache[i];
            } else {
                identityKit = new IdentityKitType(i);
            }

            const identityKitDat = identityKit.encode();
            idx.p2(identityKitDat.length);
            dat.pdata(identityKitDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (IdentityKitType.cache[id]) {
            return IdentityKitType.cache[id];
        } else {
            return new IdentityKitType(id);
        }
    }

    static find(predicate) {
        return this.cache.find(predicate);
    }

    static filter(predicate) {
        return this.cache.filter(predicate);
    }

    static indexOf(predicate, start = 0) {
        for (let i = start; i < IdentityKitType.count; i++) {
            if (predicate(IdentityKitType.get(i))) {
                return i;
            }
        }

        return -1;
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < IdentityKitType.count; i++) {
            config += IdentityKitType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let idk;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                idk = new IdentityKitType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const parts = lines[offset].split('=');
                const key = parts[0].trim();
                const value = parts[1].trim().replaceAll('model_', '');

                if (key == 'bodypart') {
                    idk.bodypart = IdentityKitType[value.substring(1)];
                } else if (key == 'disable') {
                    idk.disable = true;
                } else if (key.startsWith('model')) {
                    idk.models = idk.models || [];

                    let number = key.substring('model'.length) - 1;
                    idk.models[number] = parseInt(value);
                } else if (key.startsWith('recol')) {
                    idk.recol_s = idk.recol_s || [];
                    idk.recol_d = idk.recol_d || [];

                    let number = key.substring('recol'.length, 'recol1'.length) - 1;
                    let type = key.substring('recol1'.length);
                    if (type == 's') {
                        idk.recol_s[number] = parseInt(value);
                    } else if (type == 'd') {
                        idk.recol_d[number] = parseInt(value);
                    }
                } else if (key.startsWith('head')) {
                    idk.heads = idk.heads || [];

                    let number = key.substring('head'.length) - 1;
                    idk.heads[number] = parseInt(value);
                }

                offset++;
            }

            IdentityKitType.cache[idk.id] = idk;
        }

        IdentityKitType.count = IdentityKitType.cache.length;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        IdentityKitType.cache[id] = this;

        if (decode) {
            const offset = IdentityKitType.offsets[id];
            if (!offset) {
                return;
            }

            IdentityKitType.dat.pos = offset;
            this.#decode();
        }
    }

    #decode() {
        const dat = IdentityKitType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                this.bodypart = dat.g1();
            } else if (opcode == 2) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.models[i] = dat.g2();
                }
            } else if (opcode == 3) {
                this.disable = true;
            } else if (opcode >= 40 && opcode < 50) {
                this.recol_s[opcode - 40] = dat.g2();
            } else if (opcode >= 50 && opcode < 60) {
                this.recol_d[opcode - 50] = dat.g2();
            } else if (opcode >= 60 && opcode < 70) {
                this.heads[opcode - 60] = dat.g2();
            } else {
                console.error('Unknown IdentityKitType opcode:', opcode);
            }
        }
    }

    encode() {
        const dat = new Packet();

        if (this.bodypart != -1) {
            dat.p1(1);
            dat.p1(this.bodypart);
        }

        if (this.models.length) {
            dat.p1(2);
            dat.p1(this.models.length);

            for (let i = 0; i < this.models.length; i++) {
                dat.p2(this.models[i]);
            }
        }

        if (this.disable) {
            dat.p1(3);
        }

        for (let i = 0; i < this.recol_s.length; i++) {
            dat.p1(40 + i);
            dat.p2(this.recol_s[i]);
        }

        for (let i = 0; i < this.recol_d.length; i++) {
            dat.p1(50 + i);
            dat.p2(this.recol_d[i]);
        }

        for (let i = 0; i < this.heads.length; i++) {
            dat.p1(60 + i);
            dat.p2(this.heads[i]);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[idk_${this.id}]\n`;

        if (this.bodypart != -1) {
            if (IdentityKitType.BODYPART[this.bodypart]) {
                config += `bodypart=^${IdentityKitType.BODYPART[this.bodypart]}\n`;
            } else {
                config += `bodypart=${this.bodypart}\n`;
            }
        }

        if (this.disable) {
            config += 'disable=yes\n';
        }

        if (this.models.length) {
            for (let i = 0; i < this.models.length; i++) {
                config += `model${i + 1}=model_${this.models[i]}\n`;
            }
        }

        if (this.heads.length) {
            for (let i = 0; i < this.heads.length; i++) {
                config += `head${i + 1}=model_${this.heads[i]}\n`;
            }
        }

        if (this.recol_s.length) {
            for (let i = 0; i < this.recol_s.length; i++) {
                config += `recol${i + 1}s=${this.recol_s[i]}\n`;
                config += `recol${i + 1}d=${this.recol_d[i]}\n`;
            }
        }

        return config;
    }
}
