import { loadDir, loadPack } from '#lostcity/tools/pack/NameMap.js';

let modelPack = loadPack('data/pack/model.pack');

let idkPack = loadPack('data/pack/idk.pack');

export default class IdkType {
    static names = [];
    static configs = [];

    static init() {
        // reading
        loadDir('data/src/scripts', '.idk', (src) => {
            let current = null;
            let config = [];

            for (let i = 0; i < src.length; i++) {
                let line = src[i];
                if (line.startsWith('//')) {
                    continue;
                }

                if (line.startsWith('[')) {
                    if (current) {
                        let id = idkPack.indexOf(current);
                        IdkType.names[id] = current;
                        IdkType.configs[id] = config;
                    }

                    current = line.substring(1, line.length - 1);
                    config = [];
                    continue;
                }

                config.push(line);
            }

            if (current) {
                let id = idkPack.indexOf(current);
                IdkType.names[id] = current;
                IdkType.configs[id] = config;
            }
        });

        // parsing
        for (let i = 0; i < IdkType.configs.length; i++) {
            let lines = IdkType.configs[i];

            let config = new IdkType();
            config.id = i;

            for (let j = 0; j < lines.length; j++) {
                let line = lines[j];
                let key = line.substring(0, line.indexOf('='));
                let value = line.substring(line.indexOf('=') + 1);

                if (key.startsWith('model')) {
                    let index = parseInt(key.substring('model'.length)) - 1;
                    config.models[index] = modelPack.indexOf(value);
                } else if (key.startsWith('head')) {
                    let index = parseInt(key.substring('head'.length)) - 1;
                    config.heads[index] = modelPack.indexOf(value);
                } else if (key.startsWith('recol') && key.endsWith('s')) {
                    let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                    config.recol_s[index] = parseInt(value);
                } else if (key.startsWith('recol') && key.endsWith('d')) {
                    let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                    config.recol_d[index] = parseInt(value);
                } else if (key === 'type') {
                    let bodypart = 0;
                    switch (value) {
                        case 'man_hair':
                            bodypart = 0;
                            break;
                        case 'man_jaw':
                            bodypart = 1;
                            break;
                        case 'man_torso':
                            bodypart = 2;
                            break;
                        case 'man_arms':
                            bodypart = 3;
                            break;
                        case 'man_hands':
                            bodypart = 4;
                            break;
                        case 'man_legs':
                            bodypart = 5;
                            break;
                        case 'man_feet':
                            bodypart = 6;
                            break;
                        case 'woman_hair':
                            bodypart = 7;
                            break;
                        case 'woman_jaw':
                            bodypart = 8;
                            break;
                        case 'woman_torso':
                            bodypart = 9;
                            break;
                        case 'woman_arms':
                            bodypart = 10;
                            break;
                        case 'woman_hands':
                            bodypart = 11;
                            break;
                        case 'woman_legs':
                            bodypart = 12;
                            break;
                        case 'woman_feet':
                            bodypart = 13;
                            break;
                    }

                    config.type = bodypart;
                } else if (key === 'disable' && value === 'yes') {
                    config.disable = true;
                }
            }

            IdkType.configs[i] = config;
        }
    }

    static get(id) {
        return IdkType.configs[id];
    }

    static getId(name) {
        return idkPack.indexOf(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    type = -1;
    models = [];
    heads = [-1, -1, -1, -1, -1];
    recol_s = [0, 0, 0, 0, 0, 0];
    recol_d = [0, 0, 0, 0, 0, 0];
    disable = false;
}

console.time('IdkType.init()');
IdkType.init();
console.timeEnd('IdkType.init()');
