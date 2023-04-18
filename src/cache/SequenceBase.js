import Packet from '#util/Packet.js';

export default class SequenceBase {
    static instances = [];

    length = 0;
    transformTypes = [];
    groupLabels = [];

    static unpack(head, type, label) {
        const total = head.g2();
        const count = head.g2();

        for (let i = 0; i < total; i++) {
            let id = head.g2();
            let length = head.g1();

            let transformTypes = [];
            let groupLabels = [];
            for (let j = 0; j < length; j++) {
                transformTypes[j] = type.g1();
                let groupCount = label.g1();

                groupLabels[j] = [];
                for (let k = 0; k < groupCount; k++) {
                    groupLabels[j][k] = label.g1();
                }
            }

            let base = new SequenceBase();
            base.length = length;
            base.transformTypes = transformTypes;
            base.groupLabels = groupLabels;
            SequenceBase.instances[id] = base;
        }
    }

    static load(config) {
        const head = config.read('base_head.dat');
        const type = config.read('base_type.dat');
        const label = config.read('base_label.dat');

        this.unpack(head, type, label);
    }

    static get(id) {
        return this.instances[id];
    }
}
