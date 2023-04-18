import Packet from '#util/Packet.js';

function getWearPosIndex(pos) {
    if (pos === 'helmet') {
        return 0;
    } else if (pos === 'cape') {
        return 1;
    } else if (pos === 'amulet') {
        return 2;
    } else if (pos === 'righthand') {
        return 3;
    } else if (pos === 'body') {
        return 4;
    } else if (pos === 'lefthand') {
        return 5;
    } else if (pos === 'arms') {
        return 6;
    } else if (pos === 'legs') {
        return 7;
    } else if (pos === 'hair') {
        return 8;
    } else if (pos === 'gloves') {
        return 9;
    } else if (pos === 'boots') {
        return 10;
    } else if (pos === 'beard') {
        return 11;
    } else if (pos === 'ring') {
        return 12;
    } else if (pos === 'ammo') {
        return 13;
    } else {
        return null;
    }
}

export default class ObjectType {
    static HELMET = 0;
    static CAPE = 1;
    static AMULET = 2;
    static RIGHT_HAND = 3;
    static BODY = 4;
    static LEFT_HAND = 5;
    static ARMS = 6;
    static LEGS = 7;
    static HAIR = 8;
    static GLOVES = 9;
    static BOOTS = 10;
    static BEARD = 11;
    static RING = 12;
    static AMMO = 13;

    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

    id = -1;
    model = 0;
    name = '';
    desc = '';
    zoom2d = 2000;
    xan2d = 0;
    yan2d = 0;
    xof2d = 0;
    yof2d = 0;
    opcode9 = false;
    opcode10 = -1;
    stackable = false;
    cost = 1;
    members = false;
    manwear = -1;
    manwearOffsetY = 0;
    manwear2 = -1;
    womanwear = -1;
    womanwearOffsetY = 0;
    womanwear2 = -1;
    ops = [];
    iops = [];
    recol_s = [];
    recol_d = [];
    manwear3 = -1;
    womanwear3 = -1;
    manhead = -1;
    womanhead = -1;
    manhead2 = -1;
    womanhead2 = -1;
    zan2d = 0;
    certlink = -1;
    certtemplate = -1;
    countobj = [];
    countco = [];

    // server only
    weight = 0; // in grams
    wearpos = [];

