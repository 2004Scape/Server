import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';
import { ConfigType } from '#lostcity/cache/ConfigType.js';
import SeqFrame from '#lostcity/cache/SeqFrame.js';

export default class SeqType extends ConfigType {
    private static configNames = new Map<string, number>();
    private static configs: SeqType[] = [];

    static load(dir: string) {
        SeqType.configNames = new Map();
        SeqType.configs = [];

        if (!fs.existsSync(`${dir}/seq.dat`)) {
            console.log('Warning: No seq.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/seq.dat`);
        const count = dat.g2();

        for (let id = 0; id < count; id++) {
            const config = new SeqType(id);
            config.decodeType(dat);

            SeqType.configs[id] = config;

            if (config.debugname) {
                SeqType.configNames.set(config.debugname, id);
            }
        }
    }

    static get(id: number) {
        return SeqType.configs[id];
    }

    static getId(name: string) {
        return SeqType.configNames.get(name) ?? -1;
    }

    static getByName(name: string) {
        const id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    static get count() {
        return SeqType.configs.length;
    }

    // ----

    frames: number[] = [];
    iframes: number[] = [];
    delay: number[] = [];
    replayoff: number = -1;
    walkmerge: number[] = [];
    stretches: boolean = false;
    priority: number = 5;
    mainhand: number = -1;
    offhand: number = -1;
    replaycount: number = 99;

    duration: number = 0;

    decode(opcode: number, packet: Packet) {
        if (opcode === 1) {
            const count = packet.g1();

            for (let i = 0; i < count; i++) {
                this.frames[i] = packet.g2();

                this.iframes[i] = packet.g2();
                if (this.iframes[i] === 65535) {
                    this.iframes[i] = -1;
                }

                this.delay[i] = packet.g2();
                if (this.delay[i] === 0) {
                    this.delay[i] = SeqFrame.instances[this.frames[i]].delay;
                }

                if (this.delay[i] === 0) {
                    this.delay[i] = 1;
                }

                this.duration += this.delay[i];
            }
        } else if (opcode === 2) {
            this.replayoff = packet.g2();
        } else if (opcode === 3) {
            const count = packet.g1();

            for (let i = 0; i < count; i++) {
                this.walkmerge[i] = packet.g1();
            }

            this.walkmerge[count] = 9999999;
        } else if (opcode === 4) {
            this.stretches = true;
        } else if (opcode === 5) {
            this.priority = packet.g1();
        } else if (opcode === 6) {
            this.mainhand = packet.g2();
        } else if (opcode === 7) {
            this.offhand = packet.g2();
        } else if (opcode === 8) {
            this.replaycount = packet.g1();
        } else if (opcode === 250) {
            this.debugname = packet.gjstr();
        } else {
            console.error(`Unrecognized seq config code: ${opcode}`);
        }
    }
}
