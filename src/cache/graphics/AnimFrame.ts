import Jagfile from '#/io/Jagfile.js';
import Packet from '#/io/Packet.js';

import AnimBase from '#/cache/graphics/AnimBase.js';
import { printError } from '#/util/Logger.js';

export default class AnimFrame {
    static instances: AnimFrame[] = [];
    static order: number[] = [];

    delay: number = 0;
    base: number = 0;
    length: number = 0;
    groups: Int32Array = new Int32Array();
    x: Int32Array = new Int32Array();
    y: Int32Array = new Int32Array();
    z: Int32Array = new Int32Array();
    debug: Packet | null = null;

    static unpack225(models: Jagfile) {
        const head = models.read('frame_head.dat');
        const tran1 = models.read('frame_tran1.dat');
        const tran2 = models.read('frame_tran2.dat');
        const del = models.read('frame_del.dat');

        if (!head || !tran1 || !tran2 || !del) {
            return;
        }

        if (!AnimBase.instances.length) {
            printError('Animation bases must be loaded first');
            return;
        }

        const count = head.g2();
        const maxId = head.g2();
        AnimFrame.instances = new Array(maxId + 1);

        const groups = new Int32Array(500);
        const x = new Int32Array(500);
        const y = new Int32Array(500);
        const z = new Int32Array(500);

        for (let i = 0; i < count; i++) {
            const debug = Packet.alloc(1);
            const id = head.g2();
            debug.p2(id);
            AnimFrame.order.push(id);

            const frame = new AnimFrame();
            frame.delay = del.g1();
            debug.p1(frame.delay);
            frame.base = head.g2();
            debug.p2(frame.base);

            const groupCount = head.g1();
            debug.p1(groupCount);
            let lastGroup = -1;
            let length = 0;

            for (let group = 0; group < groupCount; group++) {
                const flags = tran1.g1();
                debug.p1(flags);
                if (flags === 0) {
                    continue;
                }

                if (AnimBase.instances[frame.base].types[group] !== AnimBase.OP_BASE) {
                    for (let cur = group - 1; cur > lastGroup; cur--) {
                        if (AnimBase.instances[frame.base].types[cur] === AnimBase.OP_BASE) {
                            groups[length] = cur;
                            x[length] = 0;
                            y[length] = 0;
                            z[length] = 0;
                            length++;
                            break;
                        }
                    }
                }

                groups[length] = group;

                let defaultValue = 0;
                if (AnimBase.instances[frame.base].types[group] === AnimBase.OP_SCALE) {
                    defaultValue = 128;
                }

                if ((flags & 0x1) != 0) {
                    x[length] = tran2.gsmarts();
                    debug.psmarts(x[length]);
                } else {
                    x[length] = defaultValue;
                }

                if ((flags & 0x2) != 0) {
                    y[length] = tran2.gsmarts();
                    debug.psmarts(y[length]);
                } else {
                    y[length] = defaultValue;
                }

                if ((flags & 0x4) != 0) {
                    z[length] = tran2.gsmarts();
                    debug.psmarts(z[length]);
                } else {
                    z[length] = defaultValue;
                }

                lastGroup = group;
                length++;
            }

            frame.length = length;
            frame.groups = new Int32Array(length);
            frame.x = new Int32Array(length);
            frame.y = new Int32Array(length);
            frame.z = new Int32Array(length);
            frame.debug = debug;

            for (let j = 0; j < length; j++) {
                frame.groups[j] = groups[j];
                frame.x[j] = x[j];
                frame.y[j] = y[j];
                frame.z[j] = z[j];
            }

            AnimFrame.instances[id] = frame;
        }
    }

