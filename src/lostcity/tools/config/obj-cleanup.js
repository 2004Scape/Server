import { loadDir, loadPack } from '../pack/NameMap.js';

let objPack = loadPack('data/pack/obj.pack');

let configs = [];
loadDir('data/src/scripts', '.obj', (src) => {
    let current = null;
    let config = [];

    for (let i = 0; i < src.length; i++) {
        let line = src[i];
        if (line.startsWith('//')) {
            continue;
        }

        if (line.startsWith('[')) {
            if (current) {
                configs[objPack.indexOf(current)] = config;
                config = [];
            }

            current = line.substring(1, line.length - 1);
            config.push(line);
            continue;
        }

        config.push(line);
    }

    if (current) {
        configs[objPack.indexOf(current)] = config;
    }
});

for (let i = 0; i < objPack.length; i++) {
    let name = objPack[i];
    let config = configs[i];
    if (!config) {
        continue;
    }

    if (config.findIndex(x => x.startsWith('recol')) !== -1) {
        // check if recol1s is immediately below model:
        let modelIndex = config.findIndex(x => x.startsWith('model'));
        let recolIndex = config.findIndex(x => x.startsWith('recol'));

        if (recolIndex - modelIndex !== 1) {
            console.log(name, 'recol is not immediately below model');

            // move all recol lines below model (there can be recol1s, recol1d, recol2s, recol2d, etc.)
            let recolLines = config.filter(x => x.startsWith('recol'));
            config = config.filter(x => !x.startsWith('recol'));
            config.splice(modelIndex + 1, 0, ...recolLines);

            configs[i] = config;
        }
    }

    if (config.findIndex(x => x.startsWith('name')) !== -1) {
        // check if name is immediately before desc, assuming desc is present:
        let nameIndex = config.findIndex(x => x.startsWith('name'));
        let descIndex = config.findIndex(x => x.startsWith('desc'));

        if (descIndex !== -1 && descIndex - nameIndex !== 1) {
            console.log(name, 'name is not immediately before desc');

            // move name line before desc (1 before)
            let nameLine = config[nameIndex];
            config = config.filter(x => !x.startsWith('name'));
            config.splice(descIndex - 1, 0, nameLine);

            configs[i] = config;
        }
    }

    if (config.findIndex(x => x.startsWith('wearpos=') && x !== 'wearpos=quiver' && x !== 'wearpos=ring') !== -1) {
        // check if wearpos and manwear are present together
        let manwearIndex = config.findIndex(x => x.startsWith('manwear='));

        if (manwearIndex === -1) {
            console.log(name, 'wearpos is present but manwear is not');
        }
    }
}

import fs from 'fs';

fs.writeFileSync('dump/all.obj', configs.filter(x => x).map(x => x.join('\n')).join('\n\n') + '\n');
