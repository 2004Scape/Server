import fs from 'fs';
import Packet from '#util/Packet.js';

fs.mkdirSync('data/maps', { recursive: true });

fs.readdirSync('data/src/maps').filter(f => f.startsWith('l')).forEach(file => {
    let map = file.replace('.txt', '');

    if (!fs.existsSync(`data/maps/${map}`)) {
        console.log(`Creating ${map}...`);
        let data = encode(map);
        Packet.bzip2(data).toFile(`data/maps/${map}`);
        return;
    }

    let stat = fs.statSync(`data/src/maps/${file}`);
    let rawStat = fs.statSync(`data/maps/${map}`);

    if (stat.mtimeMs > rawStat.mtimeMs) {
        let data = encode(map);
        let raw = fs.readFileSync(`data/maps/${map}`);

        if (Packet.crc32(data) !== Packet.crc32(raw)) {
            console.log(`Updating ${map}...`);
            Packet.bzip2(data).toFile(`data/maps/${map}`);
        }
    }
});

function encode(map) {
    let locs = {};

    const text = Buffer.from(fs.readFileSync(`data/src/maps/${map}.txt`)).toString().replaceAll('\r\n', '\n').split('\n');
    for (let i = 0; i < text.length; i++) {
        const line = text[i];
        if (line.length == 0 || line.startsWith(';') || line.startsWith('#') || line.startsWith('//')) {
            continue;
        }

        const parts = line.split(':');
        const coords = parts[0].split(' ');
        const level = parseInt(coords[0]);
        const x = parseInt(coords[1]);
        const z = parseInt(coords[2]);

        const values = parts[1].split(',').map(v => v.trim());
        let locId = parseInt(values[0]);
        let locType = parseInt(values[1]);
        let locOrientation = parseInt(values[2]);

        if (!locs[locId]) {
            locs[locId] = [];
        }

        locs[locId].push({
            level,
            x,
            z,
            type: locType,
            orientation: locOrientation
        });
    }

    let locIds = Object.keys(locs).map(id => parseInt(id)).sort((a, b) => a - b);

    let data = new Packet();

    let lastLocId = -1;
    for (let i = 0; i < locIds.length; i++) {
        let locId = locIds[i];
        let locData = locs[locId];

        data.psmart(locId - lastLocId);
        lastLocId = locId;

        let lastLocData = 0;
        for (let j = 0; j < locData.length; j++) {
            let loc = locData[j];

            let currentLocData = (loc.level << 12) | (loc.x << 6) | loc.z;
            data.psmart(currentLocData - lastLocData + 1);
            lastLocData = currentLocData;

            let locInfo = (loc.type << 2) | loc.orientation;
            data.p1(locInfo);
        }

        data.psmart(0); // end of this loc
    }

    data.psmart(0); // end of map
    return data;
}
