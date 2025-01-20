import fs from 'fs';

import Packet from '#/io/Packet.js';

// partial frame class - only delays, not loading transforms
export default class SeqFrame {
    static instances: SeqFrame[] = [];

    static load(dir: string) {
        if (!fs.existsSync(`${dir}/server/frame_del.dat`)) {
            return;
        }

        const dat = Packet.load(`${dir}/server/frame_del.dat`);
        this.parse(dat);
    }

    static async loadAsync(dir: string) {
        const file = await fetch(`${dir}/server/frame_del.dat`);
        if (!file.ok) {
            return;
        }

        const dat = new Packet(new Uint8Array(await file.arrayBuffer()));
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
