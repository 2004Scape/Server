import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

export default class SpotanimType {
    static configNames = new Map();
    static configs: SpotanimType[] = [];

    static load(dir: string) {
        SpotanimType.configNames = new Map();
        SpotanimType.configs = [];

        if (!fs.existsSync(`${dir}/spotanim.dat`)) {
            console.log('Warning: No spotanim.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/spotanim.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new SpotanimType();
            config.id = id;

            while (dat.available > 0) {
                const code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.debugname = dat.gjstr();
                } else {
                    console.error(`Unrecognized spotanim config code: ${code}`);
                }
            }

            SpotanimType.configs[id] = config;

            if (config.debugname) {
                SpotanimType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return SpotanimType.configs[id];
    }

    static getId(name: string) {
        return SpotanimType.configNames.get(name);
    }

    static getByName(name: string) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    id = -1;

    // server-side
    debugname: string | null = null;
}
