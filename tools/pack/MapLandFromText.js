import fs from 'fs';
import Packet from '#util/Packet.js';
import { compressManyBz2 } from '#util/Bzip2.js';

function encode(map) {
    let levelHeightmap = [];
    let levelTileOverlayIds = [];
    let levelTileOverlayShape = [];
    let levelTileOverlayRotation = [];
    let levelTileFlags = [];
    let levelTileUnderlayIds = [];

    for (let level = 0; level < 4; level++) {
        if (!levelTileFlags[level]) {
            levelHeightmap[level] = [];
            levelTileOverlayIds[level] = [];
            levelTileOverlayShape[level] = [];
            levelTileOverlayRotation[level] = [];
            levelTileFlags[level] = [];
            levelTileUnderlayIds[level] = [];
        }

        for (let x = 0; x < 64; x++) {
            if (!levelTileFlags[level][x]) {
                levelHeightmap[level][x] = [];
                levelTileOverlayIds[level][x] = [];
                levelTileOverlayShape[level][x] = [];
                levelTileOverlayRotation[level][x] = [];
                levelTileFlags[level][x] = [];
                levelTileUnderlayIds[level][x] = [];
            }

            for (let z = 0; z < 64; z++) {
                levelHeightmap[level][x][z] = 0;
                levelTileOverlayIds[level][x][z] = -1;
                levelTileOverlayShape[level][x][z] = -1;
                levelTileOverlayRotation[level][x][z] = -1;
                levelTileFlags[level][x][z] = -1;
                levelTileUnderlayIds[level][x][z] = -1;
            }
        }
    }

    const text = Buffer.from(fs.readFileSync(`data/src/maps/${map}.txt`)).toString().replaceAll('\r\n', '\n').split('\n');
    for (let i = 0; i < text.length; i++) {
        const line = text[i];
        if (line.length == 0) {
            continue;
        }

        const parts = line.split(':');
        const coords = parts[0].split(' ');
        const level = parseInt(coords[0]);
        const x = parseInt(coords[1]);
        const z = parseInt(coords[2]);

        const values = parts[1].split(',').map(v => v.trim());
        levelHeightmap[level][x][z] = parseInt(values[0]);
        const overlay = values[1].split(' ');
        levelTileOverlayIds[level][x][z] = parseInt(overlay[0]);
        levelTileOverlayShape[level][x][z] = parseInt(overlay[1]);
        levelTileOverlayRotation[level][x][z] = parseInt(overlay[2]);
        levelTileFlags[level][x][z] = parseInt(values[2]);
        levelTileUnderlayIds[level][x][z] = parseInt(values[3]);
    }

    // iterate through the map and calculate the size of the data
    let size = 64 * 64 * 4;
    for (let level = 0; level < 4; level++) {
        for (let x = 0; x < 64; x++) {
            for (let z = 0; z < 64; z++) {
                let height = levelHeightmap[level][x][z];
                let overlay = levelTileOverlayIds[level][x][z];

                if (overlay != -1) {
                    size += 1;
                }

                if (height != 0) {
                    size += 1;
                }
            }
        }
    }

    let data = new Packet(size);
    for (let level = 0; level < 4; level++) {
        for (let x = 0; x < 64; x++) {
            for (let z = 0; z < 64; z++) {
                let height = levelHeightmap[level][x][z];
                let overlay = levelTileOverlayIds[level][x][z];
                let shape = levelTileOverlayShape[level][x][z];
                let rotation = levelTileOverlayRotation[level][x][z];
                let flags = levelTileFlags[level][x][z];
                let underlay = levelTileUnderlayIds[level][x][z];

                if (height == 0 && overlay == -1 && flags == -1 && underlay == -1) {
                    // default values
                    data.p1(0);
                    continue;
                }

                if (overlay != -1) {
                    let opcode = 2;
                    opcode += shape << 2;
                    opcode += rotation;
                    data.p1(opcode);
                    data.p1(overlay);
                }

                if (flags != -1) {
                    data.p1(flags + 49);
                }

                if (underlay != -1) {
                    data.p1(underlay + 81);
                }

                if (height != 0) {
                    // specific height
                    data.p1(1);
                    data.p1(height);
                } else {
                    // perlin noise
                    data.p1(0);
                }
            }
        }
    }

    return data;
}

fs.mkdirSync('data/maps', { recursive: true });

let toCompress = [];

console.log('Generating maps...');
console.time('Generating maps');
fs.readdirSync('data/src/maps').filter(f => f.startsWith('m')).forEach(file => {
    let map = file.replace('.txt', '');

    if (!fs.existsSync(`data/maps/${map}`)) {
        console.log(`Creating ${map}...`);
        let data = encode(map);
        data.toFile(`data/maps/${map}`);
        toCompress.push({
            path: `data/maps/${map}`,
            length: data.length
        });
        return;
    }

    let stat = fs.statSync(`data/src/maps/${file}`);
    let rawStat = fs.statSync(`data/maps/${map}`);

    if (stat.mtimeMs > rawStat.mtimeMs) {
        let data = encode(map);
        let raw = fs.readFileSync(`data/maps/${map}`);

        if (Packet.crc32(data) !== Packet.crc32(raw)) {
            console.log(`Updating ${map}...`);
            data.toFile(`data/maps/${map}`);
            toCompress.push({
                path: `data/maps/${map}`,
                length: data.length
            });
        }
    }
});
console.timeEnd('Generating maps');

if (toCompress.length) {
    console.log('Compressing maps...');
    console.time('Compressing maps');
    compressManyBz2(toCompress.map(f => f.path));

    toCompress.forEach(f => {
        // need to rename and then replace the bzip header with the uncompressed length
        fs.renameSync(`${f.path}.bz2`, f.path);
        let temp = Packet.fromFile(f.path);
        temp.p4(f.length);
        temp.toFile(f.path);
    });
    console.timeEnd('Compressing maps');
}
