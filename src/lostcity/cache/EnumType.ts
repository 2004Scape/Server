import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import ScriptVarType from './ScriptVarType.js';
import { ConfigType } from "#lostcity/cache/ConfigType.js";

export default class EnumType extends ConfigType {
    static configNames = new Map<string, number>();
    static configs: EnumType[] = [];

    static load(dir: string) {
        EnumType.configNames = new Map();
        EnumType.configs = [];

        if (!fs.existsSync(`${dir}/enum.dat`)) {
            console.log('Warning: No enum.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/enum.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new EnumType(id);
            config.decodeType(dat);

            EnumType.configs[id] = config;

            if (config.debugname) {
                EnumType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return EnumType.configs[id];
    }

    static getId(name: string) {
        return EnumType.configNames.get(name);
    }

    static getByName(name: string) {
        let id = this.getId(name);
        if (id === undefined || id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----
    // server-side
    inputtype = ScriptVarType.INT;
    outputtype = ScriptVarType.INT;
    defaultInt: number;
    defaultString: string;
    values = new Map<number, number | string>()

    decode(opcode: number, packet: Packet): void {
        if (opcode === 1) {
            this.inputtype = packet.g1();
        } else if (opcode === 2) {
            this.outputtype = packet.g1();
        } else if (opcode === 3) {
            this.defaultString = packet.gjstr();
        } else if (opcode === 4) {
            this.defaultInt = packet.g4s();
        } else if (opcode === 5) {
            let count = packet.g2();

            for (let i = 0; i < count; i++) {
                this.values.set(packet.g4s(), packet.gjstr());
            }
        } else if (opcode === 6) {
            let count = packet.g2();

            for (let i = 0; i < count; i++) {
                this.values.set(packet.g4s(), packet.g4s());
            }
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            console.error(`Unrecognized enum config opcode: ${opcode}`);
        }
    }
}
