import fs from 'fs';

import Packet2 from '#jagex2/io/Packet2.js';

import { ConfigType } from '#lostcity/cache/ConfigType.js';
import Jagfile from '#jagex2/io/Jagfile.js';

export default class FloType extends ConfigType {
    static configNames: Map<string, number> = new Map();
    static configs: FloType[] = [];

    static load(dir: string) {
        FloType.configNames = new Map();
        FloType.configs = [];

        if (!fs.existsSync(`${dir}/server/flo.dat`)) {
            console.log('Warning: No flo.dat found.');
            return;
        }

        const server = Packet2.load(`${dir}/server/flo.dat`);
        const count = server.g2();

        const jag = Jagfile.load(`${dir}/client/config`);
        const client = jag.read('flo.dat')!;
        client.pos = 2;

        for (let id = 0; id < count; id++) {
            const config = new FloType(id);
            config.decodeType(server);
            config.decodeType(client);

            FloType.configs[id] = config;

            if (config.debugname) {
                FloType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number): FloType {
        return FloType.configs[id];
    }

    static getId(name: string): number {
        return FloType.configNames.get(name) ?? -1;
    }

    static getByName(name: string): FloType | null {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    decode(code: number, dat: Packet2): void {
        if (code === 250) {
            this.debugname = dat.gjstr();
        } else {
            throw new Error(`Unrecognized flo config code: ${code}`);
        }
    }
}
