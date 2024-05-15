import fs from 'fs';
import { basename } from 'path';

import { loadDir } from '#lostcity/util/Parse.js';

let allObjs: {
    id: number;
    level: number;
    quantity: number;
    mapsquareX: number;
    mapsquareZ: number;
    localX: number;
    localZ: number;
    source: string;
}[] = [];

const args = process.argv.slice(2);
if (args.length !== 1) {
    console.log('Usage: ImportObjCsv.js <obj_csv_file>');
    process.exit(1);
}

const objList = fs
    .readFileSync(args[0], 'ascii')
    .replace(/\r/g, '')
    .split('\n')
    .slice(1)
    .filter(line => line.length > 0);
objList.forEach((line, index) => {
    const csv = line.split(',');
    if (csv.length < 4) {
        return;
    }

    const [x, z, level, id, quantity] = csv;

    const absX = parseInt(x);
    const absZ = parseInt(z);
    const mapsquareX = absX >>> 6;
    const mapsquareZ = absZ >>> 6;
    const localX = absX % 64;
    const localZ = absZ % 64;

    if (Number.isNaN(parseInt(id))) {
        console.log(`Invalid id: ${id}`, csv);
    }

    allObjs.push({
        id: parseInt(id),
        level: parseInt(level),
        quantity: parseInt(quantity),
        mapsquareX,
        mapsquareZ,
        localX,
        localZ,
        source: line + '|' + index
    });
});

loadDir('data/src/maps', (lines: string[], file: string) => {
    const safeName = basename(file, '.jm2').slice(1);
    const [mapsquareX, mapsquareZ] = safeName.split('_').map(x => parseInt(x));

    const objs = allObjs.filter(obj => obj.mapsquareX === mapsquareX && obj.mapsquareZ === mapsquareZ);
    allObjs = allObjs.filter(obj => obj.mapsquareX !== mapsquareX || obj.mapsquareZ !== mapsquareZ); // remove processed objs

    const objStartIndex = lines.indexOf('==== OBJ ====');
    if (objStartIndex !== -1) {
        // remove old obj section
        lines = lines.slice(0, objStartIndex);
    }

    // place obj section at the end
    if (objs.length) {
        lines.push('==== OBJ ====');
        // format - level x z: id quantity
        lines.push(...objs.map(obj => `${obj.level} ${obj.localX} ${obj.localZ}: ${obj.id} ${obj.quantity}`));
        lines.push('');
    }

    fs.writeFileSync('data/src/maps/' + file, lines.join('\n'));
});

if (allObjs.length > 0) {
    console.log(`Leftover objs: ${allObjs.length}`);
    console.log(allObjs);
}
