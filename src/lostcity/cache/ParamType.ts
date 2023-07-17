import Packet from '#jagex2/io/Packet.js';
import fs from 'fs';
import { ConfigType } from '#lostcity/cache/ConfigType.js';
import ScriptVarType from './ScriptVarType.js';

export default class ParamType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: ParamType[] = [];

    static load(dir: string) {
        ParamType.configNames = new Map();
        ParamType.configs = [];

        if (!fs.existsSync(`${dir}/param.dat`)) {
            console.log('Warning: No param.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/param.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new ParamType(id);
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
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----
    type = ScriptVarType.INT;
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
            case ScriptVarType.INT:
                return 'int';
            case ScriptVarType.STRING:
                return 'string';
            case ScriptVarType.ENUM:
                return 'enum';
            case ScriptVarType.OBJ:
                return 'obj';
            case ScriptVarType.LOC:
                return 'loc';
            case ScriptVarType.COMPONENT:
                return 'component';
            case ScriptVarType.NAMEDOBJ:
                return 'namedobj';
            case ScriptVarType.STRUCT:
                return 'struct';
            case ScriptVarType.BOOLEAN:
                return 'boolean';
            case ScriptVarType.COORD:
                return 'coord';
            case ScriptVarType.CATEGORY:
                return 'category';
            case ScriptVarType.SPOTANIM:
                return 'spotanim';
            case ScriptVarType.NPC:
                return 'npc';
            case ScriptVarType.INV:
                return 'inv';
            case ScriptVarType.SYNTH:
                return 'synth';
            case ScriptVarType.SEQ:
                return 'seq';
            case ScriptVarType.STAT:
                return 'stat';
            default:
                return 'unknown';
        }
    }

    isString() {
        return this.type === ScriptVarType.STRING;
    }

    get default() {
        return this.isString() ? this.defaultString : this.defaultInt;
    }
}
