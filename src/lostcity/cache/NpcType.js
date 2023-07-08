import { loadDir, loadPack } from '#lostcity/tools/pack/NameMap.js';

let modelPack = loadPack('data/pack/model.pack');
let seqPack = loadPack('data/pack/seq.pack');

let npcPack = loadPack('data/pack/npc.pack');

export default class NpcType {
    static configs = [];

    static init() {
        // reading
        loadDir('data/src/scripts', '.npc', (src) => {
            let current = null;
            let config = [];

            for (let i = 0; i < src.length; i++) {
                let line = src[i];
                if (line.startsWith('//')) {
                    continue;
                }

                if (line.startsWith('[')) {
                    if (current) {
                        let id = npcPack.indexOf(current);
                        NpcType.configs[id] = config;
                    }

                    current = line.substring(1, line.length - 1);
                    config = [];
                    continue;
                }

                config.push(line);
            }

            if (current) {
                let id = npcPack.indexOf(current);
                NpcType.configs[id] = config;
            }
        });

        // parsing
        for (let i = 0; i < NpcType.configs.length; i++) {
            let lines = NpcType.configs[i];

            let config = new NpcType();
            config.id = i;
            config.config = npcPack[i];

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
                } else if (key.startsWith('op')) {
                    let index = parseInt(key.substring('op'.length)) - 1;
                    config.ops[index] = value;
                } else if (key === 'name') {
                    config.name = value;
                } else if (key === 'desc') {
                    config.desc = value;
                } else if (key === 'size') {
                    config.size = parseInt(value);
                } else if (key === 'readyanim') {
                    config.readyanim = seqPack.indexOf(value);
                } else if (key === 'walkanim') {
                    config.walkanim = seqPack.indexOf(value);
                } else if (key === 'walkanim_b') {
                    config.walkanim_b = seqPack.indexOf(value);
                } else if (key === 'walkanim_r') {
                    config.walkanim_r = seqPack.indexOf(value);
                } else if (key === 'walkanim_l') {
                    config.walkanim_l = seqPack.indexOf(value);
                } else if (key === 'hasalpha' && value === 'yes') {
                    config.hasalpha = true;
                } else if (key === 'code90') {
                    config.code90 = parseInt(value);
                } else if (key === 'code91') {
                    config.code91 = parseInt(value);
                } else if (key === 'code92') {
                    config.code92 = parseInt(value);
                } else if (key === 'visonmap' && value === 'no') {
                    config.visonmap = false;
                } else if (key === 'vislevel') {
                    config.vislevel = parseInt(value);
                } else if (key === 'resizeh') {
                    config.resizeh = parseInt(value);
                } else if (key === 'resizev') {
                    config.resizev = parseInt(value);
                }
            }

            NpcType.configs[i] = config;
        }
    }

    static get(id) {
        return NpcType.configs[id];
    }

    static getId(name) {
        return npcPack.indexOf(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    name = null;
    desc = null;
    size = 1;
    models = [];
    heads = [];
    readyanim = -1;
    walkanim = -1;
    walkanim_b = -1;
    walkanim_r = -1;
    walkanim_l = -1;
    hasalpha = false;
    recol_s = [];
    recol_d = [];
    ops = [];
    code90 = -1;
    code91 = -1;
    code92 = -1;
    visonmap = true;
    vislevel = -1;
    resizeh = 128;
    resizev = 128;

    // server-side
    category = -1;
}

console.time('NpcType.init()');
NpcType.init();
console.timeEnd('NpcType.init()');
