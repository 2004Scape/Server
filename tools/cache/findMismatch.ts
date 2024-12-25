import Packet from '#/io/Packet.js';
import { printFatalError } from '#/util/Logger.js';

const oldIdx = Packet.load('dump/unpack/config.raw/obj.idx');
const newIdx = Packet.load('dump/new.idx');

const oldCount = oldIdx.g2();
const newCount = newIdx.g2();

if (oldCount !== newCount) {
    printFatalError('configs are different sizes');
}

for (let i = 0; i < newCount; i++) {
    const oldLen = oldIdx.g2();
    const newLen = newIdx.g2();

    console.log(i, oldLen, newLen);

    if (oldLen !== newLen) {
        break;
    }
}
