import fs from 'fs';
import Jimp from 'jimp';

import Jagfile from '#jagex2/io/Jagfile.js';
import { pixSize, countPix, unpackPix } from '#lostcity/util/PixUnpack.js';

fs.mkdirSync('dump/src/sprites/meta', { recursive: true });

let media = Jagfile.load('dump/client/media');

function isPrime(val) {
    if (val === 1) {
        // not prime but good enough for this function's purpose
        return true;
    }

    for (let i = 2; i < val; i++) {
        if (val % i === 0) {
            return false;
        }
    }

    return true;
}

let index = media.read('index.dat');
for (let i = 0; i < media.fileCount; i++) {
    if (media.fileName[i] === 'index.dat') {
        continue;
    }

    let data = media.read(media.fileName[i]);
    let size = pixSize(data, index);
    let count = countPix(data, index);
    console.log(media.fileName[i], count, size.width + 'x' + size.height);

    let safeName = media.fileName[i].replace('.dat', '');
    if (count === 1) {
        let pix = unpackPix(data, index);
        await pix.img.writeAsync(`dump/src/sprites/${safeName}.png`);

        // ----

        let meta = `${pix.cropX},${pix.cropY},${pix.width},${pix.height},${pix.pixelOrder ? 'row' : 'column'}\n`;
        fs.writeFileSync(`dump/src/sprites/meta/${safeName}.opt`, meta);

        // ----

        let pal = new Jimp(16, 16, 0xFF00FFFF).colorType(2);

        for (let j = 1; j < pix.palette.length; j++) {
            let x = j % 16;
            let y = Math.floor(j / 16);

            let color = pix.palette[j];

            let pos = (x + (y * 16)) * 4;
            pal.bitmap.data[pos] = (color >> 16) & 0xFF;
            pal.bitmap.data[pos + 1] = (color >> 8) & 0xFF;
            pal.bitmap.data[pos + 2] = color & 0xFF;
        }

        await pal.writeAsync(`dump/src/sprites/meta/${safeName}.pal.png`);
    } else {
        // sprite sheet!
        let sprites = [];
        for (let j = 0; j < count; j++) {
            sprites[j] = unpackPix(data, index, j);
        }

        let width = Math.ceil(Math.sqrt(count));
        let height = Math.ceil(count / width);

        const override = {
            'mapdots': { width: 4, height: 1 }
        };

        if (override[safeName]) {
            width = override[safeName].width;
            height = override[safeName].height;
        } else if (isPrime(count)) {
            width = count;
            height = 1;
        } if (width * height != count) {
            let heightTries = 0;

            // wrong aspect ratio, try subtracting from height and adding to width
            while (width * height != count && heightTries < 10) {
                height--;
                width++;
                heightTries++;
            }

            if (width * height != count) {
                width = Math.ceil(Math.sqrt(count));
                height = Math.ceil(count / width);

                // because we do width second, we're biased towards a wider spritesheet
                let widthTries = 0;

                // wrong aspect ratio, try subtracting from width and adding to height
                while (width * height != count && widthTries < 10) {
                    width--;
                    height++;
                    widthTries++;
                }

                if (width * height != count) {
                    // oh well, we tried
                    width = count;
                    height = 1;
                }
            }
        }

        if (width * height != count) {
            console.log('Could not determine size of spritesheet', safeName, width, height, count);
        }

        let sheet = new Jimp(width * size.width, height * size.height, 0xFF00FFFF).colorType(2);

        for (let j = 0; j < count; j++) {
            let x = j % width;
            let y = Math.floor(j / width);

            sheet.blit(sprites[j].img, x * size.width, y * size.height, 0, 0, size.width, size.height);
        }

        await sheet.writeAsync(`dump/src/sprites/${safeName}.png`);

        // ----

        let meta = `${size.width}x${size.height}\n`;

        for (let j = 0; j < count; j++) {
            let sprite = sprites[j];
            meta += `${sprite.cropX},${sprite.cropY},${sprite.width},${sprite.height},${sprite.pixelOrder ? 'row' : 'column'}\n`;
        }

        fs.writeFileSync(`dump/src/sprites/meta/${safeName}.opt`, meta);

        // ----

        let pal = new Jimp(16, 16, 0xFF00FFFF).colorType(2);

        for (let j = 1; j < sprites[0].palette.length; j++) {
            let x = j % 16;
            let y = Math.floor(j / 16);

            let color = sprites[0].palette[j];

            let pos = (x + (y * 16)) * 4;
            pal.bitmap.data[pos] = (color >> 16) & 0xFF;
            pal.bitmap.data[pos + 1] = (color >> 8) & 0xFF;
            pal.bitmap.data[pos + 2] = color & 0xFF;
        }

        await pal.writeAsync(`dump/src/sprites/meta/${safeName}.pal.png`);
    }
}
