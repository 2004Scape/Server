import fs from 'fs';

import Jagfile from '#jagex2/io/Jagfile.js';
import { pixSize, unpackPix } from '#lostcity/util/PixUnpack.js';
import { loadPack } from '#lostcity/util/NameMap.js';

const textures = Jagfile.load('data/client/textures');
const pack = loadPack('data/src/pack/texture.pack');

fs.mkdirSync('data/src/textures/meta', { recursive: true });

const index = textures.read('index.dat');

if (!index) {
    throw new Error('no index.dat');
}

for (let i = 0; i < textures.fileCount; i++) {
    if (textures.fileName[i] === 'index.dat') {
        continue;
    }

    const dump = textures.read(textures.fileName[i]);

    if (!dump) {
        throw new Error(`no ${textures.fileName[i]}`);
    }

    const size = pixSize(dump, index);
    console.log(textures.fileName[i], size.width + 'x' + size.height);

    const safeName = textures.fileName[i].replace('.dat', '');
    const texture = unpackPix(dump, index);

    const realName = pack[safeName as unknown as number];
    await texture.img.writeAsync(`data/src/textures/${realName}.png`);

    // ----

    const meta = `${texture.cropX},${texture.cropY},${texture.width},${texture.height},${texture.pixelOrder ? 'row' : 'column'}\n`;
    fs.writeFileSync(`data/src/textures/meta/${realName}.opt`, meta);
}
