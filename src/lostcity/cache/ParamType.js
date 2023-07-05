import { loadDir, loadPack } from '#lostcity/tools/pack/NameMap.js';

export default class ParamType {
    static names = [];
    static configs = [];

    static init() {
        // reading
        loadDir('data/src/scripts', '.param', (src) => {
            let current = null;
            let config = [];

            let id = 0; // no pack order tracking ids ahead of time
            for (let i = 0; i < src.length; i++) {
                let line = src[i];
                if (line.startsWith('//')) {
                    continue;
                }

                if (line.startsWith('[')) {
                    if (current) {
                        ParamType.names[id] = current;
                        ParamType.configs[id++] = config;
                    }

                    current = line.substring(1, line.length - 1);
                    config = [];
                    continue;
                }

                config.push(line);
            }

            if (current) {
                ParamType.names[id] = current;
                ParamType.configs[id++] = config;
            }
        });

        // parsing
        for (let i = 0; i < ParamType.configs.length; i++) {
            let lines = ParamType.configs[i];

            let config = new ParamType();
            config.id = i;

            for (let j = 0; j < lines.length; j++) {
                let line = lines[j];
                let key = line.substring(0, line.indexOf('='));
                let value = line.substring(line.indexOf('=') + 1);

                if (key === 'type') {
                    config.type = value;
                } else if (key === 'default') {
                    config.default = value;
                }
            }

            if (config.type === 'int') {
                config.default = parseInt(config.default);
            }

            ParamType.configs[i] = config;
        }
    }

    static get(id) {
        return ParamType.configs[id];
    }

    static getId(name) {
        return ParamType.names.indexOf(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    type = null;
    default = null;
}

console.time('ParamType.init()');
ParamType.init();
console.timeEnd('ParamType.init()');
