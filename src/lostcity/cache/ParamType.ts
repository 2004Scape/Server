import Packet from '#jagex2/io/Packet.js';
import fs from 'fs';
import { ConfigType } from "#lostcity/cache/ConfigType.js";

export default class ParamType extends ConfigType {
    static INT = 105; // i
    static AUTOINT = 97; // a - virtual type used for enum keys
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

    private static configNames = new Map<string, number>();
    private static configs: ParamType[] = [];

    static load(dir: string) {
        ParamType.configNames = new Map();
        ParamType.configs = [];

        if (!fs.existsSync(`${dir}/param.dat`)) {
            console.log('Warning: No param.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/param.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new ParamType(id);
            config.decodeType(dat);

            ParamType.configs[id] = config;

            if (config.debugname) {
                ParamType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return ParamType.configs[id];
    }

    static getId(name: string) {
        return ParamType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----
    type = ParamType.INT;
    defaultInt = -1;
    defaultString: string | null = null;
    autodisable = true;

    decode(opcode: number, packet: Packet) {
        if (opcode === 1) {
            this.type = packet.g1();
        } else if (opcode === 2) {
            this.defaultInt = packet.g4s();
        } else if (opcode === 4) {
            this.autodisable = false;
        } else if (opcode === 5) {
            this.defaultString = packet.gjstr();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            throw new Error(`Unrecognized param config code: ${opcode}`);
        }
    }

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
