import fs from 'fs';
import Packet from '#jagex2/io/Packet';
import {ConfigType} from "#lostcity/cache/ConfigType";

export default class IdkType extends ConfigType {
    private static configNames: Map<string, number> = new Map();
    private static configs: IdkType[] = [];

    static load(dir: string) {
        IdkType.configNames = new Map();
        IdkType.configs = [];

        if (!fs.existsSync(`${dir}/idk.dat`)) {
            console.log('Warning: No idk.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/idk.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new IdkType(id);
            config.decodeType(dat);

            IdkType.configs[id] = config;

            if (config.debugname) {
                IdkType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): IdkType {
        return IdkType.configs[id];
    }

    static getId(name: string): number {
        return IdkType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): IdkType | null {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----
    type: number = -1;
    models: number[] = [];
    heads: Uint16Array = new Uint16Array(10).fill(-1);
    recol_s: Uint16Array = new Uint16Array(10).fill(0);
    recol_d: Uint16Array = new Uint16Array(10).fill(0);
    disable: boolean = false;

    decode(opcode: number, packet: Packet): void {
        if (opcode === 1) {
            this.type = packet.g1();
        } else if (opcode === 2) {
            const count = packet.g1();
            for (let i = 0; i < count; i++) {
                this.models[i] = packet.g2();
            }
        } else if (opcode === 3) {
            this.disable = true;
        } else if (opcode >= 40 && opcode < 50) {
            this.recol_s[opcode - 40] = packet.g2();
        } else if (opcode >= 50 && opcode < 60) {
            this.recol_d[opcode - 50] = packet.g2();
        } else if (opcode >= 60 && opcode < 70) {
            this.heads[opcode - 60] = packet.g2();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            console.error(`Unrecognized idk config code: ${opcode}`);
        }
    }
}
