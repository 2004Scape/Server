import fs from 'fs';
import { loadPack } from '../pack/NameMap.js';

let objPack = loadPack('data/pack/obj.pack');

let configFiles = ['data/src/scripts/_unpack/all.obj'];

// read through all files
let objConfigs = [];
for (let i = 0; i < configFiles.length; i++) {
    let src = fs.readFileSync(configFiles[i], 'utf8').replaceAll('\r\n', '\n').split('\n');
    let offset = 0;

    let obj = null;
    let objConfig = [];

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
            if (obj) {
                objConfigs[objPack.indexOf(obj)] = objConfig;
            }

            obj = line.substring(1, line.length - 1);
            objConfig = [];
        }

        objConfig.push(line);
        offset++;
    }

    if (obj) {
        objConfigs[objPack.indexOf(obj)] = objConfig;
    }
}

// sort in ascending pack order and pack everything
for (let i = 0; i < objConfigs.length; i++) {
    let config = objConfigs[i];

    let nameIndex = config.findIndex(x => x.startsWith('name'));
    if (nameIndex !== -1) {
        // place name first
        let temp = config[1];
        config[1] = config[nameIndex];
        config.splice(nameIndex, 1);
        config.splice(2, 0, temp);
    }
}

fs.writeFileSync('dump/all.obj', '');
for (let i = 0; i < objConfigs.length; i++) {
    let config = objConfigs[i];

    if (i > 0) {
        fs.appendFileSync('dump/all.obj', '\n');
    }

    for (let j = 0; j < config.length; j++) {
        fs.appendFileSync('dump/all.obj', `${config[j]}\n`);
    }
}
