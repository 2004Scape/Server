import Packet from '#jagex2/io/Packet.js';

export default class ParamType {
    static INT = 105; // i
    static STRING = 115; // s 
    static ENUM = 103; // g
    static OBJ = 111; // o
    static LOC = 108; // l
    static COMPONENT = 73; // I
    static NAMEDOBJ = 79; // O
    static STRUCT = 74; // J
    static BOOLEAN = 49; // 1
    static COORD = 99; // c
    static CATEGORY = 121; // y
    static SPOTANIM = 116; // t
    static NPC = 110; // n
    static INV = 118; // v
    static SYNTH = 80; // P
    static SEQ = 65; // A
    static STAT = 83; // S

    static configNames = new Map();
    static configs = [];

    static load(dir) {
        ParamType.configNames = new Map();
        ParamType.configs = [];

        let dat = Packet.load(`${dir}/param.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new ParamType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    config.type = dat.g1();
                } else if (code === 2) {
                    config.defaultInt = dat.g4s();
                } else if (code === 4) {
                    config.autodisable = false;
                } else if (code === 5) {
                    config.defaultString = dat.gjstr();
                } else if (code === 250) {
                    config.configName = dat.gjstr();
                }
            }

            ParamType.configs[id] = config;

            if (config.configName) {
                ParamType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return ParamType.configs[id];
    }

    static getId(name) {
        return ParamType.configNames.get(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    id = -1;
    configName = null;

    type = ParamType.INT;
    defaultInt = -1;
    defaultString = null;
    autodisable = true;

    getType() {
        switch (this.type) {
            case ParamType.INT:
                return 'int';
            case ParamType.STRING:
                return 'string';
            case ParamType.ENUM:
                return 'enum';
            case ParamType.OBJ:
                return 'obj';
            case ParamType.LOC:
                return 'loc';
            case ParamType.COMPONENT:
                return 'component';
            case ParamType.NAMEDOBJ:
                return 'namedobj';
            case ParamType.STRUCT:
                return 'struct';
            case ParamType.BOOLEAN:
                return 'boolean';
            case ParamType.COORD:
                return 'coord';
            case ParamType.CATEGORY:
                return 'category';
            case ParamType.SPOTANIM:
                return 'spotanim';
            case ParamType.NPC:
                return 'npc';
            case ParamType.INV:
                return 'inv';
            case ParamType.SYNTH:
                return 'synth';
            case ParamType.SEQ:
                return 'seq';
            case ParamType.STAT:
                return 'stat';
            default:
                return 'unknown';
        }
    }

    isString() {
        return this.type === ParamType.STRING;
    }

    get default() {
        return this.isString() ? this.defaultString : this.defaultInt;
    }
}

console.time('Loading param.dat');
ParamType.load('data/pack/server');
console.timeEnd('Loading param.dat');
