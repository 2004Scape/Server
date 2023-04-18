import Packet from '#util/Packet.js';
import SequenceFrame from '#cache/SequenceFrame.js';

export default class SequenceType {
    static dat = null;
    static count = 0;
    static offsets = [];
    static cache = [];

    id = -1;
    framecount = 0;
    primaryFrames = [];
    secondaryFrames = [];
    frameDelay = [];
    replayoff = -1;
    labelGroups = [];
    stretches = false;
    priority = 5;
    mainhand = -1;
    offhand = -1;
    replaycount = 99;

    static unpack(dat, idx, preload = false) {
        SequenceType.dat = dat;
        SequenceType.count = idx.g2();
        SequenceType.offsets = [];
        SequenceType.cache = [];

        let offset = 2;
        for (let i = 0; i < SequenceType.count; i++) {
            SequenceType.offsets[i] = offset;
            offset += idx.g2();
        }

        if (preload) {
            for (let i = 0; i < SequenceType.count; i++) {
                SequenceType.get(i);
            }
        }
    }

    static load(config) {
        const dat = config.read('seq.dat');
        const idx = config.read('seq.idx');

        SequenceType.unpack(dat, idx);
    }

    static pack() {
        const dat = new Packet();
        const idx = new Packet();

        idx.p2(SequenceType.count);
        dat.p2(SequenceType.count);

        for (let i = 0; i < SequenceType.count; i++) {
            let sequenceType;
            if (SequenceType.cache[i]) {
                sequenceType = SequenceType.cache[i];
            } else {
                sequenceType = new SequenceType(i);
            }

            const sequenceTypeDat = sequenceType.encode();
            idx.p2(sequenceTypeDat.length);
            dat.pdata(sequenceTypeDat);
        }

        return { dat, idx };
    }

    static get(id) {
        if (SequenceType.cache[id]) {
            return SequenceType.cache[id];
        } else {
            return new SequenceType(id);
        }
    }

    static toJagConfig() {
        let config = '';

        for (let i = 0; i < SequenceType.count; i++) {
            config += SequenceType.get(i).toJagConfig() + '\n';
        }

        return config;
    }

    constructor(id = 0, decode = true) {
        this.id = id;
        SequenceType.cache[id] = this;

        if (decode) {
            const offset = SequenceType.offsets[id];
            if (!offset) {
                return;
            }

            SequenceType.dat.pos = offset;
            this.#decode();
        }
    }

    #decode() {
        const dat = SequenceType.dat;

        while (true) {
            const opcode = dat.g1();
            if (opcode == 0) {
                break;
            }

            if (opcode == 1) {
                this.framecount = dat.g1();

                for (let i = 0; i < this.framecount; i++) {
                    this.primaryFrames[i] = dat.g2();
                    this.secondaryFrames[i] = dat.g2();

                    if (this.secondaryFrames[i] == 65535) {
                        this.secondaryFrames[i] = -1;
                    }

                    this.frameDelay[i] = dat.g2();

                    if (this.frameDelay[i] == 0) {
                        this.frameDelay[i] = SequenceFrame.instances[this.primaryFrames[i]].delay;
                    }

                    if (this.frameDelay[i] == 0) {
                        this.frameDelay[i] = 1;
                    }
                }
            } else if (opcode == 2) {
                this.replayoff = dat.g2();
            } else if (opcode == 3) {
                const count = dat.g1();

                for (let i = 0; i < count; i++) {
                    this.labelGroups[i] = dat.g1();
                }

                this.labelGroups[count] = 9999999;
            } else if (opcode == 4) {
                this.stretches = true;
            } else if (opcode == 5) {
                this.priority = dat.g1();
            } else if (opcode == 6) {
                this.mainhand = dat.g2();
            } else if (opcode == 7) {
                this.offhand = dat.g2();
            } else if (opcode == 8) {
                this.replaycount = dat.g1();
            } else {
                console.error('Unknown SequenceType opcode:', opcode);
            }
        }

        if (this.framecount == 0) {
            this.framecount = 1;
            this.primaryFrames[0] = -1;
            this.secondaryFrames[0] = -1;
            this.frameDelay[0] = -1;
        }
    }

    encode() {
        const dat = new Packet();

        if (this.primaryFrames[0] != -1 || this.secondaryFrames[0] != -1 || this.frameDelay[0] != -1) {
            dat.p1(1);
            dat.p1(this.framecount);

            for (let i = 0; i < this.framecount; i++) {
                dat.p2(this.primaryFrames[i]);
                dat.p2(this.secondaryFrames[i]);

                if (this.frameDelay[i] != SequenceFrame.instances[this.primaryFrames[i]].delay) {
                    dat.p2(this.frameDelay[i]);
                } else {
                    dat.p2(0);
                }
            }
        }

        if (this.replayoff != -1) {
            dat.p1(2);
            dat.p2(this.replayoff);
        }

        if (this.labelGroups.length) {
            dat.p1(3);
            dat.p1(this.labelGroups.length);

            for (let i = 0; i < this.labelGroups.length; i++) {
                dat.p1(this.labelGroups[i]);
            }
        }

        if (this.stretches) {
            dat.p1(4);
        }

        if (this.priority != 5) {
            dat.p1(5);
            dat.p1(this.priority);
        }

        if (this.mainhand != -1) {
            dat.p1(6);
            dat.p2(this.mainhand);
        }

        if (this.offhand != -1) {
            dat.p1(7);
            dat.p2(this.offhand);
        }

        if (this.replaycount != 99) {
            dat.p1(8);
            dat.p1(this.replaycount);
        }

        dat.p1(0);
        dat.pos = 0;
        return dat;
    }

    toJagConfig() {
        let config = `[seq_${this.id}]\n`;

        if (this.primaryFrames[0] != -1 || this.secondaryFrames[0] != -1 || this.frameDelay[0] != -1) {
            config += `framecount=${this.framecount}\n`;

            // not real names, these might be able to go into a "framegroup" definition elsewhere
            for (let i = 0; i < this.primaryFrames.length; ++i) {
                if (this.primaryFrames[i] == -1) {
                    continue;
                }

                config += `frame${i + 1}=${this.primaryFrames[i]}\n`;
            }

            for (let i = 0; i < this.secondaryFrames.length; ++i) {
                if (this.secondaryFrames[i] == -1) {
                    continue;
                }

                config += `frame_b${i + 1}=${this.secondaryFrames[i]}\n`;
            }

            for (let i = 0; i < this.frameDelay.length; ++i) {
                if (this.frameDelay[i] == -1) {
                    continue;
                }

                config += `framedel${i + 1}=${this.frameDelay[i]}\n`;
            }
        }

        if (this.priority != 5) {
            config += `priority=${this.priority}\n`;
        }

        if (this.replayoff != -1) {
            config += `replayoff=${this.replayoff}\n`;
        }

        if (this.stretches) {
            config += `stretches=yes\n`;
        }

        if (this.replaycount != 99) {
            config += `replaycount=${this.replaycount}\n`;
        }

        if (this.mainhand != -1) {
            config += `mainhand=${this.mainhand}\n`;
        }

        if (this.offhand != -1) {
            config += `offhand=${this.offhand}\n`;
        }

        if (this.labelGroups != null) {
            for (let i = 0; i < this.labelGroups.length; ++i) {
                if (this.labelGroups[i] == 9999999) {
                    continue;
                }

                config += `label${i + 1}=${this.labelGroups[i]}\n`;
            }
        }

        return config;
    }
}
