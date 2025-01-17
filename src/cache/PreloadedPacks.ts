import fs from 'fs';

import Packet from '#/io/Packet.js';

export const PRELOADED = new Map<string, Uint8Array>();
export const PRELOADED_CRC = new Map<string, number>();

export function preloadClient() {
    const allMaps = fs.readdirSync('data/pack/client/maps');
    for (let i = 0; i < allMaps.length; i++) {
        const name = allMaps[i];

        const map = new Uint8Array(fs.readFileSync(`data/pack/client/maps/${name}`));
        const crc = Packet.getcrc(map, 0, map.length);

        PRELOADED.set(name, map);
        PRELOADED_CRC.set(name, crc);
    }

    const allSongs = fs.readdirSync('data/pack/client/songs');
    for (let i = 0; i < allSongs.length; i++) {
        const name = allSongs[i];

        const song = new Uint8Array(fs.readFileSync(`data/pack/client/songs/${name}`));
        const crc = Packet.getcrc(song, 0, song.length);

        PRELOADED.set(name, song);
        PRELOADED_CRC.set(name, crc);
    }

    const allJingles = fs.readdirSync('data/pack/client/jingles');
    for (let i = 0; i < allJingles.length; i++) {
        const name = allJingles[i];

        const jingle = new Uint8Array(fs.readFileSync(`data/pack/client/jingles/${name}`));
        const crc = Packet.getcrc(jingle, 0, jingle.length);

        PRELOADED.set(name, jingle);
        PRELOADED_CRC.set(name, crc);
    }
}

export async function preloadClientAsync() {
    const fetchAll = async (type: string, name: string) => {
        let data = new Uint8Array(await (await fetch(`data/pack/client/${type}/${name}`)).arrayBuffer());
        if (type === 'jingles') {
            // Strip off bzip header.
            data = data.subarray(4);
        }
        const crc = Packet.getcrc(data, 0, data.length);

        PRELOADED.set(name, data);
        PRELOADED_CRC.set(name, crc);
    };

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const { jingles, maps, songs } = await import('./PreloadedDirs.js');
    const allPacks = [
        ...maps.map((name: string) => fetchAll('maps', name)),
        ...songs.map((name: string) => fetchAll('songs', name)),
        ...jingles.map((name: string) => fetchAll('jingles', name))
    ];
    await Promise.all(allPacks);
}
