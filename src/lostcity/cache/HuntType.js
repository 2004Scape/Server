import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class HuntType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        HuntType.configNames = new Map();
        HuntType.configs = [];

        if (!fs.existsSync(`${dir}/hunt.dat`)) {
            console.log('Warning: No hunt.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/hunt.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new HuntType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized hunt config code: ${code}`);
                }
            }

            HuntType.configs[id] = config;

            if (config.configName) {
                HuntType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return HuntType.configs[id];
    }

    static getId(name) {
        return HuntType.configNames.get(name);
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
