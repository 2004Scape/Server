import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class StructType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        StructType.configNames = new Map();
        StructType.configs = [];

        if (!fs.existsSync(`${dir}/struct.dat`)) {
            console.log('Warning: No struct.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/struct.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new StructType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 249) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        let key = dat.g3();
                        let isString = dat.gbool();

                        if (isString) {
                            config.params.set(key, dat.gjstr());
                        } else {
                            config.params.set(key, dat.g4s());
                        }
                    }
                } else if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized struct config code: ${code}`);
                }
            }

            StructType.configs[id] = config;

            if (config.configName) {
                StructType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return StructType.configs[id];
    }

    static getId(name) {
        return StructType.configNames.get(name);
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
    configName = null;
    params = new Map();
}
