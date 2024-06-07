import fs from 'fs';
import zlib from 'zlib';

import FileStream from '#jagex2/io/FileStream.js';
import Jagfile from '#jagex2/io/Jagfile.js';

import {
    decodeFlo, decodeIdk, decodeLoc, decodeNpc,
    decodeObj, decodeSeq, decodeSpotAnim, decodeVarbit, decodeVarp,
    readJag, unpackConfig, unpackMedia, unpackTextures, unpackTitle,
    unpackWordenc
} from '#lostcity/util/CacheUnpack.js';
// import Packet from '#jagex2/io/Packet.js';
import AnimFrame from '#lostcity/cache/AnimFrame.js';
// import AnimBase from '#lostcity/cache/AnimBase.js';

let title: Jagfile | null = null;
let config: Jagfile | null = null;
// let interfaces: Jagfile | null = null;
let media: Jagfile | null = null;
let textures: Jagfile | null = null;
let wordenc: Jagfile | null = null;
let sounds: Jagfile | null = null;

if (fs.existsSync('dump/main_file_cache.dat')) {
    const cache = new FileStream('dump');

    title = readJag(cache, 1);
    config = readJag(cache, 2);
    // interfaces = readJag(cache, 3); // todo
    media = readJag(cache, 4);
    textures = readJag(cache, 6);
    wordenc = readJag(cache, 7);
    sounds = readJag(cache, 8); // todo

    // const versionlist = readJag(cache, 5); // todo

    if (!fs.existsSync('data/src/pack')) {
        fs.mkdirSync('data/src/pack', { recursive: true });
    }

    if (!fs.existsSync('data/src/models/_unpack')) {
        fs.mkdirSync('data/src/models/_unpack', { recursive: true });
    }

    fs.writeFileSync('data/src/pack/model.pack', '');
    const modelCount = 0; // cache.count(1);
    for (let i = 0; i < modelCount; i++) {
        fs.appendFileSync('data/src/pack/model.pack', `${i}=model_${i}\n`);

        if (fs.existsSync('data/src/models/_unpack/model_' + i + '.ob2')) {
            continue;
        }

        const data = cache.read(1, i);
        if (!data) {
            continue;
        }

        const decompressed = zlib.gunzipSync(data);
        fs.writeFileSync('data/src/models/_unpack/model_' + i + '.ob2', decompressed);
    }

    if (!fs.existsSync('data/src/models/_unpack/base')) {
        fs.mkdirSync('data/src/models/_unpack/base', { recursive: true });
    }

    if (!fs.existsSync('data/src/models/_unpack/frame')) {
        fs.mkdirSync('data/src/models/_unpack/frame', { recursive: true });
    }

    const animCount = cache.count(2);
    for (let i = 0; i < animCount; i++) {
        const compressed = cache.read(2, i);
        if (!compressed) {
            continue;
        }

        const src = new Uint8Array(zlib.gunzipSync(compressed));
        AnimFrame.unpack377(src);
    }

    // todo: save frames/bases to files

    if (!fs.existsSync('data/src/songs')) {
        fs.mkdirSync('data/src/songs', { recursive: true });
    }

    const midiCount = 0; // cache.count(3);
    for (let i = 0; i < midiCount; i++) {
        const data = cache.read(3, i);
        if (!data) {
            continue;
        }

        const decompressed = zlib.gunzipSync(data);
        fs.writeFileSync('data/src/songs/' + i + '.mid', decompressed);
    }

    // we need versionlist working to be able to dump maps
    const mapCount = cache.count(4);
    for (let i = 0; i < mapCount; i++) {
        // todo
    }
} else {
    title = Jagfile.load('dump/title');
    config = Jagfile.load('dump/config');
    // interfaces = Jagfile.load('dump/interface');
    media = Jagfile.load('dump/media');
    textures = Jagfile.load('dump/textures');
    wordenc = Jagfile.load('dump/wordenc');
    sounds = Jagfile.load('dump/sounds'); // not in 194

    const models = Jagfile.load('dump/models');
    // todo: save to files
}

unpackTitle(title);
unpackMedia(media);
unpackTextures(textures);
unpackWordenc(wordenc);

unpackConfig(config, 'loc', decodeLoc);
unpackConfig(config, 'npc', decodeNpc);
unpackConfig(config, 'obj', decodeObj);
unpackConfig(config, 'seq', decodeSeq);
unpackConfig(config, 'varp', decodeVarp);
unpackConfig(config, 'spotanim', decodeSpotAnim);
unpackConfig(config, 'idk', decodeIdk);
unpackConfig(config, 'flo', decodeFlo);
unpackConfig(config, 'varbit', decodeVarbit);

// server-side:
// unpackConfig(config, 'mesanim', decodeNoOp);
// unpackConfig(config, 'mes', decodeNoOp);
// unpackConfig(config, 'param', decodeNoOp);
// unpackConfig(config, 'hunt', decodeNoOp);
