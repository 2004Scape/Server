import Packet from '#jagex2/io/Packet.js';
import fs from 'fs';

export default class ObjType {
    static HAT = 0;
    static BACK = 1; // cape
    static FRONT = 2; // amulet
    static RIGHT_HAND = 3;
    static TORSO = 4;
    static LEFT_HAND = 5;
    static ARMS = 6;
    static LEGS = 7;
    static HEAD = 8;
    static HANDS = 9;
    static FEET = 10;
    static JAW = 11;
    static RING = 12;
    static QUIVER = 13;

    static configNames = new Map();
    static configs = [];

    static load(dir) {
        ObjType.configNames = new Map();
        ObjType.configs = [];

        if (!fs.existsSync(`${dir}/obj.dat`)) {
            console.log('Warning: No obj.dat found.');
            return;
        }

        let dat = Packet.load(`${dir}/obj.dat`);
        let count = dat.g2();

        for (let id = 0; id < count; id++) {
            let config = new ObjType();
            config.id = id;

            while (dat.available > 0) {
                let code = dat.g1();
                if (code === 0) {
                    break;
                }

                if (code === 1) {
                    config.model = dat.g2();
                } else if (code === 2) {
                    config.name = dat.gjstr();
                } else if (code === 3) {
                    config.desc = dat.gjstr();
                } else if (code === 4) {
                    config.zoom2d = dat.g2();
                } else if (code === 5) {
                    config.xan2d = dat.g2();
                } else if (code === 6) {
                    config.yan2d = dat.g2();
                } else if (code === 7) {
                    config.xof2d = dat.g2s();
                } else if (code === 8) {
                    config.yof2d = dat.g2s();
                } else if (code === 9) {
                    config.code9 = true;
                } else if (code === 10) {
                    config.code10 = dat.g2();
                } else if (code === 11) {
                    config.stackable = true;
                } else if (code === 12) {
                    config.cost = dat.g4s();
                } else if (code === 13) {
                    config.wearpos = dat.g1();
                } else if (code === 14) {
                    config.wearpos2 = dat.g1();
                } else if (code === 16) {
                    config.members = true;
                } else if (code === 23) {
                    config.manwear = dat.g2();
                    config.manwearOffsetY = dat.g1s();
                } else if (code === 24) {
                    config.manwear2 = dat.g2();
                } else if (code === 25) {
                    config.womanwear = dat.g2();
                    config.womanwearOffsetY = dat.g1s();
                } else if (code === 26) {
                    config.womanwear2 = dat.g2();
                } else if (code === 27) {
                    config.wearpos3 = dat.g1();
                } else if (code >= 30 && code < 35) {
                    config.ops[code - 30] = dat.gjstr();
                } else if (code >= 35 && code < 40) {
                    config.iops[code - 35] = dat.gjstr();
                } else if (code === 40) {
                    let count = dat.g1();

                    for (let i = 0; i < count; i++) {
                        config.recol_s[i] = dat.g2();
                        config.recol_d[i] = dat.g2();
                    }
                } else if (code === 75) {
                    config.weight = dat.g2s();
                } else if (code === 78) {
                    config.manwear3 = dat.g2();
                } else if (code === 79) {
                    config.womanwear3 = dat.g2();
                } else if (code === 90) {
                    config.manhead = dat.g2();
                } else if (code === 91) {
                    config.womanhead = dat.g2();
                } else if (code === 92) {
                    config.manhead2 = dat.g2();
                } else if (code === 93) {
                    config.womanhead2 = dat.g2();
                } else if (code === 94) {
                    config.category = dat.g2();
                } else if (code === 95) {
                    config.zan2d = dat.g2();
                } else if (code === 96) {
                    config.dummyitem = dat.g1();
                } else if (code === 97) {
                    config.certlink = dat.g2();
                } else if (code === 98) {
                    config.certtemplate = dat.g2();
                } else if (code >= 100 && code < 110) {
                    config.countobj[code - 100] = dat.g2();
                    config.countco[count - 100] = dat.g2();
                } else if (code === 200) {
                    config.tradeable = true;
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
                    console.error(`Unrecognized obj config code: ${code}`);
                }
            }

            ObjType.configs[id] = config;

            if (config.configName) {
                ObjType.configNames.set(config.configName, id);
            }
        }
    }

    static get(id) {
        return ObjType.configs[id];
    }

    static getId(name) {
        return ObjType.configNames.get(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    model = 0;
    name = null;
    desc = null;
    recol_s = [];
    recol_d = [];
    zoom2d = 2000;
    xan2d = 0;
    yan2d = 0;
    zan2d = 0;
    xof2d = 0;
    yof2d = 0;
    code9 = false;
    code10 = -1;
    stackable = false;
    cost = 1;
    members = false;
    ops = [];
    iops = [];
    manwear = -1;
    manwear2 = -1;
    manwearOffsetY = 0;
    womanwear = -1;
    womanwear2 = -1;
    womanwearOffsetY = 0;
    manwear3 = -1;
    womanwear3 = -1;
    manhead = -1;
    manhead2 = -1;
    womanhead = -1;
    womanhead2 = -1;
    countobj = [];
    countco = [];
    certlink = -1;
    certtemplate = -1;

    // server-side
    wearpos = -1;
    wearpos2 = -1;
    wearpos3 = -1;
    weight = 0; // in grams
    category = -1;
    dummyitem = 0;
    tradeable = false;
    params = new Map();

    toCertificate() {
        let template = ObjType.get(this.certtemplate);
        this.model = template.model;
        this.zoom2d = template.zoom2d;
        this.xan2d = template.xan2d;
        this.yan2d = template.yan2d;
        this.zan2d = template.zan2d;
        this.xof2d = template.xof2d;
        this.yof2d = template.yof2d;
        this.recol_s = template.recol_s;
        this.recol_d = template.recol_d;

        let link = ObjType.get(this.certlink);
        this.name = link.name;
        this.members = link.members;
        this.cost = link.cost;

        let article = 'a';
        let c = link.name.toLowerCase().charAt(0);
        if (c === 'a' || c === 'e' || c === 'i' || c === 'o' || c === 'u') {
            article = 'an';
        }
        this.desc = `Swap this note at any bank for ${article} ${link.name}.`;

        this.stackable = true;
    }
}

console.time('Loading obj.dat');
ObjType.load('data/pack/server');
console.timeEnd('Loading obj.dat');
