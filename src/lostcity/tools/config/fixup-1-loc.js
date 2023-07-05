import fs from 'fs';
import { loadPack } from '../pack/NameMap.js';

let locPack = loadPack('data/pack/loc.pack');

let configFiles = ['data/src/scripts/_unpack/all.loc'];

// read through all files
let locConfigs = [];
for (let i = 0; i < configFiles.length; i++) {
    let src = fs.readFileSync(configFiles[i], 'utf8').replaceAll('\r\n', '\n').split('\n');
    let offset = 0;

    let loc = null;
    let locConfig = [];

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
            if (loc) {
                locConfigs[locPack.indexOf(loc)] = locConfig;
            }

            loc = line.substring(1, line.length - 1);
            locConfig = [];
        }

        locConfig.push(line);
        offset++;
    }

    if (loc) {
        locConfigs[locPack.indexOf(loc)] = locConfig;
    }
}

// sort in ascending pack order and pack everything
for (let i = 0; i < locConfigs.length; i++) {
    let config = locConfigs[i];

    let modelIndex = config.findIndex(x => x.startsWith('model'));
    if (modelIndex !== -1) {
        // place name first
        let temp = config[1];
        config[1] = config[modelIndex];
        config.splice(modelIndex, 1);
        config.splice(2, 0, temp);
    }

    let descIndex = config.findIndex(x => x.startsWith('desc'));
    if (descIndex !== -1) {
        // place desc first (can be moved to second)
        let temp = config[1];
        config[1] = config[descIndex];
        config.splice(descIndex, 1);
        config.splice(2, 0, temp);
    }

    let nameIndex = config.findIndex(x => x.startsWith('name'));
    if (nameIndex !== -1) {
        // place name first
        let temp = config[1];
        config[1] = config[nameIndex];
        config.splice(nameIndex, 1);
        config.splice(2, 0, temp);
    }
}

fs.writeFileSync('dump/all.loc', '');
for (let i = 0; i < locConfigs.length; i++) {
    let config = locConfigs[i];

    if (i > 0) {
        fs.appendFileSync('dump/all.loc', '\n');
    }

    for (let j = 0; j < config.length; j++) {
        fs.appendFileSync('dump/all.loc', `${config[j]}\n`);
    }
}
