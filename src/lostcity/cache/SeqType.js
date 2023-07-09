import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class SeqType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        SeqType.configNames = new Map();
        SeqType.configs = [];

        if (!fs.existsSync(`${dir}/seq.dat`)) {
            console.log('Warning: No seq.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/seq.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new SeqType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized seq config code: ${code}`);
                }
            }

            SeqType.configs[id] = config;

            if (config.configName) {
                SeqType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return SeqType.configs[id];
    }

    static getId(name) {
        return SeqType.configNames.get(name);
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
