import fs from 'fs';

import FileStream from '#jagex2/io/FileStream.js';
import Jagfile from '#jagex2/io/Jagfile.js';

import {
    decodeFlo, decodeIdk, decodeLoc, decodeNoOp, decodeNpc,
    decodeObj, decodeSeq, decodeSpotAnim, decodeVarbit, decodeVarp,
    readJag, unpackConfig, unpackMedia, unpackTextures, unpackTitle,
    unpackWordenc
} from '#lostcity/util/CacheUnpack.js';

let title: Jagfile | null = null;
let config: Jagfile | null = null;
let interfaces: Jagfile | null = null;
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
} else {
    title = Jagfile.load('dump/title');
    config = Jagfile.load('dump/config');
    interfaces = Jagfile.load('dump/interface');
    media = Jagfile.load('dump/media');
    textures = Jagfile.load('dump/textures');
    wordenc = Jagfile.load('dump/wordenc');
    sounds = Jagfile.load('dump/sounds');

    const models = Jagfile.load('dump/models');
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
unpackConfig(config, 'mesanim', decodeNoOp);
unpackConfig(config, 'mes', decodeNoOp);
