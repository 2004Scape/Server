import fs from 'fs';

let npcs = fs.readFileSync('ref/225/npc-spawns.v20.csv', 'ascii').replace(/\r/g, '').split('\n').filter(x => x.length && x.indexOf(',', 4) !== -1);

let npcMap = {};
for (let i = 1; i < npcs.length; i++) {
    let [x, z, level, id, ...comment] = npcs[i].split(',');

    x = parseInt(x);
    z = parseInt(z);
    level = parseInt(level);
    id = parseInt(id);

    let mapsquareX = x >> 6;
    let mapsquareZ = z >> 6;
    let localX = x - (mapsquareX << 6);
    let localZ = z - (mapsquareZ << 6);

    if (!npcMap[mapsquareX]) {
        npcMap[mapsquareX] = {};
    }

    if (!npcMap[mapsquareX][mapsquareZ]) {
        npcMap[mapsquareX][mapsquareZ] = [];
    }

    npcMap[mapsquareX][mapsquareZ].push({ id, level, localX, localZ });
}

for (let mapsquareX in npcMap) {
    for (let mapsquareZ in npcMap[mapsquareX]) {
        npcMap[mapsquareX][mapsquareZ].sort((a, b) => a.id - b.id);

        let npcs = npcMap[mapsquareX][mapsquareZ];
        let map = fs.readFileSync(`data/src/maps/m${mapsquareX}_${mapsquareZ}.jm2`, 'ascii').replace(/\r/g, '').split('\n');
        let npcStart = map.indexOf('==== NPC ====');

        if (npcStart === -1) {
            map.push('==== NPC ====');
            npcStart = map.length;
        }

        for (let i = 0; i < npcs.length; i++) {
            let { id, level, localX, localZ } = npcs[i];
            map.splice(npcStart + i, 0, `${level} ${localX} ${localZ}: ${id}`);
        }

        fs.writeFileSync(`data/src/maps/m${mapsquareX}_${mapsquareZ}.jm2`, map.join('\n') + '\n');
    }
}
