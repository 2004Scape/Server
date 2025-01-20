import fs from 'fs';

import Packet from '#/io/Packet.js';
import { ConfigType } from '#/cache/config/ConfigType.js';
import ScriptVarType from '#/cache/config/ScriptVarType.js';
import { printError } from '#/util/Logger.js';

export default class VarSharedType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: VarSharedType[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/vars.dat`)) {
            return;
        }

        const dat = Packet.load(`${dir}/server/vars.dat`);
        this.parse(dat);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/vars.dat`);
        if (!file.ok) {
            return;
        }

        const dat = new Packet(new Uint8Array(await file.arrayBuffer()));
        this.parse(dat);
    }

    static parse(dat: Packet) {
        VarSharedType.configNames = new Map();
        VarSharedType.configs = [];

        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new VarSharedType(id);
            config.decodeType(dat);

            VarSharedType.configs[id] = config;

            if (config.debugname) {
                VarSharedType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): VarSharedType {
        return VarSharedType.configs[id];
    }

    static getId(name: string): number {
        return VarSharedType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): VarSharedType | null {
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

    type = ScriptVarType.INT;

    decode(code: number, dat: Packet) {
        switch (code) {
            case 1:
                this.type = dat.g1();
                break;
            case 250:
                this.debugname = dat.gjstr();
                break;
            default:
                printError(`Unrecognized vars config code: ${code}`);
                break;
        }
    }
}
