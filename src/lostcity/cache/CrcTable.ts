import fs from 'fs';

import Packet2 from '#jagex2/io/Packet2.js';

export const CrcBuffer = new Packet2(new Uint8Array(4 * 9));
export const CrcTable: number[] = [];

function makeCrc(path: string) {
    const packet = Packet2.load(path);
    const crc = Packet2.getcrc(packet.data, 0, packet.data.length);
    CrcTable.push(crc);
    CrcBuffer.p4(crc);
}

if (fs.existsSync('data/pack/client/')) {
    CrcBuffer.p4(0);
    makeCrc('data/pack/client/title');
    makeCrc('data/pack/client/config');
    makeCrc('data/pack/client/interface');
    makeCrc('data/pack/client/media');
    makeCrc('data/pack/client/models');
    makeCrc('data/pack/client/textures');
    makeCrc('data/pack/client/wordenc');
    makeCrc('data/pack/client/sounds');
}

export const CrcBuffer32 = Packet2.getcrc(CrcBuffer.data, 0, CrcBuffer.data.length);
