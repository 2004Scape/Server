import Jagfile from '#/io/Jagfile.js';
import Packet from '#/io/Packet.js';

export default class AnimBase {
    static instances: AnimBase[] = [];
    static order: string[] = [];

    static OP_BASE = 0;
    static OP_TRANSLATE = 1;
    static OP_ROTATE = 2;
    static OP_SCALE = 3;
    static OP_ALPHA = 5;

    length: number = 0;
    types: Int32Array = new Int32Array();
    labels: Int32Array[] = [];

    static unpack225(models: Jagfile) {
        const head = models.read('base_head.dat');
        const type = models.read('base_type.dat');
        const label = models.read('base_label.dat');

        if (!head || !type || !label) {
            return;
        }

        const count = head.g2();
        const maxId = head.g2();
        AnimBase.instances = new Array(maxId + 1);

        for (let i = 0; i < count; i++) {
            const id = head.g2();

            const length = head.g1();

            const types = new Int32Array(length);
            const labels = new Array(length);
    
            for (let j = 0; j < length; j++) {
                types[j] = type.g1();
            }
    
            for (let j = 0; j < length; j++) {
                const labelCount = label.g1();
                labels[j] = new Int32Array(labelCount);
    
                for (let k = 0; k < labelCount; k++) {
                    labels[j][k] = label.g1();
                }
            }
    
            const base = new AnimBase();
            base.length = length;
            base.types = types;
            base.labels = labels;
            AnimBase.instances[id] = base;
        }
    }

    static unpack377(dat: Packet): number {
        const length = dat.g1();

        const types = new Int32Array(length);
        const labels = new Array(length);

        for (let i = 0; i < length; i++) {
            types[i] = dat.g1();
        }

        for (let i = 0; i < length; i++) {
            const labelCount = dat.g1();
            labels[i] = new Int32Array(labelCount);

            for (let j = 0; j < labelCount; j++) {
                labels[i][j] = dat.g1();
            }
        }

        const base = new AnimBase();
        base.length = length;
        base.types = types;
        base.labels = labels;
        return AnimBase.instances.push(base) - 1;
    }

    static pack225() {
        const head = Packet.alloc(5);
        const type = Packet.alloc(5);
        const label = Packet.alloc(10_000_000);

        let maxId = -1;
        for (let i = 0; i < AnimBase.instances.length; i++) {
            if (!AnimBase.instances[i]) {
                continue;
            }

            maxId = Math.max(maxId, i);
        }

        head.p2(AnimBase.instances.length);
        head.p2(maxId);

        for (let i = 0; i < AnimBase.instances.length; i++) {
            const base = AnimBase.instances[i];
            if (!base) {
                continue;
            }

            head.p2(i);

            head.p1(base.length);
            for (let j = 0; j < base.length; j++) {
                type.p1(base.types[j]);

                label.p1(base.labels.length);
                for (let k = 0; k < base.labels.length; k++) {
                    label.p1(base.labels[j][k]);
                }
            }
        }

        return { head, type, label };
    }
}
