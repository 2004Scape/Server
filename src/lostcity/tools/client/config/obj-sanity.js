import { loadDir, loadPack } from '#lostcity/util/NameMap.js';

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
            }

            current = line.substring(1, line.length - 1);
            config = [];
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
    if (name.startsWith('cert_')) {
        if (objPack.indexOf(name.substring('cert_'.length)) === -1) {
            console.log(name, 'is unlinked');
        }

        continue;
    }

    let config = configs[i];
    console.log(name, config.indexOf('tradeable=yes'), objPack.indexOf('cert_' + name));
    if (config.indexOf('tradeable=yes') !== -1 && objPack.indexOf('cert_' + name) === -1) {
        console.log(name, 'is unlinked');
    }
}
