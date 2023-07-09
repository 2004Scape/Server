import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import ParamType from './ParamType.js';

export default class VarPlayerType {
    static SCOPE_TEMP = 0;
    static SCOPE_PERM = 1;

    static configNames = new Map();
    static configs = [];

    static load(dir) {
        VarPlayerType.configNames = new Map();
        VarPlayerType.configs = [];

        if (!fs.existsSync(`${dir}/varp.dat`)) {
            console.log('Warning: No varp.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/varp.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new VarPlayerType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    config.scope = dat.g1();
                } else if (code === 2) {
                    config.type = dat.g1();
                } else if (code === 4) {
                    config.protect = false;
                } else if (code === 5) {
                    config.clientcode = dat.g2();
                } else if (code === 6) {
                    config.transmit = true;
                } else if (code === 250) {
                    config.configName = dat.gjstr();
                } else {
                    console.error(`Unrecognized varp config code: ${code}`);
                }
            }

            VarPlayerType.configs[id] = config;

            if (config.configName) {
                VarPlayerType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return VarPlayerType.configs[id];
    }

    static getId(name) {
        return VarPlayerType.configNames.get(name);
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

    clientcode = 0;

    // server-side
    scope = VarPlayerType.SCOPE_TEMP;
    type = ParamType.INT;
    protect = true;
    transmit = false;
    configName = null;
}
