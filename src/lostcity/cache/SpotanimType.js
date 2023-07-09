import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class SpotAnimType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        SpotAnimType.configNames = new Map();
        SpotAnimType.configs = [];

        if (!fs.existsSync(`${dir}/spotanim.dat`)) {
            console.log('Warning: No spotanim.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/spotanim.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new SpotAnimType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized spotanim config code: ${code}`);
                }
            }

            SpotAnimType.configs[id] = config;

            if (config.configName) {
                SpotAnimType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return SpotAnimType.configs[id];
    }

    static getId(name) {
        return SpotAnimType.configNames.get(name);
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
    configName = null;
}
