import Packet from '#util/Packet.js';

export default class SpotAnimationType {
    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

    id = -1;
    model = 0;
    anim = -1;
    disposeAlpha = false;
    resizeh = 128;
    resizev = 128;
    rotation = 0;
    ambient = 0;
    contrast = 0;
    recol_s = [];
    recol_d = [];

    static unpack(dat, idx, preload = false) {
        SpotAnimationType.dat = dat;
        SpotAnimationType.count = idx.g2();
        SpotAnimationType.offsets = [];
        SpotAnimationType.cache = [];

        let offset = 2;
        for (let i = 0; i < SpotAnimationType.count; i++) {
            SpotAnimationType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < SpotAnimationType.count; i++) {
                SpotAnimationType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('spotanim.dat');
        const idx = config.read('spotanim.idx');

        SpotAnimationType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(SpotAnimationType.count);
        dat.p2(SpotAnimationType.count);

        for (let i = 0; i < SpotAnimationType.count; i++) {
            let spotAnimation;
            if (SpotAnimationType.cache[i]) {
                spotAnimation = SpotAnimationType.cache[i];
            } else {
                spotAnimation = new SpotAnimationType(i);
            }

            const spotAnimationDat = spotAnimation.encode();
            idx.p2(spotAnimationDat.length);
            dat.pdata(spotAnimationDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (SpotAnimationType.cache[id]) {
            return SpotAnimationType.cache[id];
        } else {
            return new SpotAnimationType(id);
        }
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < SpotAnimationType.count; i++) {
            config += SpotAnimationType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    static fromJagConfig(src) {
        const lines = src.replaceAll('\r\n', '\n').split('\n');
        let offset = 0;

        let spotanim;
        let id = 0;
        while (offset < lines.length) {
            if (!lines[offset]) {
                offset++;
                continue;
            }

            if (lines[offset].startsWith('[')) {
                spotanim = new SpotAnimationType(id, false);
                offset++;
                id++;
                continue;
            }

            while (lines[offset] && !lines[offset].startsWith('[')) {
                const key = lines[offset].slice(0, lines[offset].indexOf('='));
                const value = lines[offset].slice(lines[offset].indexOf('=') + 1).replaceAll('model_', '').replaceAll('seq_', '');

                if (key == 'model') {
                    spotanim.model = parseInt(value);
                } else if (key == 'anim') {
                    spotanim.anim = parseInt(value);
                } else if (key == 'disposealpha') {
                    spotanim.disposeAlpha = value == 'yes';
                } else if (key == 'resizeh') {
                    spotanim.resizeh = parseInt(value);
                } else if (key == 'resizev') {
                    spotanim.resizev = parseInt(value);
                } else if (key == 'rotation') {
                    spotanim.rotation = parseInt(value);
                } else if (key == 'ambient') {
                    spotanim.ambient = parseInt(value);
                } else if (key == 'contrast') {
                    spotanim.contrast = parseInt(value);
                } else if (key.startsWith('recol')) {
                    let index = parseInt(key.charAt(5)) - 1;
                    let type = key.charAt(6);

                    if (type == 's') {
                        spotanim.recol_s[index] = parseInt(value);
                    } else if (type == 'd') {
                        spotanim.recol_d[index] = parseInt(value);
                    }
                } else {
                    console.log(`Unknown spotanim key: ${key}`);
                }

                offset++;
            }

            SpotAnimationType.cache[spotanim.id] = spotanim;
        }

        SpotAnimationType.count = SpotAnimationType.cache.length;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        SpotAnimationType.cache[id] = this;

        if (decode) {
            const offset = SpotAnimationType.offsets[id];
            if (!offset) {
                return;
            }

            SpotAnimationType.dat.pos = offset;
            this.#decode();
        }
    }

    #decode() {
        const dat = SpotAnimationType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                this.model = dat.g2();
            } else if (opcode == 2) {
                this.anim = dat.g2();
            } else if (opcode == 3) {
                this.disposeAlpha = true;
            } else if (opcode == 4) {
                this.resizeh = dat.g2();
            } else if (opcode == 5) {
                this.resizev = dat.g2();
            } else if (opcode == 6) {
                this.rotation = dat.g2();
            } else if (opcode == 7) {
                this.ambient = dat.g1();
            } else if (opcode == 8) {
                this.contrast = dat.g1();
            } else if (opcode >= 40 && opcode < 50) {
                this.recol_s[opcode - 40] = dat.g2();
            } else if (opcode >= 50 && opcode < 60) {
                this.recol_d[opcode - 50] = dat.g2();
            } else {
                console.error('Unknown SpotAnimationType opcode:', opcode);
            }
        }
    }

    encode() {
        const dat = new Packet();

        if (this.model != -1) {
            dat.p1(1);
            dat.p2(this.model);
        }

        if (this.anim != -1) {
            dat.p1(2);
            dat.p2(this.anim);
        }

        if (this.disposeAlpha) {
            dat.p1(3);
        }

        if (this.resizeh != 128) {
            dat.p1(4);
            dat.p2(this.resizeh);
        }

        if (this.resizev != 128) {
            dat.p1(5);
            dat.p2(this.resizev);
        }

        if (this.rotation != 0) {
            dat.p1(6);
            dat.p2(this.rotation);
        }

        if (this.ambient != 0) {
            dat.p1(7);
            dat.p1(this.ambient);
        }

        if (this.contrast != 0) {
            dat.p1(8);
            dat.p1(this.contrast);
        }

        for (let i = 0; i < this.recol_s.length; i++) {
            dat.p1(40 + i);
            dat.p2(this.recol_s[i]);
        }

        for (let i = 0; i < this.recol_d.length; i++) {
            dat.p1(50 + i);
            dat.p2(this.recol_d[i]);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[spotanim_${this.id}]\n`;

		if (this.model != 0) {
            config += `model=model_${this.model}\n`;
		}

		if (this.anim != -1) {
            config += `anim=seq_${this.anim}\n`;
		}

        if (this.disposeAlpha) {
            config += `disposealpha=yes\n`;
        }

        if (this.resizeh != 128) {
            config += `resizeh=${this.resizeh}\n`;
		}

		if (this.resizev != 128) {
            config += `resizev=${this.resizev}\n`;
		}

		if (this.rotation != 0) {
            config += `rotation=${this.rotation}\n`;
		}

		if (this.ambient != 0) {
            config += `ambient=${this.ambient}\n`;
		}

		if (this.contrast != 0) {
            config += `contrast=${this.contrast}\n`;
		}

        for (let i = 0; i < this.recol_s.length; ++i) {
            config += `recol${i + 1}s=${this.recol_s[i]}\n`;
            config += `recol${i + 1}d=${this.recol_d[i]}\n`;
		}

        return config;
    }
}
