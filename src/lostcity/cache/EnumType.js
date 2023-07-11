import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import ParamType from './ParamType.js';

export default class EnumType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        EnumType.configNames = new Map();
        EnumType.configs = [];

        if (!fs.existsSync(`${dir}/enum.dat`)) {
            console.log('Warning: No enum.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/enum.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new EnumType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    config.inputtype = dat.g1();
                } else if (code === 2) {
                    config.outputtype = dat.g1();
                } else if (code === 3) {
                    config.defaultString = dat.gjstr();
                } else if (code === 4) {
                    config.defaultInt = dat.g4s();
                } else if (code === 5) {
                    config.valCount = dat.g2();
                    config.valKey = new Array(config.valCount);
                    config.valString = new Array(config.valCount);

                    for (let i = 0; i < config.valCount; i++) {
                        config.valKey[i] = dat.g4s();
                        config.valString[i] = dat.gjstr();
                    }
                } else if (code === 6) {
                    config.valCount = dat.g2();
                    config.valKey = new Array(config.valCount);
                    config.valInt = new Array(config.valCount);

                    for (let i = 0; i < config.valCount; i++) {
                        config.valKey[i] = dat.g4s();
                        config.valInt[i] = dat.g4s();
                    }
                } else if (code === 250) {
                    config.debugname = dat.gjstr();
                } else {
                    console.error(`Unrecognized enum config code: ${code}`);
                }
            }

            EnumType.configs[id] = config;

            if (config.debugname) {
                EnumType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id) {
        return EnumType.configs[id];
    }

    static getId(name) {
        return EnumType.configNames.get(name);
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
    inputtype = ParamType.INT;
    outputtype = ParamType.INT;
    defaultInt = -1;
    defaultString = null;
    valCount = 0;
    valKey = [];
    valInt = [];
    valString = [];
    debugname = null;
}
