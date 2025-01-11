import fs from 'fs';

import Packet from '#/io/Packet.js';

import { ConfigType } from '#/cache/config/ConfigType.js';
import { ParamHelper, ParamHolder, ParamMap } from '#/cache/config/ParamHelper.js';

export default class StructType extends ConfigType implements ParamHolder {
    private static configNames = new Map<string, number>();
    private static configs: StructType[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/struct.dat`)) {
            return;
        }

        const dat = Packet.load(`${dir}/server/struct.dat`);
        this.parse(dat);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/struct.dat`);
        if (!file.ok) {
            return;
        }

        const dat = new Packet(new Uint8Array(await file.arrayBuffer()));
        this.parse(dat);
    }

    static parse(dat: Packet) {
        StructType.configNames = new Map();
        StructType.configs = [];

        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new StructType(id);
            config.decodeType(dat);

            StructType.configs[id] = config;

            if (config.debugname) {
                StructType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): StructType {
        return StructType.configs[id];
    }

    static getId(name: string): number {
        return StructType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): StructType | null {
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

    params: ParamMap | null = null;

    decode(code: number, dat: Packet) {
        if (code === 249) {
            this.params = ParamHelper.decodeParams(dat);
        } else if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized struct config code: ${code}`);
        }
    }
}
