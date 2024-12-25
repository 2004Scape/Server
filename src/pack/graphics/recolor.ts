import fs from 'fs';
import ColorConversion from '#/util/ColorConversion.js';
import { loadDirExact, loadPack } from '#/util/NameMap.js';
import Model from '#/cache/graphics/Model.js';
import Jagfile from '#/io/Jagfile.js';

Model.unpack(Jagfile.load('data/pack/client/models'));

const models = loadPack('data/src/pack/model.pack');
const textures = loadPack('data/src/pack/texture.pack');

function convertRecolor(src: string[], file: string, path: string) {
    let changed = false;

    for (let i = 0; i < src.length; i++) {
        if (!src[i].startsWith('recol')) {
            continue;
        }

        const line = src[i];
        const parts = line.split('=');
        const recol = parseInt(parts[1]);

        const rgb = ColorConversion.reverseHsl(recol);
        src[i] = line.replace('=' + parts[1], '=' + rgb[0].toString());

        changed = true;
    }

    if (changed) {
        fs.writeFileSync(path + '/' + file, src.join('\n'));
    }
}

function modelHasTexture(modelId: number, textureId: number): boolean {
    const model = Model.get(modelId);
    if (!model || !model.faceColor || !model.texturedFaceCount) {
        return false;
    }

    for (let i = 0; i < model.faceCount; i++) {
        if (model.faceInfo && (model.faceInfo[i] & 0x3) > 1 && model.faceColor[i] === textureId) {
            return true;
        }
    }

    return false;
}

function modelIsTextured(modelName: string, textureId: number): boolean {
    const match = models.filter(m => m.startsWith(modelName));
    if (!match.length) {
        return false;
    }

    for (let i = 0; i < match.length; i++) {
        if (modelHasTexture(models.indexOf(match[i]), textureId)) {
            return true;
        }
    }

    return false;
}

// locs can be seen retexturing in the same recol property, based on model flags
function convertRecolorRetex(src: string[], file: string, path: string) {
    let changed = false;

    let configName = '';
    let retexCount = 0;
    let modelName = '';
    for (let i = 0; i < src.length; i++) {
        if (src[i].startsWith('[')) {
            configName = src[i];
            retexCount = 0;
        } else if (src[i].startsWith('model=')) {
            modelName = src[i].split('=')[1];
        }

        if (!src[i].startsWith('recol')) {
            continue;
        }

        const line = src[i];
        const parts = line.split('=');
        if (parts[0][6] === 's') {
            continue;
        }

        const sourceRecol = parseInt(src[i - 1].split('=')[1]);
        const destRecol = parseInt(parts[1]);

        const sourceRgb = ColorConversion.reverseHsl(sourceRecol);
        const destRgb = ColorConversion.reverseHsl(destRecol);

        // const recolIndex = parseInt(parts[0][5]);

        if (!sourceRgb.length || !destRgb.length) {
            // output as texture
            src[i - 1] = src[i - 1].replace('=' + src[i - 1].split('=')[1], '=' + textures[sourceRecol]);
            src[i] = src[i].replace('=' + parts[1], '=' + textures[destRecol]);

            // if we want to keep recol index but add a new property:
            src[i - 1] = src[i - 1].replace('recol', 'retex');
            src[i] = src[i].replace('recol', 'retex');

            // if we want to create retex and use a new index:
            // src[i - 1] = src[i - 1].replace('recol' + recolIndex, 'retex' + (retexCount + 1));
            // src[i] = src[i].replace('recol' + recolIndex, 'retex' + (retexCount + 1));
            // retexCount++;
        } else if (sourceRecol >= 50 || destRecol >= 50) {
            // output as rgb
            src[i - 1] = src[i - 1].replace('=' + src[i - 1].split('=')[1], '=' + sourceRgb[0].toString());
            src[i] = src[i].replace('=' + parts[1], '=' + destRgb[0].toString());

            // if we want to create retex and use a new index:
            // if (retexCount > 0) {
            //     src[i - 1] = src[i - 1].replace('recol' + recolIndex, 'recol' + (recolIndex - retexCount));
            //     src[i] = src[i].replace('recol' + recolIndex, 'recol' + (recolIndex - retexCount));
            // }
        } else if (modelIsTextured(modelName, sourceRecol)) {
            // output as texture
            src[i - 1] = src[i - 1].replace('=' + src[i - 1].split('=')[1], '=' + textures[sourceRecol]);
            src[i] = src[i].replace('=' + parts[1], '=' + textures[destRecol]);

            // if we want to keep recol index but add a new property:
            src[i - 1] = src[i - 1].replace('recol', 'retex');
            src[i] = src[i].replace('recol', 'retex');

            // if we want to create retex and use a new index:
            // src[i - 1] = src[i - 1].replace('recol' + recolIndex, 'retex' + (retexCount + 1));
            // src[i] = src[i].replace('recol' + recolIndex, 'retex' + (retexCount + 1));
            // retexCount++;
        } else {
            // output as rgb
            src[i - 1] = src[i - 1].replace('=' + src[i - 1].split('=')[1], '=' + sourceRgb[0].toString());
            src[i] = src[i].replace('=' + parts[1], '=' + destRgb[0].toString());

            // if we want to create retex and use a new index:
            // if (retexCount > 0) {
            //     src[i - 1] = src[i - 1].replace('recol' + recolIndex, 'recol' + (recolIndex - retexCount));
            //     src[i] = src[i].replace('recol' + recolIndex, 'recol' + (recolIndex - retexCount));
            // }
        }

        changed = true;
    }

    if (changed) {
        fs.writeFileSync(path + '/' + file, src.join('\n'));
    }
}

loadDirExact('data/src/scripts', '.obj', convertRecolor);
loadDirExact('data/src/scripts', '.npc', convertRecolor);
loadDirExact('data/src/scripts', '.idk', convertRecolor);
loadDirExact('data/src/scripts', '.spotanim', convertRecolor);
loadDirExact('data/src/scripts', '.loc', convertRecolorRetex);
