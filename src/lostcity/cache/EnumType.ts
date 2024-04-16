import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import { ConfigType } from '#lostcity/cache/ConfigType.js';
import ScriptVarType from '#lostcity/cache/ScriptVarType.js';

export default class EnumType extends ConfigType {
    static configNames = new Map<string, number>();
    static configs: EnumType[] = [];

    static load(dir: string) {
        EnumType.configNames = new Map();
        EnumType.configs = [];

        if (!fs.existsSync(`${dir}/server/enum.dat`)) {
            console.log('Warning: No enum.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/server/enum.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new EnumType(id);
            config.decodeType(dat);

            EnumType.configs[id] = config;

            if (config.debugname) {
                EnumType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): EnumType {
        return EnumType.configs[id];
    }

    static getId(name: string): number {
        return EnumType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): EnumType | null {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----
    // server-side
    inputtype = ScriptVarType.INT;
    outputtype = ScriptVarType.INT;
    defaultInt: number = 0;
    defaultString: string = 'null';
    values = new Map<number, number | string>();

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
            const count = packet.g2();

            for (let i = 0; i < count; i++) {
                this.values.set(packet.g4s(), packet.gjstr());
            }
        } else if (opcode === 6) {
            const count = packet.g2();

            for (let i = 0; i < count; i++) {
                this.values.set(packet.g4s(), packet.g4s());
            }
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            throw new Error(`Unrecognized enum config opcode: ${opcode}`);
        }
    }
}
