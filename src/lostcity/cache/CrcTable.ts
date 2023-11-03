import fs from 'fs';
import Packet from '#jagex2/io/Packet.js';

export const CrcBuffer = new Packet();
export const CrcTable: number[] = [];

function makeCrc(path: string) {
    const crc = Packet.crc32(Packet.load(path));
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

export const CrcBuffer32 = Packet.crc32(CrcBuffer.data);
