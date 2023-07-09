import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import { ConfigType } from "#lostcity/cache/ConfigType.js";

export default class VarNpcType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: VarNpcType[] = [];

    static load(dir: string) {
        VarNpcType.configNames = new Map();
        VarNpcType.configs = [];

        if (!fs.existsSync(`${dir}/varn.dat`)) {
            console.log('Warning: No varn.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/varn.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new VarNpcType(id);
            config.decodeType(dat);

            VarNpcType.configs[id] = config;

            if (config.debugname) {
                VarNpcType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return VarNpcType.configs[id];
    }

    static getId(name: string) {
        return VarNpcType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    decode(opcode: number, packet: Packet) {
        if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            console.error(`Unrecognized varn config code: ${opcode}`);
        }
    }
}
