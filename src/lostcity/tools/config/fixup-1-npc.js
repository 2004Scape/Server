import fs from 'fs';
import { loadPack } from '../pack/NameMap.js';

let npcPack = loadPack('data/pack/npc.pack');

let configFiles = ['data/src/scripts/_unpack/all.npc'];

// read through all files
let npcConfigs = [];
for (let i = 0; i < configFiles.length; i++) {
    let src = fs.readFileSync(configFiles[i], 'utf8').replaceAll('\r\n', '\n').split('\n');
    let offset = 0;

    let npc = null;
    let npcConfig = [];

    let comment = false;
    while (offset < src.length) {
        let line = src[offset];

        if (comment && line.endsWith('*/')) {
            comment = false;
            offset++;
            continue;
        } else if (line.startsWith('/*')) {
            comment = true;
            offset++;
            continue;
        } else if (!line.length || comment || line.startsWith('//')) {
            offset++;
            continue;
        }

        if (line.startsWith('[')) {
            if (npc) {
                npcConfigs[npcPack.indexOf(npc)] = npcConfig;
            }

            npc = line.substring(1, line.length - 1);
            npcConfig = [];
        }

        npcConfig.push(line);
        offset++;
    }

    if (npc) {
        npcConfigs[npcPack.indexOf(npc)] = npcConfig;
    }
}

// sort in ascending pack order and pack everything
for (let i = 0; i < npcConfigs.length; i++) {
    let config = npcConfigs[i];

    let nameIndex = config.findIndex(x => x.startsWith('name'));
    if (nameIndex !== -1) {
        // try to place name before desc
        let descIndex = config.findIndex(x => x.startsWith('desc'));

        if (descIndex !== -1) {
            let temp = config[descIndex];
            config[descIndex] = config[nameIndex];
            config.splice(nameIndex, 1);
            config.splice(descIndex + 1, 0, temp);
        } else {
            // otherwise if there's no desc, place name first
            let temp = config[1];
            config[1] = config[nameIndex];
            config.splice(nameIndex, 1);
            config.splice(2, 0, temp);
        }
    }
}

fs.writeFileSync('dump/all.npc', '');
for (let i = 0; i < npcConfigs.length; i++) {
    let config = npcConfigs[i];

    if (i > 0) {
        fs.appendFileSync('dump/all.npc', '\n');
    }

    for (let j = 0; j < config.length; j++) {
        fs.appendFileSync('dump/all.npc', `${config[j]}\n`);
    }
}