    static unpack(dat, idx, preload = false) {
        ObjectType.dat = dat;
        ObjectType.count = idx.g2();
        ObjectType.offsets = [];
        ObjectType.cache = [];

        let offset = 2;
        for (let i = 0; i < ObjectType.count; i++) {
            ObjectType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < ObjectType.count; i++) {
                ObjectType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('obj.dat');
        const idx = config.read('obj.idx');

        ObjectType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(ObjectType.count);
        dat.p2(ObjectType.count);

        for (let i = 0; i < ObjectType.count; i++) {
            let objectType;
            if (ObjectType.cache[i]) {
                objectType = ObjectType.cache[i];
            } else {
                objectType = new ObjectType(i);
            }

            const objectTypeDat = objectType.encode();
            idx.p2(objectTypeDat.length);
            dat.pdata(objectTypeDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (ObjectType.cache[id]) {
            return ObjectType.cache[id];
        } else if (typeof ObjectType.offsets[id] !== 'undefined') {
            return new ObjectType(id);
        } else {
            return null;
        }
    }

    static getByName(name) {
        for (let i = 0; i < ObjectType.count; i++) {
            if (ObjectType.get(i).name.replaceAll(' ', '_').toLowerCase() == name.toLowerCase()) {
                return ObjectType.get(i);
            }
        }
        return null;
    }

    static find(predicate) {
        for (let i = 0; i < ObjectType.count; i++) {
            if (predicate(ObjectType.get(i))) {
                return ObjectType.get(i);
            }
        }
        return null;
    }

    static filter(predicate) {
        let filtered = [];

        for (let i = 0; i < ObjectType.count; i++) {
            if (predicate(ObjectType.get(i))) {
                filtered.push(ObjectType.get(i));
            }
        }

        return filtered;
    }

    static indexOf(predicate, start = 0) {
        for (let i = start; i < ObjectType.count; i++) {
            if (predicate(ObjectType.get(i))) {
                return i;
            }
        }

        return -1;
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < ObjectType.count; i++) {
            config += ObjectType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let obj;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                obj = new ObjectType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const key = lines[offset].slice(0, lines[offset].indexOf('='));
                const value = lines[offset].slice(lines[offset].indexOf('=') + 1).replaceAll('model_', '').replaceAll('seq_', '').replaceAll('obj_', '');

                if (key == 'model') {
                    obj.model = parseInt(value);
                } else if (key == 'name') {
                    obj.name = value;
                } else if (key == 'desc') {
                    obj.desc = value;
                } else if (key == '2dzoom') {
                    obj.zoom2d = parseInt(value);
                } else if (key == '2dxan') {
                    obj.xan2d = parseInt(value);
                } else if (key == '2dyan') {
                    obj.yan2d = parseInt(value);
                } else if (key == '2dxof') {
                    obj.xof2d = parseInt(value);
                } else if (key == '2dyof') {
                    obj.yof2d = parseInt(value);
                } else if (key == 'stackable') {
                    obj.stackable = value == 'yes';
                } else if (key == 'cost') {
                    obj.cost = parseInt(value);
                } else if (key == 'members') {
                    obj.members = value == 'yes';
                } else if (key == 'manwear') {
                    if (value.indexOf(',') !== -1) {
                        const parts = value.split(',');
                        obj.manwear = parseInt(parts[0]);
                        obj.manwearOffsetY = parseInt(parts[1]);
                    } else {
                        obj.manwear = parseInt(value);
                    }
                } else if (key == 'manwear2') {
                    obj.manwear2 = parseInt(value);
                } else if (key == 'womanwear') {
                    if (value.indexOf(',') !== -1) {
                        const parts = value.split(',');
                        obj.womanwear = parseInt(parts[0]);
                        obj.womanwearOffsetY = parseInt(parts[1]);
                    } else {
                        obj.womanwear = parseInt(value);
                    }
                } else if (key == 'womanwear2') {
                    obj.womanwear2 = parseInt(value);
                } else if (key.startsWith('op')) {
                    let index = parseInt(key.charAt(2)) - 1;
                    obj.ops[index] = value;
                } else if (key.startsWith('iop')) {
                    let index = parseInt(key.charAt(3)) - 1;
                    obj.iops[index] = value;
                } else if (key.startsWith('recol')) {
                    let index = parseInt(key.charAt(5)) - 1;
                    let type = key.charAt(6);

                    if (type == 's') {
                        obj.recol_s[index] = parseInt(value);
                    } else if (type == 'd') {
                        obj.recol_d[index] = parseInt(value);
                    }
                } else if (key == 'manwear3') {
                    obj.manwear3 = parseInt(value);
                } else if (key == 'womanwear3') {
                    obj.womanwear3 = parseInt(value);
                } else if (key == 'manhead') {
                    obj.manhead = parseInt(value);
                } else if (key == 'womanhead') {
                    obj.womanhead = parseInt(value);
                } else if (key == 'manhead2') {
                    obj.manhead2 = parseInt(value);
                } else if (key == 'womanhead2') {
                    obj.womanhead2 = parseInt(value);
                } else if (key == '2dzan') {
                    obj.zan2d = parseInt(value);
                } else if (key == 'certlink') {
                    obj.certlink = parseInt(value);
                } else if (key == 'certtemplate') {
                    obj.certtemplate = parseInt(value);
                } else if (key.startsWith('count')) {
                    const parts = value.split(',');
                    let index = parseInt(key.charAt(5)) - 1;
                    obj.countobj[index] = parseInt(parts[0]);
                    obj.countco[index] = parseInt(parts[1]);
                } else if (key.startsWith('weight')) {
                    // TODO: weight conversions to grams
                } else if (key.startsWith('wearpos')) {
                    const pos = value.split(',');
                    obj.wearpos = pos.filter(p => getWearPosIndex(p) !== null).map(p => getWearPosIndex(p));
                } else {
                    console.log(`Unknown obj key: ${key}`);
                }

                offset++;
            }

            ObjectType[obj.id] = obj;
        }

        ObjectType.count = ObjectType.cache.length;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        ObjectType.cache[id] = this;

        if (decode) {
            const offset = ObjectType.offsets[id];
            if (!offset) {
                return;
            }

            ObjectType.dat.pos = offset;
            this.#decode();

            if (this.certtemplate != -1) {
                this.#toCertificate();
            }
        }
    }

    getHighAlchValue() {
        return Math.floor(this.cost * 0.6);
    }

    getLowAlchValue() {
        return Math.floor(this.cost * 0.4);
    }

    #decode() {
        const dat = ObjectType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                this.model = dat.g2();
            } else if (opcode == 2) {
                this.name = dat.gjstr();
            } else if (opcode == 3) {
                this.desc = dat.gjstr();
            } else if (opcode == 4) {
                this.zoom2d = dat.g2();
            } else if (opcode == 5) {
                this.xan2d = dat.g2s();
            } else if (opcode == 6) {
                this.yan2d = dat.g2s();
            } else if (opcode == 7) {
                this.xof2d = dat.g2s();
            } else if (opcode == 8) {
                this.yof2d = dat.g2s();
            } else if (opcode == 9) {
                this.opcode9 = true;
            } else if (opcode == 10) {
                this.opcode10 = dat.g2();
            } else if (opcode == 11) {
                this.stackable = true;
            } else if (opcode == 12) {
                this.cost = dat.g4();
            } else if (opcode == 16) {
                this.members = true;
            } else if (opcode == 23) {
                this.manwear = dat.g2();
                this.manwearOffsetY = dat.g1b();
            } else if (opcode == 24) {
                this.manwear2 = dat.g2();
            } else if (opcode == 25) {
                this.womanwear = dat.g2();
                this.womanwearOffsetY = dat.g1b();
            } else if (opcode == 26) {
                this.womanwear2 = dat.g2();
            } else if (opcode >= 30 && opcode < 35) {
                this.ops[opcode - 30] = dat.gjstr();
            } else if (opcode >= 35 && opcode < 40) {
                this.iops[opcode - 35] = dat.gjstr();
            } else if (opcode == 40) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.recol_s[i] = dat.g2();
                    this.recol_d[i] = dat.g2();
                }
            } else if (opcode == 78) {
                this.manwear3 = dat.g2();
            } else if (opcode == 79) {
                this.womanwear3 = dat.g2();
            } else if (opcode == 90) {
                this.manhead = dat.g2();
            } else if (opcode == 91) {
                this.womanhead = dat.g2();
            } else if (opcode == 92) {
                this.manhead2 = dat.g2();
            } else if (opcode == 93) {
                this.womanhead2 = dat.g2();
            } else if (opcode == 95) {
                this.zan2d = dat.g2();
            } else if (opcode == 97) {
                this.certlink = dat.g2();
            } else if (opcode == 98) {
                this.certtemplate = dat.g2();
            } else if (opcode >= 100 && opcode < 110) {
                this.countobj[opcode - 100] = dat.g2();
                this.countco[opcode - 100] = dat.g2();
            } else {
                console.error('Unknown ObjectType opcode:', opcode);
            }
        }
    }

    #toCertificate() {
        let template = new ObjectType(this.certtemplate);
        this.model = template.model;
        this.zoom2d = template.zoom2d;
        this.xan2d = template.xan2d;
        this.yan2d = template.yan2d;
        this.zan2d = template.zan2d;
        this.xof2d = template.xof2d;
        this.yof2d = template.yof2d;
        this.recol_s = template.recol_s;
        this.recol_d = template.recol_d;

        let link = new ObjectType(this.certlink);
        this.name = link.name;
        this.desc = link.desc;
        this.cost = link.cost;

        let article = 'a';
        if (link.name[0] == 'A' || link.name[0] == 'E' || link.name[0] == 'I' || link.name[0] == 'O' || link.name[0] == 'U') {
            article = 'an';
        }
        this.desc = `Swap this note at any bank for ${article} ${link.name}.`;
        this.stackable = true;
    }

    encode() {
        const dat = new Packet();

        if (this.model != 0 && this.certtemplate == -1) {
            dat.p1(1);
            dat.p2(this.model);
        }

        if (this.name && this.certlink == -1) {
            dat.p1(2);
            dat.pjstr(this.name);
        }

        if (this.desc && this.certlink == -1) {
            dat.p1(3);
            dat.pjstr(this.desc);
        }

        if (this.zoom2d != 2000 && this.certtemplate == -1) {
            dat.p1(4);
            dat.p2(this.zoom2d);
        }

        if (this.xan2d != 0 && this.certtemplate == -1) {
            dat.p1(5);
            dat.p2(this.xan2d);
        }

        if (this.yan2d != 0 && this.certtemplate == -1) {
            dat.p1(6);
            dat.p2(this.yan2d);
        }

        if (this.xof2d != 0 && this.certtemplate == -1) {
            dat.p1(7);
            dat.p2(this.xof2d);
        }

        if (this.yof2d != 0 && this.certtemplate == -1) {
            dat.p1(8);
            dat.p2(this.yof2d);
        }

        if (this.opcode9) {
            dat.p1(9);
        }

        if (this.opcode10 != -1) {
            dat.p1(10);
            dat.p2(this.opcode10);
        }

        if (this.stackable && this.certtemplate == -1) {
            dat.p1(11);
        }

        if (this.cost != 1 && this.certlink == -1) {
            dat.p1(12);
            dat.p4(this.cost);
        }

        if (this.members) {
            dat.p1(16);
        }

        if (this.manwear != -1) {
            dat.p1(23);
            dat.p2(this.manwear);
            dat.p1(this.manwearOffsetY);
        }

        if (this.manwear2 != -1) {
            dat.p1(24);
            dat.p2(this.manwear2);
        }

        if (this.womanwear != -1) {
            dat.p1(25);
            dat.p2(this.womanwear);
            dat.p1(this.womanwearOffsetY);
        }

        if (this.womanwear2 != -1) {
            dat.p1(26);
            dat.p2(this.womanwear2);
        }

        for (let i = 0; i < 5; i++) {
            if (this.ops[i] != null) {
                dat.p1(30 + i);
                dat.pjstr(this.ops[i]);
            }
        }

        for (let i = 0; i < 5; i++) {
            if (this.iops[i] != null) {
                dat.p1(35 + i);
                dat.pjstr(this.iops[i]);
            }
        }

        if (this.recol_s.length && this.certtemplate == -1) {
            dat.p1(40);
            dat.p1(this.recol_s.length);

            for (let i = 0; i < this.recol_s.length; i++) {
                dat.p2(this.recol_s[i]);
                dat.p2(this.recol_d[i]);
            }
        }

        if (this.manwear3 != -1) {
            dat.p1(78);
            dat.p2(this.manwear3);
        }

        if (this.womanwear3 != -1) {
            dat.p1(79);
            dat.p2(this.womanwear3);
        }

        if (this.manhead != -1) {
            dat.p1(90);
            dat.p2(this.manhead);
        }

        if (this.womanhead != -1) {
            dat.p1(91);
            dat.p2(this.womanhead);
        }

        if (this.manhead2 != -1) {
            dat.p1(92);
            dat.p2(this.manhead2);
        }

        if (this.womanhead2 != -1) {
            dat.p1(93);
            dat.p2(this.womanhead2);
        }

        if (this.zan2d != 0) {
            dat.p1(95);
            dat.p2(this.zan2d);
        }

        if (this.certlink != -1) {
            dat.p1(97);
            dat.p2(this.certlink);
        }

        if (this.certtemplate != -1) {
            dat.p1(98);
            dat.p2(this.certtemplate);
        }

        for (let i = 0; i < this.countobj.length; i++) {
            dat.p1(100 + i);
            dat.p2(this.countobj[i]);
            dat.p2(this.countco[i]);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config;

        if (this.certlink != -1) {
            config = `[cert_obj_${this.id}]\n`;
            config += `certlink=obj_${this.certlink}\n`;
            config += `certtemplate=obj_${this.certtemplate}\n`;
            return config;
        } else {
            config = `[obj_${this.id}]\n`;
        }

		if (this.name) {
            config += `name=${this.name}\n`;
		}

		if (this.desc) {
            config += `desc=${this.desc}\n`;
		}

		if (this.model != 0) {
            config += `model=model_${this.model}\n`;
		}

		if (this.manwear != -1) {
            config += `manwear=model_${this.manwear}`;

			if (this.manwearOffsetY != 0) {
                config += `,${this.manwearOffsetY}`;
			}

            config += '\n';
		}

		if (this.manwear2 != -1) {
            config += `manwear2=model_${this.manwear2}\n`;
		}

		if (this.manwear3 != -1) {
            config += `manwear3=model_${this.manwear3}\n`;
		}

		if (this.womanwear != -1) {
            config += `womanwear=model_${this.womanwear}`;

			if (this.womanwearOffsetY != 0) {
                config += `,${this.womanwearOffsetY}`;
			}

            config += '\n';
		}

		if (this.womanwear2 != -1) {
            config += `womanwear2=model_${this.womanwear2}\n`;
		}

		if (this.womanwear3 != -1) {
            config += `womanwear3=model_${this.womanwear3}\n`;
		}

		if (this.manhead != -1) {
            config += `manhead=model_${this.manhead}\n`;
		}

		if (this.manhead2 != -1) {
            config += `manhead2=model_${this.manhead2}\n`;
		}

		if (this.womanhead != -1) {
            config += `womanhead=model_${this.womanhead}\n`;
		}

		if (this.womanhead2 != -1) {
            config += `womanhead2=model_${this.womanhead2}\n`;
		}

		if (this.cost != 1) {
            config += `cost=${this.cost}\n`;
		}

		if (this.zoom2d != 2000) {
            config += `2dzoom=${this.zoom2d}\n`;
		}

		if (this.xof2d != 0) {
            config += `2dxof=${this.xof2d}\n`;
		}

		if (this.yof2d != 0) {
            config += `2dyof=${this.yof2d}\n`;
		}

		if (this.xan2d != 0) {
            config += `2dxan=${this.xan2d}\n`;
		}

		if (this.yan2d != 0) {
            config += `2dyan=${this.yan2d}\n`;
		}

		if (this.zan2d != 0) {
            config += `2dzan=${this.zan2d}\n`;
		}

		if (this.stackable) {
            config += `stackable=yes\n`;
		}

		if (this.members) {
            config += `members=yes\n`;
		}

        for (let i = 0; i < this.countobj.length; ++i) {
            if (this.countobj[i] == 0) {
                continue;
            }

            config += `count${i + 1}=obj_${this.countobj[i]},${this.countco[i]}\n`;
        }

        for (let i = 0; i < this.ops.length; ++i) {
            if (this.ops[i] == null) {
                continue;
            }

            config += `op${i + 1}=${this.ops[i]}\n`;
        }

        for (let i = 0; i < this.iops.length; ++i) {
            if (this.iops[i] == null) {
                continue;
            }

            config += `iop${i + 1}=${this.iops[i]}\n`;
        }

        for (let i = 0; i < this.recol_s.length; ++i) {
            config += `recol${i + 1}s=${this.recol_s[i]}\n`;
            config += `recol${i + 1}d=${this.recol_d[i]}\n`;
        }

        return config;
    }
}