    static unpack377(src: Uint8Array) {
        const meta = new Packet(src);
        meta.pos = src.length - 8;

        let offset = 0;
        const head = new Packet(src);
        head.pos = offset;
        offset += meta.g2() + 2;

        const tran1 = new Packet(src);
        tran1.pos = offset;
        offset += meta.g2();

        const tran2 = new Packet(src);
        tran2.pos = offset;
        offset += meta.g2();

        const del = new Packet(src);
        del.pos = offset;
        offset += meta.g2();

        const baseData = new Packet(src);
        baseData.pos = offset;
        const baseId = AnimBase.unpack377(baseData);

        const total = head.g2();
        const bases = new Int32Array(500);
        const x = new Int32Array(500);
        const y = new Int32Array(500);
        const z = new Int32Array(500);

        for (let i = 0; i < total; i++) {
            const id = head.g2();
            AnimFrame.order.push(id);

            const frame = new AnimFrame();
            frame.delay = del.g1();
            frame.base = baseId;

            const groupCount = head.g1();
            let lastGroup = -1;
            let length = 0;

            for (let group = 0; group < groupCount; group++) {
                const flags = tran1.g1();
                if (flags === 0) {
                    continue;
                }

                if (AnimBase.instances[baseId].types[group] !== AnimBase.OP_BASE) {
                    for (let cur = group - 1; cur > lastGroup; cur--) {
                        if (AnimBase.instances[baseId].types[cur] === AnimBase.OP_BASE) {
                            bases[length] = cur;
                            x[length] = 0;
                            y[length] = 0;
                            z[length] = 0;
                            length++;
                            break;
                        }
                    }
                }

                bases[length] = group;

                let defaultValue = 0;
                if (AnimBase.instances[baseId].types[group] === AnimBase.OP_SCALE) {
                    defaultValue = 128;
                }

                if ((flags & 0x1) != 0) {
                    x[length] = tran2.gsmarts();
                } else {
                    x[length] = defaultValue;
                }

                if ((flags & 0x2) != 0) {
                    y[length] = tran2.gsmarts();
                } else {
                    y[length] = defaultValue;
                }

                if ((flags & 0x4) != 0) {
                    z[length] = tran2.gsmarts();
                } else {
                    z[length] = defaultValue;
                }

                lastGroup = group;
                length++;
            }

            frame.length = length;
            frame.groups = new Int32Array(length);
            frame.x = new Int32Array(length);
            frame.y = new Int32Array(length);
            frame.z = new Int32Array(length);

            for (let j = 0; j < length; j++) {
                frame.groups[j] = bases[j];
                frame.x[j] = x[j];
                frame.y[j] = y[j];
                frame.z[j] = z[j];
            }

            AnimFrame.instances[id] = frame;
        }
    }

    static pack225() {
        const head = Packet.alloc(5);
        const tran1 = Packet.alloc(5);
        const tran2 = Packet.alloc(5);
        const del = Packet.alloc(5);

        let exists = 0;
        let maxId = -1;
        for (let i = 0; i < AnimFrame.instances.length; i++) {
            if (!AnimFrame.instances[i]) {
                continue;
            }

            exists++;
            maxId = Math.max(maxId, i);
        }

        head.p2(exists);
        head.p2(maxId);

        for (let frameIndex = 0; frameIndex < AnimFrame.order.length; frameIndex++) {
            const id = AnimFrame.order[frameIndex];
            const frame = AnimFrame.instances[id];
            if (!frame) {
                continue;
            }

            if (!frame.debug) {
                frame.debug = Packet.alloc(1);
            } else {
                frame.debug.pos = 0;
            }

            head.p2(id);
            frame.debug.p2(id);
            del.p1(frame.delay);
            frame.debug.p1(frame.delay);
            head.p2(frame.base);
            frame.debug.p2(frame.base);

            const base = AnimBase.instances[frame.base];

            const max = base.length;
            // todo: max here writes extra 0s when it shouldn't, so CRC fails

            head.p1(max);
            frame.debug.p1(max);

            let length = 0;
            for (let i = 0; i < max; i++) {
                const type = base.types[i];

                if (length >= frame.length || frame.groups[length] != i) {
                    tran1.p1(0);
                    frame.debug.p1(0);
                    continue;
                }

                let flags = 0;
                let defaultValue = 0;
                if (type === AnimBase.OP_SCALE) {
                    defaultValue = 128;
                }

                if (frame.x[length] != defaultValue) {
                    flags |= 0x1;
                }

                if (frame.y[length] != defaultValue) {
                    flags |= 0x2;
                }

                if (frame.z[length] != defaultValue) {
                    flags |= 0x4;
                }

                tran1.p1(flags);
                frame.debug.p1(flags);

                if ((flags & 0x1) != 0) {
                    tran2.psmarts(frame.x[length]);
                    frame.debug.psmarts(frame.x[length]);
                }

                if ((flags & 0x2) != 0) {
                    tran2.psmarts(frame.y[length]);
                    frame.debug.psmarts(frame.y[length]);
                }

                if ((flags & 0x4) != 0) {
                    tran2.psmarts(frame.z[length]);
                    frame.debug.psmarts(frame.z[length]);
                }

                length++;
            }
        }

        return { head, tran1, tran2, del };
    }
}
