import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class VarNpcType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        VarNpcType.configNames = new Map();
        VarNpcType.configs = [];

        if (!fs.existsSync(`${dir}/varn.dat`)) {
            console.log('Warning: No varn.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/varn.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new VarNpcType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized varn config code: ${code}`);
                }
            }

            VarNpcType.configs[id] = config;

            if (config.configName) {
                VarNpcType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return VarNpcType.configs[id];
    }

    static getId(name) {
        return VarNpcType.configNames.get(name);
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
