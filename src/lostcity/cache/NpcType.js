import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export default class NpcType {
    static configNames = new Map();
    static configs = [];

    static load(dir) {
        NpcType.configNames = new Map();
        NpcType.configs = [];

        if (!fs.existsSync(`${dir}/npc.dat`)) {
            console.log('Warning: No npc.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/npc.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new NpcType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        config.models[i] = dat.g2();
                    }
                } else if (code === 2) {
                    config.name = dat.gjstr();
                } else if (code === 3) {
                    config.desc = dat.gjstr();
                } else if (code === 12) {
                    config.size = dat.g1();
                } else if (code === 13) {
                    config.readyanim = dat.g2();
                } else if (code === 14) {
                    config.walkanim = dat.g2();
                } else if (code === 16) {
                    config.hasanim = true;
                } else if (code === 17) {
                    config.walkanim = dat.g2();
                    config.walkanim_b = dat.g2();
                    config.walkanim_r = dat.g2();
                    config.walkanim_l = dat.g2();
                } else if (code === 18) {
                    config.category = dat.g2();
                } else if (code >= 30 && code < 40) {
                    config.ops[code - 30] = dat.gjstr();
                } else if (code === 40) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        config.recol_s[i] = dat.g2();
                        config.recol_d[i] = dat.g2();
                    }
                } else if (code === 60) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        config.heads[i] = dat.g2();
                    }
                } else if (code === 90) {
                    config.code90 = dat.g2();
                } else if (code === 91) {
                    config.code91 = dat.g2();
                } else if (code === 92) {
                    config.code92 = dat.g2();
                } else if (code === 93) {
                    config.visonmap = false;
                } else if (code === 95) {
                    config.vislevel = dat.g2();
                } else if (code === 97) {
                    config.resizeh = dat.g2();
                } else if (code === 98) {
                    config.resizev = dat.g2();
                } else if (code === 249) {
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
                    console.error(`Unrecognized npc config code: ${code}`);
                }
            }

            NpcType.configs[id] = config;

            if (config.configName) {
                NpcType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return NpcType.configs[id];
    }

    static getId(name) {
        return NpcType.configNames.get(name);
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

    name = null;
    desc = null;
    size = 1;
    models = [];
    heads = [];
    readyanim = -1;
    walkanim = -1;
    walkanim_b = -1;
    walkanim_r = -1;
    walkanim_l = -1;
    hasalpha = false;
    recol_s = [];
    recol_d = [];
    ops = [];
    code90 = -1;
    code91 = -1;
    code92 = -1;
    visonmap = true;
    vislevel = -1;
    resizeh = 128;
    resizev = 128;

    // server-side
    category = -1;
    params = new Map();
    configName = null;
}
