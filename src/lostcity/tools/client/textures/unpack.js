import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import { pixSize, unpackPix } from '#lostcity/util/PixUnpack.js';
import { loadPack } from '#lostcity/util/NameMap.js';

let textures = Jagfile.load('dump/client/textures');
let pack = loadPack('dump/pack/texture.pack');

fs.mkdirSync('dump/src/textures/meta', { recursive: true });

let index = textures.read('index.dat');
for (let i = 0; i < textures.fileCount; i++) {
    if (textures.fileName[i] === 'index.dat') {
        continue;
    }

    let dump = textures.read(textures.fileName[i]);
    let size = pixSize(dump, index);
    console.log(textures.fileName[i], size.width + 'x' + size.height);

    let safeName = textures.fileName[i].replace('.dat', '');
    let texture = unpackPix(dump, index);

    let realName = pack[safeName];
    await texture.img.writeAsync(`dump/src/textures/${realName}.png`);

    // ----

    let meta = `${texture.cropX},${texture.cropY},${texture.width},${texture.height},${texture.pixelOrder ? 'row' : 'column'}\n`;
    fs.writeFileSync(`dump/src/textures/meta/${realName}.opt`, meta);
}
