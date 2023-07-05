import { loadDir, loadPack } from '#lostcity/tools/pack/NameMap.js';

let objPack = loadPack('data/pack/obj.pack');

let invPack = loadPack('data/pack/inv.pack');

export default class InvType {
    static names = [];
    static configs = [];

    static init() {
        // reading
        loadDir('data/src/scripts', '.inv', (src) => {
            let current = null;
            let config = [];

            for (let i = 0; i < src.length; i++) {
                let line = src[i];
                if (line.startsWith('//')) {
                    continue;
                }

                if (line.startsWith('[')) {
                    if (current) {
                        let id = invPack.indexOf(current);
                        InvType.names[id] = current;
                        InvType.configs[id] = config;
                    }

                    current = line.substring(1, line.length - 1);
                    config = [];
                    continue;
                }

                config.push(line);
            }

            if (current) {
                let id = invPack.indexOf(current);
                InvType.names[id] = current;
                InvType.configs[id] = config;
            }
        });

        // parsing
        for (let i = 0; i < InvType.configs.length; i++) {
            let lines = InvType.configs[i];
            if (!lines) {
                continue;
            }

            let config = new InvType();
            config.id = i;

            for (let j = 0; j < lines.length; j++) {
                let line = lines[j];
                let key = line.substring(0, line.indexOf('='));
                let value = line.substring(line.indexOf('=') + 1);

                if (key === 'size') {
                    config.size = parseInt(value);
                } else if (key === 'scope') {
                    config.scope = value;
                } else if (key === 'stackall') {
                    config.stackall = value == 'yes';
                } else if (key.startsWith('stock')) {
                }
            }

            InvType.configs[i] = config;
        }
    }

    static get(id) {
        return InvType.configs[id];
    }

    static getId(name) {
        return InvType.names.indexOf(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    size = 1;
    scope = 'temp';
    stackall = false;
}

console.time('InvType.init()');
InvType.init();
console.timeEnd('InvType.init()');
