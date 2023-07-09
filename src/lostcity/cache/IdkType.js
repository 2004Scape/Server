import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class IdkType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        IdkType.configNames = new Map();
        IdkType.configs = [];

        if (!fs.existsSync(`${dir}/idk.dat`)) {
            console.log('Warning: No idk.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/idk.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new IdkType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    config.type = dat.g1();
                } else if (code === 2) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        config.models[i] = dat.g2();
                    }
                } else if (code === 3) {
                    config.disable = true;
                } else if (code >= 40 && code < 50) {
                    config.recol_s[code - 40] = dat.g2();
                } else if (code >= 50 && code < 60) {
                    config.recol_d[code - 50] = dat.g2();
                } else if (code >= 60 && code < 70) {
                    config.heads[code - 50] = dat.g2();
                } else if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized idk config code: ${code}`);
                }
            }

            IdkType.configs[id] = config;

            if (config.configName) {
                IdkType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return IdkType.configs[id];
    }

    static getId(name) {
        return IdkType.configNames.get(name);
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

    type = -1;
    models = [];
    heads = new Array(10).fill(-1);
    recol_s = new Array(10).fill(0);
    recol_d = new Array(10).fill(0);
    disable = false;

    // server-side
    configName = null;
}
