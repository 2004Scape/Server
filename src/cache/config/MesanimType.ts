import fs from 'fs';

import Packet from '#/io/Packet.js';

import { ConfigType } from '#/cache/config/ConfigType.js';

export default class MesanimType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: MesanimType[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/mesanim.dat`)) {
            return;
        }
        const dat = Packet.load(`${dir}/server/mesanim.dat`);
        this.parse(dat);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/mesanim.dat`);
        if (!file.ok) {
            return;
        }

        const dat = new Packet(new Uint8Array(await file.arrayBuffer()));
        this.parse(dat);
    }

    static parse(dat: Packet) {
        MesanimType.configNames = new Map();
        MesanimType.configs = [];

        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new MesanimType(id);
            config.decodeType(dat);

            MesanimType.configs[id] = config;

            if (config.debugname) {
                MesanimType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): MesanimType {
        return MesanimType.configs[id];
    }

    static getId(name: string): number {
        return MesanimType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    static get count() {
        return this.configs.length;
    }

    // ----

    len: number[] = new Array(4).fill(-1);

    decode(code: number, dat: Packet) {
        if (code >= 1 && code < 5) {
            this.len[code - 1] = dat.g2();
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized mesanim config code: ${code}`);
        }
    }
}
