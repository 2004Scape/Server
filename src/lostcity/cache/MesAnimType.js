import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class MesAnimType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        MesAnimType.configNames = new Map();
        MesAnimType.configs = [];

        if (!fs.existsSync(`${dir}/mesanim.dat`)) {
            console.log('Warning: No mesanim.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/mesanim.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new MesAnimType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.debugname = dat.gjstr();
                } else {
                    console.error(`Unrecognized mesanim config code: ${code}`);
                }
            }

            MesAnimType.configs[id] = config;

            if (config.debugname) {
                MesAnimType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id) {
        return MesAnimType.configs[id];
    }

    static getId(name) {
        return MesAnimType.configNames.get(name);
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
