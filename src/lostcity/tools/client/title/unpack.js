import fs from 'fs';
import Jimp from 'jimp';

import Jagfile from '#jagex2/io/Jagfile.js';
import { pixSize, countPix, unpackPix } from '#lostcity/tools/client/unpack/Pix.js';

let title = Jagfile.load('dump/client/title');

fs.mkdirSync('dump/src/title/meta', { recursive: true });
fs.mkdirSync('dump/src/fonts/meta', { recursive: true });

let jpg = title.read('title.dat');
jpg.p1(0xFF); // restore JPEG header
jpg.save('dump/src/binary/title.jpg', jpg.length);

let index = title.read('index.dat');
for (let i = 0; i < title.fileCount; i++) {
    if (title.fileName[i] === 'index.dat' || title.fileName[i] === 'title.dat') {
        continue;
    }

    let dump = title.read(title.fileName[i]);
    let size = pixSize(dump, index);
    let count = countPix(dump, index);
    console.log(title.fileName[i], count, size.width + 'x' + size.height);

    let dest = 'title';
    let safeName = title.fileName[i].replace('.dat', '');
    if (safeName === 'p11' || safeName === 'p12' || safeName === 'b12' || safeName === 'q8') {
        dest = 'fonts';
    }

    if (count === 1) {
        let pix = unpackPix(dump, index);
        await pix.img.writeAsync(`dump/src/${dest}/${safeName}.png`);

        // ----

        let meta = `${pix.cropX},${pix.cropY},${pix.width},${pix.height},${pix.pixelOrder ? 'row' : 'column'}\n`;
        fs.writeFileSync(`dump/src/${dest}/meta/${safeName}.opt`, meta);
    } else {
        // sprite sheet!
        let sprites = [];
        for (let j = 0; j < count; j++) {
            sprites[j] = unpackPix(dump, index, j);
        }

        let width = Math.ceil(Math.sqrt(count));
        let height = Math.ceil(count / width);

        if (width * height > count) {
            let widthTries = 0;

            // wrong aspect ratio, try subtracting from width and adding to height
            while (width * height > count && widthTries < 10) {
                width--;
                height++;
                widthTries++;
            }
        }

        let sheet = new Jimp(width * size.width, height * size.height, 0xFF00FFFF).colorType(2);

        for (let j = 0; j < count; j++) {
            let x = j % width;
            let y = Math.floor(j / width);

            sheet.blit(sprites[j].img, x * size.width, y * size.height, 0, 0, size.width, size.height);
        }

        await sheet.writeAsync(`dump/src/${dest}/${safeName}.png`);

        // ----

        let meta = `${size.width}x${size.height}\n`;

        for (let j = 0; j < count; j++) {
            let sprite = sprites[j];
            meta += `${sprite.cropX},${sprite.cropY},${sprite.width},${sprite.height},${sprite.pixelOrder ? 'row' : 'column'}\n`;
        }

        fs.writeFileSync(`dump/src/${dest}/meta/${safeName}.opt`, meta);
    }
}
