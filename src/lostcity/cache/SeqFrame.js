import Packet from '#jagex2/io/Packet.js';

// partial frame class - only delays, not loading transforms
export default class SeqFrame {
    static instances = [];

    static load(dir) {
        SeqFrame.instances = [];

        let frame_del = Packet.load(`${dir}/frame_del.dat`);
        for (let i = 0; i < frame_del.length; i++) {
            let frame = new SeqFrame();

            frame.delay = frame_del.g1();

            SeqFrame.instances[i] = frame;
        }
    }

    delay = 0;
}
