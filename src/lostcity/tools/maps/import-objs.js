import fs from 'fs';

let objs = fs.readFileSync('ref/225/obj-spawns.v7.csv', 'ascii').replace(/\r/g, '').split('\n').filter(x => x.length && x.indexOf(',', 4) !== -1);

let objMap = {};
for (let i = 1; i < objs.length; i++) {
    let [x, z, level, id, count, ...comment] = objs[i].split(',');

    x = parseInt(x);
    z = parseInt(z);
    level = parseInt(level);
    id = parseInt(id);
    count = parseInt(count);

    let mapsquareX = x >> 6;
    let mapsquareZ = z >> 6;
    let localX = x - (mapsquareX << 6);
    let localZ = z - (mapsquareZ << 6);

    if (!objMap[mapsquareX]) {
        objMap[mapsquareX] = {};
    }

    if (!objMap[mapsquareX][mapsquareZ]) {
        objMap[mapsquareX][mapsquareZ] = [];
    }

    objMap[mapsquareX][mapsquareZ].push({ id, count, level, localX, localZ });
}

for (let mapsquareX in objMap) {
    for (let mapsquareZ in objMap[mapsquareX]) {
        objMap[mapsquareX][mapsquareZ].sort((a, b) => a.id - b.id);

        let objs = objMap[mapsquareX][mapsquareZ];
        let map = fs.readFileSync(`data/src/maps/m${mapsquareX}_${mapsquareZ}.jm2`, 'ascii').replace(/\r/g, '').split('\n');
        let objStart = map.indexOf('==== OBJ ====');

        if (objStart === -1) {
            map.push('==== OBJ ====');
            objStart = map.length;
        }

        for (let i = 0; i < objs.length; i++) {
            let { id, level, localX, localZ, count } = objs[i];
            map.splice(objStart + i, 0, `${level} ${localX} ${localZ}: ${id} ${count}`);
        }

        fs.writeFileSync(`data/src/maps/m${mapsquareX}_${mapsquareZ}.jm2`, map.join('\n') + '\n');
    }
}
