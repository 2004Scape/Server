import Packet from '#util/Packet.js';
import fs from 'fs';

fs.mkdirSync('data/src/maps', { recursive: true });

fs.readdirSync('data/maps').filter(f => f.startsWith('m')).forEach(map => {
    let data = Packet.fromFile(`data/maps/${map}`);

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

                while (true) {
                    let opcode = data.g1();
                    if (opcode == 0) {
                        // height derived from perlin noise
                        levelHeightmap[level][x][z] = 0;
                        break;
                    }

                    if (opcode == 1) {
                        // height specified
                        levelHeightmap[level][x][z] = data.g1();
                        break;
                    }

                    if (opcode <= 49) {
                        levelTileOverlayIds[level][x][z] = data.g1b();
                        levelTileOverlayShape[level][x][z] = Math.floor((opcode - 2) / 4);
                        levelTileOverlayRotation[level][x][z] = (opcode - 2) & 0x3;
                    } else if (opcode <= 81) {
                        levelTileFlags[level][x][z] = opcode - 49;
                    } else {
                        levelTileUnderlayIds[level][x][z] = opcode - 81;
                    }
                }
            }
        }
    }

    let text = '';
    for (let level = 0; level < 4; level++) {
        for (let x = 0; x < 64; x++) {
            for (let z = 0; z < 64; z++) {
                let height = levelHeightmap[level][x][z];
                let overlay = levelTileOverlayIds[level][x][z];
                let flags = levelTileFlags[level][x][z];
                let underlay = levelTileUnderlayIds[level][x][z];

                if (height == 0 && overlay == -1 && flags == -1 && underlay == -1) {
                    // default values
                    continue;
                }

                text += `${level} ${x} ${z}: ${levelHeightmap[level][x][z]}, ${levelTileOverlayIds[level][x][z]} ${levelTileOverlayShape[level][x][z]} ${levelTileOverlayRotation[level][x][z]}, ${levelTileFlags[level][x][z]}, ${levelTileUnderlayIds[level][x][z]}\n`;
            }
        }
    }

    fs.writeFileSync(`data/src/maps/${map}.txt`, text);
});
