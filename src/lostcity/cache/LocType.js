import Packet from '#jagex2/io/Packet.js';
import fs from 'fs';

export default class LocType {
    static configs = [];

    static load(dir) {
        LocType.configNames = new Map();
        LocType.configs = [];

        if (!fs.existsSync(`${dir}/loc.dat`)) {
            console.log('Warning: No loc.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/loc.dat`);
        let count = dat.g2();

        let active = -1;
        for (let id = 0; id < count; id++) {
            let config = new LocType();
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
                        config.shapes[i] = dat.g1();
                    }
                } else if (code === 2) {
                    config.name = dat.gjstr();
                } else if (code === 3) {
                    config.desc = dat.gjstr();
                } else if (code === 14) {
                    config.width = dat.g1();
                } else if (code === 15) {
                    config.length = dat.g1();
                } else if (code === 17) {
                    config.blockwalk = false;
                } else if (code === 18) {
                    config.blockrange = false;
                } else if (code === 19) {
                    active = dat.g1();

                    if (active == 1) {
                        config.active = true;
                    }
                } else if (code === 21) {
                    config.hillskew = true;
                } else if (code === 22) {
                    config.sharelight = true;
                } else if (code === 23) {
                    config.occlude = true;
                } else if (code === 24) {
                    config.anim = dat.g2();

                    if (config.anim == 65535) {
                        config.anim = -1;
                    }
                } else if (code === 25) {
                    config.hasalpha = true;
                } else if (code === 28) {
                    config.walloff = dat.g1();
                } else if (code === 29) {
                    config.ambient = dat.g1s();
                } else if (code === 39) {
                    config.contrast = dat.g1s();
                } else if (code >= 30 && code < 35) {
                    config.ops[code - 30] = dat.gjstr();
                } else if (code === 40) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        config.recol_s[i] = dat.g2();
                        config.recol_d[i] = dat.g2();
                    }
                } else if (code === 60) {
                    config.mapfunction = dat.g2();
                } else if (code === 62) {
                    config.mirror = true;
                } else if (code === 64) {
                    config.shadow = false;
                } else if (code === 65) {
                    config.resizex = dat.g2();
                } else if (code === 66) {
                    config.resizey = dat.g2();
                } else if (code === 67) {
                    config.resizez = dat.g2();
                } else if (code === 68) {
                    config.mapscene = dat.g2();
                } else if (code === 69) {
                    config.forceapproach = dat.g1();
                } else if (code === 70) {
                    config.xoff = dat.g2s();
                } else if (code === 71) {
                    config.yoff = dat.g2s();
                } else if (code === 72) {
                    config.zoff = dat.g2s();
                } else if (code === 73) {
                    config.forcedecor = true;
                } else if (code === 200) {
                    config.category = dat.g2();
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
                    console.error(`Unrecognized loc config code: ${code}`);
                }
            }

            if (active === -1) {
                config.active = config.shapes.length > 0 && config.shapes[0] === 10;

                if (config.ops.length > 0) {
                    config.active = true;
                }
            }

            LocType.configs[id] = config;

            if (config.configName) {
                LocType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return LocType.configs[id];
    }

    static getId(name) {
        return LocType.configNames.get(name);
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

    models = [];
    shapes = [];
    name = null;
    desc = null;
    recol_s = [];
    recol_d = [];
    width = 1;
    length = 1;
    blockwalk = true;
    blockrange = true;
    active = false;
    hillskew = false;
    sharelight = false;
    occlude = false;
    anim = -1;
    hasalpha = false;
    walloff = 16;
    ambient = 0;
    contrast = 0;
    ops = [];
    mapfunction = -1;
    mapscene = -1;
    mirror = false;
    shadow = true;
    resizex = 128;
    resizey = 128;
    resizez = 128;
    forceapproach = 0;
    xoff = 0;
    yoff = 0;
    zoff = 0;
    forcedecor = false;

    // server-side
    category = -1;
    params = new Map();
    configName = null;
}
