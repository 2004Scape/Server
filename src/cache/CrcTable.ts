import fs from 'fs';

import Packet from '#/io/Packet.js';
import Environment from '#/util/Environment.js';

export const CrcBuffer: Packet = new Packet(new Uint8Array(4 * 9));
export let CrcTable: number[] = [];
export let CrcBuffer32: number = 0;

function makeCrc(path: string) {
    if (!fs.existsSync(path)) {
        return;
    }

    const packet = Packet.load(path);
    const crc = Packet.getcrc(packet.data, 0, packet.data.length);
    CrcTable.push(crc);
    CrcBuffer.p4(crc);
}

export function makeCrcs() {
    CrcTable = [];

    CrcBuffer.pos = 0;
    CrcBuffer.p4(0);
    makeCrc('data/pack/client/title');
    makeCrc('data/pack/client/config');
    makeCrc('data/pack/client/interface');
    makeCrc('data/pack/client/media');
    makeCrc('data/pack/client/models');
    makeCrc('data/pack/client/textures');
    makeCrc('data/pack/client/wordenc');
    makeCrc('data/pack/client/sounds');

    CrcBuffer32 = Packet.getcrc(CrcBuffer.data, 0, CrcBuffer.data.length);
}

async function makeCrcAsync(path: string) {
    const file = await fetch(path);
    if (!file.ok) {
        return;
    }

    const packet = new Packet(new Uint8Array(await file.arrayBuffer()));
    const crc = Packet.getcrc(packet.data, 0, packet.data.length);
    return crc;
}

export async function makeCrcsAsync() {
    CrcTable = [];

    CrcBuffer.pos = 0;
    CrcBuffer.p4(0);

    const [title, config, iface, media, models, textures, wordenc, sounds] = await Promise.all([
        makeCrcAsync('data/pack/client/title'),
        makeCrcAsync('data/pack/client/config'),
        makeCrcAsync('data/pack/client/interface'),
        makeCrcAsync('data/pack/client/media'),
        makeCrcAsync('data/pack/client/models'),
        makeCrcAsync('data/pack/client/textures'),
        makeCrcAsync('data/pack/client/wordenc'),
        makeCrcAsync('data/pack/client/sounds')
    ]);

    for (const crc of [title, config, iface, media, models, textures, wordenc, sounds]) {
        if (crc) {
            CrcTable.push(crc);
            CrcBuffer.p4(crc);
        }
    }

    CrcBuffer32 = Packet.getcrc(CrcBuffer.data, 0, CrcBuffer.data.length);
}

if (!Environment.STANDALONE_BUNDLE) {
    if (fs.existsSync('data/pack/client/')) {
        makeCrcs();
    }
}
