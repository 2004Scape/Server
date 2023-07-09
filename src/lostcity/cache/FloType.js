import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class FloType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        FloType.configNames = new Map();
        FloType.configs = [];

        if (!fs.existsSync(`${dir}/flo.dat`)) {
            console.log('Warning: No flo.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/flo.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new FloType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized flo config code: ${code}`);
                }
            }

            FloType.configs[id] = config;

            if (config.configName) {
                FloType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return FloType.configs[id];
    }

    static getId(name) {
        return FloType.configNames.get(name);
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
