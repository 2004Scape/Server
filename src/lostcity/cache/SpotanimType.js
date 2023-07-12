import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class SpotanimType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        SpotanimType.configNames = new Map();
        SpotanimType.configs = [];

        if (!fs.existsSync(`${dir}/spotanim.dat`)) {
            console.log('Warning: No spotanim.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/spotanim.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new SpotanimType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
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

    static get(id) {
        return SpotanimType.configs[id];
    }

    static getId(name) {
        return SpotanimType.configNames.get(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    id = -1;

    // server-side
    debugname = null;
}
