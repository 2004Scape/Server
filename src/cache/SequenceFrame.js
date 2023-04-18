import SequenceBase from '#cache/SequenceBase.js';
import Packet from '#util/Packet.js';

export default class SequenceFrame {
    static instances = [];

    delay = 0;
    transform = 0;
    groupCount = 0;
    groups = [];
    x = [];
    y = [];
    z = [];

    static unpack(head, tran1, tran2, del) {
        let labels = [];
        let x = [];
        let y = [];
        let z = [];

        const total = head.g2();
        const count = head.g2();

        for (let i = 0; i < total; i++) {
            let id = head.g2();

            let frame = new SequenceFrame();
            frame.delay = del.g1();

            let baseId = head.g2();
            frame.transform = SequenceBase.instances[baseId];

            let groupCount = head.g1();
            let lastGroup = -1;
            let count = 0;
            let flags;
            for (let j = 0; j < groupCount; j++) {
                flags = tran1.g1();

                if (flags > 0) {
                    if (frame.transform.transformTypes[j] != 0) {
                        for (let group = j - 1; group > lastGroup; group--) {
                            if (frame.transform.transformTypes[group] == 0) {
                                labels[count] = group;
                                x[count] = 0;
                                y[count] = 0;
                                z[count] = 0;
                                count++;
                                break;
                            }
                        }
                    }

                    labels[count] = j;

                    let defaultValue = 0;
                    if (frame.transform.transformTypes[labels[count]] == 3) {
                        defaultValue = 128;
                    }

                    if ((flags & 0x1) != 0) {
                        x[count] = tran2.gsmart();
                    } else {
                        x[count] = defaultValue;
                    }

                    if ((flags & 0x2) != 0) {
                        y[count] = tran2.gsmart();
                    } else {
                        y[count] = defaultValue;
                    }

                    if ((flags & 0x4) != 0) {
                        z[count] = tran2.gsmart();
                    } else {
                        z[count] = defaultValue;
                    }

                    lastGroup = j;
                    count++;
                }
            }

            frame.groupCount = count;
            for (let j = 0; j < count; j++) {
                frame.groups[j] = labels[j];
                frame.x[j] = x[j];
                frame.y[j] = y[j];
                frame.z[j] = z[j];
            }

            SequenceFrame.instances[id] = frame;
        }
    }

    static load(config) {
        const head = config.read('frame_head.dat');
        const tran1 = config.read('frame_tran1.dat');
        const tran2 = config.read('frame_tran2.dat');
        const del = config.read('frame_del.dat');

        SequenceFrame.unpack(head, tran1, tran2, del);
    }

    static get(id) {
        return this.instances[id];
    }
}
