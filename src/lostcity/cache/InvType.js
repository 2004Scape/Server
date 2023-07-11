import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class InvType {
    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;
    static SCOPE_SHARED = 2;

    static configNames = new Map();
    static configs = [];

    static load(dir) {
        InvType.configNames = new Map();
        InvType.configs = [];

        if (!fs.existsSync(`${dir}/inv.dat`)) {
            console.log('Warning: No inv.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/inv.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new InvType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    config.scope = dat.g1();
                } else if (code === 2) {
                    config.size = dat.g2();
                } else if (code === 3) {
                    config.stackall = true;
                } else if (code === 4) {
                    let count = dat.g1();

                    for (let j = 0; j < count; j++) {
                        config.stock.push({
                            id: dat.g2(),
                            count: dat.g2(),
                        });
                    }
                } else if (code === 5) {
                    config.restock = true;
                } else if (code === 6) {
                    config.allstock = true;
                } else if (code === 250) {
                    config.debugname = dat.gjstr();
                } else {
                    console.error(`Unrecognized inv config code: ${code}`);
                }
            }

            InvType.configs[id] = config;

            if (config.debugname) {
                InvType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id) {
        return InvType.configs[id];
    }

    static getId(name) {
        return InvType.configNames.get(name);
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
    debugname = null;
    scope = 0;
    size = 1;
    stackall = false;
    restock = false;
    allstock = false;
    stock = [];
}
