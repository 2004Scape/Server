import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

// partial frame class - only delays, not loading transforms
export default class SeqFrame {
    static instances: SeqFrame[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/frame_del.dat`)) {
            console.log('Warning: No frame_del.dat found.');
            return;
        }

        const dat = Packet.load(`${dir}/server/frame_del.dat`);
        this.parse(dat);
    }

    static async loadAsync(dir: string) {
        if (!(await fetch(`${dir}/server/frame_del.dat`)).ok) {
            console.log('Warning: No frame_del.dat found.');
            return;
        }

        const dat = await Packet.loadAsync(`${dir}/server/frame_del.dat`);
        this.parse(dat);
    }

    static parse(dat: Packet) {
        SeqFrame.instances = [];

        for (let i = 0; i < dat.data.length; i++) {
            const frame = new SeqFrame();

            frame.delay = dat.g1();

            SeqFrame.instances[i] = frame;
        }
    }

    // ----

    delay = 0;
}
