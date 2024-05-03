import Packet2 from '#jagex2/io/Packet2.js';

// partial frame class - only delays, not loading transforms
export default class SeqFrame {
    static instances: SeqFrame[] = [];

    static load(dir: string) {
        SeqFrame.instances = [];

        const frame_del = Packet2.load(`${dir}/server/frame_del.dat`);
        for (let i = 0; i < frame_del.data.length; i++) {
            const frame = new SeqFrame();

            frame.delay = frame_del.g1();

            SeqFrame.instances[i] = frame;
        }
    }

    // ----

    delay = 0;
}
