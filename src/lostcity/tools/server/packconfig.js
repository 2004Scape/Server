import Packet from '#jagex2/io/Packet.js';
import fs from 'fs';
import { loadDir, loadOrder, loadPack } from '../pack/NameMap.js';
import ParamType from '#lostcity/cache/ParamType.js';
import { crawlConfigCategories, crawlConfigNames, regenPack } from './packids.js';

// ----

// generating category IDs

console.time('Category ID generation');
fs.writeFileSync('data/pack/category.pack', regenPack(loadPack('data/pack/category.pack'), crawlConfigCategories()));
let categoryPack = loadPack('data/pack/category.pack');
console.timeEnd('Category ID generation');

// ----

// generating param IDs

console.time('Param ID generation');
fs.writeFileSync('data/pack/param.pack', regenPack(loadPack('data/pack/param.pack'), crawlConfigNames('.param')));
let paramPack = loadPack('data/pack/param.pack');
console.timeEnd('Param ID generation');

// ----

// generating inv IDs

console.time('Inv ID generation');
fs.writeFileSync('data/pack/inv.pack', regenPack(loadPack('data/pack/inv.pack'), crawlConfigNames('.inv')));
let invPack = loadPack('data/pack/inv.pack');
console.timeEnd('Inv ID generation');

// ----

// generating enum IDs

console.time('Enum ID generation');
fs.writeFileSync('data/pack/enum.pack', regenPack(loadPack('data/pack/enum.pack'), crawlConfigNames('.enum')));
let enumPack = loadPack('data/pack/enum.pack');
console.timeEnd('Enum ID generation');

// ----

// generating struct IDs

console.time('Struct ID generation');
fs.writeFileSync('data/pack/struct.pack', regenPack(loadPack('data/pack/struct.pack'), crawlConfigNames('.struct')));
let structPack = loadPack('data/pack/struct.pack');
console.timeEnd('Struct ID generation');

// ----

// binary formats
let modelPack = loadPack('data/pack/model.pack');
let animPack = loadPack('data/pack/anim.pack');
let texturePack = loadPack('data/pack/texture.pack');
let soundPack = loadPack('data/pack/sound.pack');

// config formats
let floPack = loadPack('data/pack/flo.pack');
let idkPack = loadPack('data/pack/idk.pack');
let locPack = loadPack('data/pack/loc.pack');
let npcPack = loadPack('data/pack/npc.pack');
let objPack = loadPack('data/pack/obj.pack');
let seqPack = loadPack('data/pack/seq.pack');
let spotanimPack = loadPack('data/pack/spotanim.pack');
let varpPack = loadPack('data/pack/varp.pack');

let interfacePack = loadPack('data/pack/interface.pack');

// ----

// we need to pack params first so configs can reference their type info

function typeToChar(type) {
    let char = 'i'; // sane default

    switch (type) {
        case 'int':
            char = 'i';
            break;
        case 'string':
            char = 's';
            break;
        // official, despite how weird some are:
        case 'enum':
            char = 'g';
            break;
        case 'obj':
            char = 'o';
            break;
        case 'loc':
            char = 'l';
            break;
        case 'component': // may not need this on server
            char = 'I';
            break;
        case 'namedobj':
            char = 'O';
            break;
        case 'struct':
            char = 'J';
            break;
        case 'boolean':
            char = '1';
            break;
        case 'coord':
            char = 'c';
            break;
        case 'category':
            char = 'y';
            break;
        case 'spotanim':
            char = 't';
            break;
        case 'npc':
            char = 'n';
            break;
        case 'inv':
            char = 'v';
            break;
        case 'synth':
            char = 'P';
            break;
        case 'seq':
            char = 'A';
            break;
        case 'stat':
            char = 'S';
            break;
    }

    return char.charCodeAt(0);
}

let stats = [
    'attack', 'defence', 'strength', 'hitpoints', 'ranged', 'prayer',
    'magic', 'cooking', 'woodcutting', 'fletching', 'fishing', 'firemaking',
    'crafting', 'smithing', 'mining', 'herblore', 'agility', 'thieving',
    'stat18', 'stat19', 'runecraft'
];

function lookupParamValue(type, value) {
    if (value === 'null' && type !== ParamType.STRING) {
        return -1;
    } else if (value === 'null') {
        return '';
    }

    switch (type) {
        case ParamType.INT:
            return parseInt(value);
        case ParamType.STRING:
            return value;
        case ParamType.ENUM:
            return enumPack.indexOf(value);
        case ParamType.OBJ:
            return objPack.indexOf(value);
        case ParamType.LOC:
            return locPack.indexOf(value);
        case ParamType.COMPONENT: // may not need this on server
            return interfacePack.indexOf(value);
        case ParamType.NAMEDOBJ:
            return objPack.indexOf(value);
        case ParamType.STRUCT:
            return structPack.indexOf(value);
        case ParamType.BOOLEAN:
            return value === 'yes' ? 1 : 0;
        case ParamType.COORD:
            // TODO: return packed coord
            return -1;
        case ParamType.CATEGORY:
            return categoryPack.indexOf(value);
        case ParamType.SPOTANIM:
            return spotanimPack.indexOf(value);
        case ParamType.NPC:
            return npcPack.indexOf(value);
        case ParamType.INV:
            return invPack.indexOf(value);
        case ParamType.SYNTH:
            return soundPack.indexOf(value);
        case ParamType.SEQ:
            return seqPack.indexOf(value);
        case ParamType.STAT:
            return stats.indexOf(value);
    }

    return -1;
}

function packParam(config, dat, idx, configName) {
    let start = dat.pos;

    let type = config.find((line) => line.startsWith('type=')).substring(5);
    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'type') {
            dat.p1(1);
            dat.p1(typeToChar(value));
        } else if (key === 'default') {
            if (type === 'string') {
                dat.p1(5);
                dat.pjstr(value);
            } else {
                dat.p1(2);
                dat.p4(lookupParamValue(typeToChar(type), value));
            }
        } else if (key === 'autodisable' && value === 'no') {
            dat.p1(4);
        } else {
            console.log('config', key, 'not found');
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .param');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(paramPack.length);
    idx.p2(paramPack.length);

    let configs = [];
    loadDir('data/src/scripts', '.param', (src) => {
        let current = null;
        let config = [];

        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (current) {
                    configs[paramPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[paramPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < paramPack.length; i++) {
        if (!paramPack[i]) {
            dat.p1(0);
            idx.p2(0);
            continue;
        }

        packParam(configs[i], dat, idx, paramPack[i]);
    }

    dat.save('data/pack/server/param.dat');
    idx.save('data/pack/server/param.idx');
}
console.timeEnd('Packing .param');

console.time('Loading param.dat');
ParamType.load('data/pack/server');
console.timeEnd('Loading param.dat');

// ----

function getWearPosId(name) {
    switch (name) {
        case 'hat':
            return 0;
        case 'back':
            return 1;
        case 'front':
            return 2;
        case 'righthand':
            return 3;
        case 'torso':
            return 4;
        case 'lefthand':
            return 5;
        case 'arms':
            return 6;
        case 'legs':
            return 7;
        case 'head':
            return 8;
        case 'hands':
            return 9;
        case 'feet':
            return 10;
        case 'jaw':
            return 11;
        case 'ring':
            return 12;
        case 'quiver':
            return 13;
        default:
            console.log('Unknown wear pos', name);
            return -1;
    }
}

function packObj(config, dat, idx, configName) {
    let start = dat.pos;

    // collect these to write at the end
    let recol_s = [];
    let recol_d = [];
    let name = '';
    let params = [];

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'name') {
            name = value;
        } else if (key.startsWith('recol') && key.endsWith('s')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_s[index] = parseInt(value);
        } else if (key.startsWith('recol') && key.endsWith('d')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_d[index] = parseInt(value);
        } else if (key === 'model') {
            dat.p1(1);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'desc') {
            dat.p1(3);
            dat.pjstr(value);
        } else if (key === '2dzoom') {
            dat.p1(4);
            dat.p2(parseInt(value));
        } else if (key === '2dxan') {
            dat.p1(5);
            dat.p2(parseInt(value));
        } else if (key === '2dyan') {
            dat.p1(6);
            dat.p2(parseInt(value));
        } else if (key === '2dxof') {
            dat.p1(7);
            dat.p2(parseInt(value));
        } else if (key === '2dyof') {
            dat.p1(8);
            dat.p2(parseInt(value));
        } else if (key === 'code9' && value === 'yes') {
            dat.p1(9);
        } else if (key === 'code10') {
            dat.p1(10);
            dat.p2(seqPack.indexOf(value));
        } else if (key === 'stackable' && value === 'yes') {
            dat.p1(11);
        } else if (key === 'cost') {
            dat.p1(12);
            dat.p4(parseInt(value));
        } else if (key === 'wearpos') {
            dat.p1(13);
            dat.p1(getWearPosId(value));
        } else if (key === 'wearpos2') {
            dat.p1(14);
            dat.p1(getWearPosId(value));
        } else if (key === 'members' && value === 'yes') {
            dat.p1(16);
        } else if (key === 'manwear') {
            let parts = value.split(',');
            dat.p1(23);
            dat.p2(modelPack.indexOf(parts[0]));
            dat.p1(parseInt(parts[1]));
        } else if (key === 'manwear2') {
            dat.p1(24);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'womanwear') {
            let parts = value.split(',');
            dat.p1(25);
            dat.p2(modelPack.indexOf(parts[0]));
            dat.p1(parseInt(parts[1]));
        } else if (key === 'womanwear2') {
            dat.p1(26);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'wearpos3') {
            dat.p1(27);
            dat.p1(getWearPosId(value));
        } else if (key.startsWith('op')) {
            let index = parseInt(key.substring('op'.length)) - 1;
            dat.p1(30 + index);
            dat.pjstr(value);
        } else if (key.startsWith('iop')) {
            let index = parseInt(key.substring('iop'.length)) - 1;
            dat.p1(35 + index);
            dat.pjstr(value);
        } else if (key === 'weight') {
            let grams = 0;
            if (value.indexOf('kg') !== -1) {
                // in kg, convert to g
                grams = Number(value.substring(0, value.indexOf('kg'))) * 1000;
            } else if (value.indexOf('oz') !== -1) {
                // in oz, convert to g
                grams = Number(value.substring(0, value.indexOf('oz'))) * 28.3495;
            } else if (value.indexOf('lb') !== -1) {
                // in lb, convert to g
                grams = Number(value.substring(0, value.indexOf('lb'))) * 453.592;
            } else if (value.indexOf('g') !== -1) {
                // in g
                grams = Number(value.substring(0, value.indexOf('g')));
            }

            dat.p1(75);
            dat.p2(grams);
        } else if (key === 'manwear3') {
            dat.p1(78);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'womanwear3') {
            dat.p1(79);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'manhead') {
            dat.p1(90);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'womanhead') {
            dat.p1(91);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'manhead2') {
            dat.p1(92);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'womanhead2') {
            dat.p1(93);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'category') {
            dat.p1(94);
            dat.p2(categoryPack.indexOf(value));
        } else if (key === '2dzan') {
            dat.p1(95);
            dat.p2(parseInt(value));
        } else if (key === 'dummyitem') {
            dat.p1(96);
            dat.p1(0); // TODO: inv_only, graphic_only
        } else if (key === 'certlink') {
            dat.p1(97);
            dat.p2(objPack.indexOf(value));
        } else if (key === 'certtemplate') {
            dat.p1(98);
            dat.p2(objPack.indexOf(value));
        } else if (key.startsWith('count')) {
            let index = parseInt(key.substring('count'.length)) - 1;

            let parts = value.split(',');
            let countobj = objPack.indexOf(parts[0]);
            let countco = parseInt(parts[1]);

            dat.p1(100 + index);
            dat.p2(countobj);
            dat.p2(countco);
        } else if (key === 'tradeable' && value === 'yes') {
            dat.p1(200);
        } else if (key === 'param') {
            params.push(value.split(','));
        } else {
            console.log('config', key, 'not found');
        }
    }

    if (recol_s.length) {
        dat.p1(40);
        dat.p1(recol_s.length);

        for (let i = 0; i < recol_s.length; i++) {
            dat.p2(recol_s[i]);
            dat.p2(recol_d[i]);
        }
    }

    if (name.length) {
        dat.p1(2);
        dat.pjstr(name);
    }

    if (params.length) {
        dat.p1(249);

        dat.p1(params.length);
        for (let i = 0; i < params.length; i++) {
            let [key, value] = params[i];
            let param = ParamType.getByName(key);

            dat.p3(param.id);
            dat.pbool(param.type === 'string');

            if (param.type === 'string') {
                dat.pjstr(value);
            } else {
                dat.p4(lookupParamValue(param.type, value));
            }
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .obj');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(objPack.length);
    idx.p2(objPack.length);

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
            packObj([
                `certlink=${name.substring('cert_'.length)}`,
                `certtemplate=template_for_cert`
            ], dat, idx, name);
            continue;
        }

        packObj(configs[i], dat, idx, name);
    }

    dat.save('data/pack/server/obj.dat');
    idx.save('data/pack/server/obj.idx');
}
console.timeEnd('Packing .obj');

// ----

function packLoc(config, dat, idx, configName) {
    let start = dat.pos;

    // collect these to write at the end
    let recol_s = [];
    let recol_d = [];
    let model = null;
    let name = null;
    let desc = null;
    let forceshape = null;
    let params = [];

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'name') {
            name = value;
        } else if (key === 'desc') {
            desc = value;
        } else if (key === 'model') {
            model = value;
        } else if (key === 'forceshape') {
            forceshape = value;
        } else if (key.startsWith('recol') && key.endsWith('s')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_s[index] = parseInt(value);
        } else if (key.startsWith('recol') && key.endsWith('d')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_d[index] = parseInt(value);
        } else if (key === 'width') {
            dat.p1(14);
            dat.p1(parseInt(value));
        } else if (key === 'length') {
            dat.p1(15);
            dat.p1(parseInt(value));
        } else if (key === 'blockwalk' && value === 'no') {
            dat.p1(17);
        } else if (key === 'blockrange' && value === 'no') {
            dat.p1(18);
        } else if (key === 'active') {
            dat.p1(19);
            dat.pbool(value === 'yes');
        } else if (key === 'hillskew' && value === 'yes') {
            dat.p1(21);
        } else if (key === 'sharelight' && value === 'yes') {
            dat.p1(22);
        } else if (key === 'occlude' && value === 'yes') {
            dat.p1(23);
        } else if (key === 'anim') {
            dat.p1(24);
            dat.p2(seqPack.indexOf(value));
        } else if (key === 'hasalpha' && value === 'yes') {
            dat.p1(25);
        } else if (key === 'walloff') {
            dat.p1(28);
            dat.p1(parseInt(value));
        } else if (key === 'ambient') {
            dat.p1(29);
            dat.p1(parseInt(value));
        } else if (key === 'contrast') {
            dat.p1(39);
            dat.p1(parseInt(value));
        } else if (key.startsWith('op')) {
            let index = parseInt(key.substring('op'.length)) - 1;
            dat.p1(30 + index);
            dat.pjstr(value);
        } else if (key === 'mapfunction') {
            dat.p1(60);
            dat.p2(parseInt(value));
        } else if (key === 'mirror' && value === 'yes') {
            dat.p1(62);
        } else if (key === 'shadow' && value === 'no') {
            dat.p1(64);
        } else if (key === 'resizex') {
            dat.p1(65);
            dat.p2(parseInt(value));
        } else if (key === 'resizey') {
            dat.p1(66);
            dat.p2(parseInt(value));
        } else if (key === 'resizez') {
            dat.p1(67);
            dat.p2(parseInt(value));
        } else if (key === 'mapscene') {
            dat.p1(68);
            dat.p2(parseInt(value));
        } else if (key === 'forceapproach') {
            dat.p1(69);

            let flags = 0b1111;
            switch (value) {
                case 'north':
                    flags &= ~0b0001;
                    break;
                case 'east':
                    flags &= ~0b0010;
                    break;
                case 'south':
                    flags &= ~0b0100;
                    break;
                case 'west':
                    flags &= ~0b1000;
                    break;
            }

            dat.p1(flags);
        } else if (key === 'xoff') {
            dat.p1(70);
            dat.p2(parseInt(value));
        } else if (key === 'yoff') {
            dat.p1(71);
            dat.p2(parseInt(value));
        } else if (key === 'zoff') {
            dat.p1(72);
            dat.p2(parseInt(value));
        } else if (key === 'forcedecor' && value === 'yes') {
            dat.p1(73);
        } else if (key === 'category') {
            dat.p1(200);
            dat.p2(categoryPack.indexOf(value));
        } else if (key === 'param') {
            params.push(value.split(','));
        }
    }

    if (recol_s.length) {
        dat.p1(40);
        dat.p1(recol_s.length);

        for (let i = 0; i < recol_s.length; i++) {
            dat.p2(recol_s[i]);
            dat.p2(recol_d[i]);
        }
    }

    if (forceshape) {
        dat.p1(1);

        let modelName = model;
        switch (forceshape) {
            case 'wall_straight':
                modelName += '_1';
                break;
            case 'wall_diagonalcorner':
                modelName += '_2';
                break;
            case 'wall_l':
                modelName += '_3';
                break;
            case 'wall_squarecorner':
                modelName += '_4';
                break;
            case 'wall_diagonal':
                modelName += '_5';
                break;
            case 'walldecor_straight_nooffset':
                modelName += '_q';
                break;
            case 'walldecor_straight_offset':
                modelName += '_w';
                break;
            case 'walldecor_diagonal_offset':
                modelName += '_e';
                break;
            case 'walldecor_diagonal_nooffset':
                modelName += '_r';
                break;
            case 'walldecor_diagonal_both':
                modelName += '_t';
                break;
            case 'centrepiece_straight':
                // modelName += '_8';
                break;
            case 'centrepiece_diagonal':
                modelName += '_9';
                break;
            case 'grounddecor':
                modelName += '_0';
                break;
            case 'roof_straight':
                modelName += '_a';
                break;
            case 'roof_diagonal_with_roofedge':
                modelName += '_s';
                break;
            case 'roof_diagonal':
                modelName += '_d';
                break;
            case 'roof_l_concave':
                modelName += '_f';
                break;
            case 'roof_l_convex':
                modelName += '_g';
                break;
            case 'roof_flat':
                modelName += '_h';
                break;
            case 'roofedge_straight':
                modelName += '_z';
                break;
            case 'roofedge_diagonalcorner':
                modelName += '_x';
                break;
            case 'roofedge_l':
                modelName += '_c';
                break;
            case 'roofedge_squarecorner':
                modelName += '_v';
                break;
        }

        dat.p1(1); // length
        dat.p2(modelPack.indexOf(modelName)); // model
        dat.p1(10); // shape (overriding to centrepiece_straight)
    } else if (model) {
        dat.p1(1);

        let models = [];

        // centrepiece_straight
        let index = modelPack.indexOf(model); // default
        if (index != -1) {
            models.push({ index, shape: 10 });
        }

        // wall_straight
        index = modelPack.indexOf(`${model}_1`);
        if (index != -1) {
            models.push({ index, shape: 0 });
        }

        // wall_diagonalcorner
        index = modelPack.indexOf(`${model}_2`);
        if (index != -1) {
            models.push({ index, shape: 1 });
        }

        // wall_l
        index = modelPack.indexOf(`${model}_3`);
        if (index != -1) {
            models.push({ index, shape: 2 });
        }

        // wall_squarecorner
        index = modelPack.indexOf(`${model}_4`);
        if (index != -1) {
            models.push({ index, shape: 3 });
        }

        // wall_diagonal
        index = modelPack.indexOf(`${model}_5`);
        if (index != -1) {
            models.push({ index, shape: 9 });
        }

        // walldecor_straight_nooffset
        index = modelPack.indexOf(`${model}_q`);
        if (index != -1) {
            models.push({ index, shape: 4 });
        }

        // walldecor_straight_offset
        index = modelPack.indexOf(`${model}_w`);
        if (index != -1) {
            models.push({ index, shape: 5 });
        }

        // walldecor_diagonal_nooffset
        index = modelPack.indexOf(`${model}_r`);
        if (index != -1) {
            models.push({ index, shape: 6 });
        }

        // walldecor_diagonal_offset
        index = modelPack.indexOf(`${model}_e`);
        if (index != -1) {
            models.push({ index, shape: 7 });
        }

        // walldecor_diagonal_both
        index = modelPack.indexOf(`${model}_t`);
        if (index != -1) {
            models.push({ index, shape: 8 });
        }

        // centrepiece_diagonal
        index = modelPack.indexOf(`${model}_9`);
        if (index != -1) {
            models.push({ index, shape: 11 });
        }

        // roof_straight
        index = modelPack.indexOf(`${model}_a`);
        if (index != -1) {
            models.push({ index, shape: 12 });
        }

        // roof_diagonal_with_roofedge
        index = modelPack.indexOf(`${model}_s`);
        if (index != -1) {
            models.push({ index, shape: 13 });
        }

        // roof_diagonal
        index = modelPack.indexOf(`${model}_d`);
        if (index != -1) {
            models.push({ index, shape: 14 });
        }

        // roof_l_concave
        index = modelPack.indexOf(`${model}_f`);
        if (index != -1) {
            models.push({ index, shape: 15 });
        }

        // roof_l_convex
        index = modelPack.indexOf(`${model}_g`);
        if (index != -1) {
            models.push({ index, shape: 16 });
        }

        // roof_flat
        index = modelPack.indexOf(`${model}_h`);
        if (index != -1) {
            models.push({ index, shape: 17 });
        }

        // roofedge_straight
        index = modelPack.indexOf(`${model}_z`);
        if (index != -1) {
            models.push({ index, shape: 18 });
        }

        // roofedge_diagonalcorner
        index = modelPack.indexOf(`${model}_x`);
        if (index != -1) {
            models.push({ index, shape: 19 });
        }

        // roofedge_l
        index = modelPack.indexOf(`${model}_c`);
        if (index != -1) {
            models.push({ index, shape: 20 });
        }

        // roofedge_squarecorner
        index = modelPack.indexOf(`${model}_v`);
        if (index != -1) {
            models.push({ index, shape: 21 });
        }

        // grounddecor
        index = modelPack.indexOf(`${model}_0`);
        if (index != -1) {
            models.push({ index, shape: 22 });
        }

        dat.p1(models.length);
        for (let i = 0; i < models.length; i++) {
            dat.p2(models[i].index);
            dat.p1(models[i].shape);
        }
    }

    if (name) {
        dat.p1(2);
        dat.pjstr(name);
    }

    if (desc) {
        dat.p1(3);
        dat.pjstr(desc);
    }

    if (params.length) {
        dat.p1(249);

        dat.p1(params.length);
        for (let i = 0; i < params.length; i++) {
            let [key, value] = params[i];
            let param = ParamType.getByName(key);

            dat.p3(param.id);
            dat.pbool(param.type === 'string');

            if (param.type === 'string') {
                dat.pjstr(value);
            } else {
                dat.p4(lookupParamValue(param.type, value));
            }
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .loc');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(locPack.length);
    idx.p2(locPack.length);

    let configs = [];
    loadDir('data/src/scripts', '.loc', (src) => {
        let current = null;
        let config = [];

        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (current) {
                    configs[locPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[locPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < locPack.length; i++) {
        packLoc(configs[i], dat, idx, locPack[i]);
    }

    dat.save('data/pack/server/loc.dat');
    idx.save('data/pack/server/loc.idx');
}
console.timeEnd('Packing .loc');

// ----

function packNpc(config, dat, idx, configName) {
    let start = dat.pos;

    // collect these to write at the end
    let recol_s = [];
    let recol_d = [];
    let name = '';
    let models = [];
    let heads = [];
    let params = [];

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'name') {
            name = value;
        } else if (key.startsWith('model')) {
            let index = parseInt(key.substring('model'.length)) - 1;
            models[index] = modelPack.indexOf(value);
        } else if (key.startsWith('head')) {
            let index = parseInt(key.substring('head'.length)) - 1;
            heads[index] = modelPack.indexOf(value);
        } else if (key.startsWith('recol') && key.endsWith('s')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_s[index] = parseInt(value);
        } else if (key.startsWith('recol') && key.endsWith('d')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_d[index] = parseInt(value);
        } else if (key === 'desc') {
            dat.p1(3);
            dat.pjstr(value);
        } else if (key === 'size') {
            dat.p1(12);
            dat.p1(parseInt(value));
        } else if (key === 'readyanim') {
            dat.p1(13);
            dat.p2(seqPack.indexOf(value));
        } else if (key === 'walkanim') {
            dat.p1(14);
            dat.p2(seqPack.indexOf(value));
        } else if (key === 'hasalpha' && value === 'yes') {
            dat.p1(16);
        } else if (key === 'walkanims') {
            dat.p1(17);

            let anims = value.split(',');
            dat.p2(seqPack.indexOf(anims[0]));
            dat.p2(seqPack.indexOf(anims[1]));
            dat.p2(seqPack.indexOf(anims[2]));
            dat.p2(seqPack.indexOf(anims[3]));
        } else if (key === 'category') {
            dat.p1(18);
            dat.p2(categoryPack.indexOf(value));
        } else if (key.startsWith('op')) {
            let index = parseInt(key.substring('op'.length)) - 1;
            dat.p1(30 + index);
            dat.pjstr(value);
        } else if (key === 'code90') {
            dat.p1(90);
            dat.p2(parseInt(value));
        } else if (key === 'code91') {
            dat.p1(91);
            dat.p2(parseInt(value));
        } else if (key === 'code92') {
            dat.p1(92);
            dat.p2(parseInt(value));
        } else if (key === 'visonmap' && value === 'no') {
            dat.p1(93);
        } else if (key === 'vislevel') {
            dat.p1(95);
            dat.p2(parseInt(value));
        } else if (key === 'resizeh') {
            dat.p1(97);
            dat.p2(parseInt(value));
        } else if (key === 'resizev') {
            dat.p1(98);
            dat.p2(parseInt(value));
        } else if (key === 'param') {
            params.push(value.split(','));
        }
    }

    if (recol_s.length) {
        dat.p1(40);
        dat.p1(recol_s.length);

        for (let i = 0; i < recol_s.length; i++) {
            dat.p2(recol_s[i]);
            dat.p2(recol_d[i]);
        }
    }

    if (name.length) {
        dat.p1(2);
        dat.pjstr(name);
    }

    if (models.length) {
        dat.p1(1);
        dat.p1(models.length);

        for (let i = 0; i < models.length; i++) {
            dat.p2(models[i]);
        }
    }

    if (heads.length) {
        dat.p1(60);
        dat.p1(heads.length);

        for (let i = 0; i < heads.length; i++) {
            dat.p2(heads[i]);
        }
    }

    if (params.length) {
        dat.p1(249);

        dat.p1(params.length);
        for (let i = 0; i < params.length; i++) {
            let [key, value] = params[i];
            let param = ParamType.getByName(key);

            dat.p3(param.id);
            dat.pbool(param.type === 'string');

            if (param.type === 'string') {
                dat.pjstr(value);
            } else {
                dat.p4(lookupParamValue(param.type, value));
            }
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .npc');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(npcPack.length);
    idx.p2(npcPack.length);

    let configs = [];
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
                    configs[npcPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[npcPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < npcPack.length; i++) {
        packNpc(configs[i], dat, idx, npcPack[i]);
    }

    dat.save('data/pack/server/npc.dat');
    idx.save('data/pack/server/npc.idx');
}
console.timeEnd('Packing .npc');

// ----

function packVarp(config, dat, idx, configName) {
    let start = dat.pos;

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'clientcode') {
            dat.p1(5);
            dat.p2(parseInt(value));
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .varp');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(varpPack.length);
    idx.p2(varpPack.length);

    let configs = [];
    loadDir('data/src/scripts', '.varp', (src) => {
        let current = null;
        let config = [];

        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (current) {
                    configs[varpPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[varpPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < varpPack.length; i++) {
        packVarp(configs[i], dat, idx, varpPack[i]);
    }

    dat.save('data/pack/server/varp.dat');
    idx.save('data/pack/server/varp.idx');
}
console.timeEnd('Packing .varp');

// ---- the ones below we primarily pack for names

function packSeq(config, dat, idx, configName) {
    let start = dat.pos;

    // collect these to write at the end
    let frames = [];
    let iframes = [];
    let delays = [];

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key.startsWith('frame')) {
            let index = parseInt(key.substring('frame'.length)) - 1;
            frames[index] = value;
        } else if (key.startsWith('iframe')) {
            let index = parseInt(key.substring('iframe'.length)) - 1;
            iframes[index] = value;
        } else if (key.startsWith('delay')) {
            let index = parseInt(key.substring('delay'.length)) - 1;
            delays[index] = parseInt(value);
        } else if (key === 'replayoff') {
            dat.p1(2);
            dat.p2(parseInt(value));
        } else if (key === 'walkmerge') {
            dat.p1(3);

            let labels = value.split(',');
            dat.p1(labels.length);

            for (let i = 0; i < labels.length; i++) {
                // not tracking labels by name currently
                let label = parseInt(labels[i].substring(labels[i].indexOf('_') + 1));
                dat.p1(label);
            }
        } else if (key === 'stretches' && value === 'yes') {
            dat.p1(4);
        } else if (key === 'priority') {
            dat.p1(5);
            dat.p1(parseInt(value));
        } else if (key === 'mainhand') {
            dat.p1(6);

            if (value !== 'hide') {
                let obj = objPack.indexOf(value);
                if (obj == -1) {
                    console.error('Missing mainhand', id, value);
                }
                dat.p2(obj + 512);
            } else {
                dat.p2(0);
            }
        } else if (key === 'offhand') {
            dat.p1(7);

            if (value !== 'hide') {
                let obj = objPack.indexOf(value);
                if (obj == -1) {
                    console.error('Missing offhand', id, value);
                }
                dat.p2(obj + 512);
            } else {
                dat.p2(0);
            }
        } else if (key === 'replaycount') {
            dat.p1(8);
            dat.p1(parseInt(value));
        }
    }

    if (frames.length) {
        dat.p1(1);

        dat.p1(frames.length);
        for (let i = 0; i < frames.length; i++) {
            let frame = animPack.indexOf(frames[i]);
            dat.p2(frame);

            if (typeof iframes[i] !== 'undefined') {
                let iframe = animPack.indexOf(iframes[i]);
                dat.p2(iframe);
            } else {
                dat.p2(-1);
            }

            if (typeof delays[i] !== 'undefined') {
                dat.p2(delays[i]);
            } else {
                dat.p2(0);
            }
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .seq');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(seqPack.length);
    idx.p2(seqPack.length);

    let configs = [];
    loadDir('data/src/scripts', '.seq', (src) => {
        let current = null;
        let config = [];

        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (current) {
                    configs[seqPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[seqPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < seqPack.length; i++) {
        packSeq(configs[i], dat, idx, seqPack[i]);
    }

    dat.save('data/pack/server/seq.dat');
    idx.save('data/pack/server/seq.idx');
}
console.timeEnd('Packing .seq');

// ----

function packSpotanim(config, dat, idx, configName) {
    let start = dat.pos;

    // collect these to write at the end
    let recol_s = [];
    let recol_d = [];

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'model') {
            dat.p1(1);
            dat.p2(modelPack.indexOf(value));
        } else if (key === 'anim') {
            dat.p1(2);
            dat.p2(seqPack.indexOf(value));
        } else if (key === 'hasalpha' && value === 'yes') {
            dat.p1(3);
        } else if (key === 'resizeh') {
            dat.p1(4);
            dat.p2(parseInt(value));
        } else if (key === 'resizev') {
            dat.p1(5);
            dat.p2(parseInt(value));
        } else if (key === 'orientation') {
            dat.p1(6);
            dat.p2(parseInt(value));
        } else if (key === 'ambient') {
            dat.p1(7);
            dat.p1(parseInt(value));
        } else if (key === 'contrast') {
            dat.p1(8);
            dat.p1(parseInt(value));
        } else if (key.startsWith('recol') && key.endsWith('s')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_s[index] = parseInt(value);
        } else if (key.startsWith('recol') && key.endsWith('d')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_d[index] = parseInt(value);
        }
    }

    for (let i = 0; i < recol_s.length; i++) {
        dat.p1(40 + i);
        dat.p2(recol_s[i]);

        dat.p1(50 + i);
        dat.p2(recol_d[i]);
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .spotanim');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(spotanimPack.length);
    idx.p2(spotanimPack.length);

    let configs = [];
    loadDir('data/src/scripts', '.spotanim', (src) => {
        let current = null;
        let config = [];

        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (current) {
                    configs[spotanimPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[spotanimPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < spotanimPack.length; i++) {
        packSpotanim(configs[i], dat, idx, spotanimPack[i]);
    }

    dat.save('data/pack/server/spotanim.dat');
    idx.save('data/pack/server/spotanim.idx');
}
console.timeEnd('Packing .spotanim');

// ----

function packFlo(config, dat, idx, name) {
    let start = dat.pos;

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key === 'rgb') {
            dat.p1(1);
            dat.p3(parseInt(value, 16));
        } else if (key === 'texture') {
            dat.p1(2);
            dat.p1(texturePack.indexOf(value));
        } else if (key === 'overlay' && value === 'yes') {
            dat.p1(3);
        } else if (key === 'occlude' && value === 'no') {
            dat.p1(5);
        }
    }

    dat.p1(6);
    dat.pjstr(name);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .flo');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(floPack.length);
    idx.p2(floPack.length);

    let configs = [];
    loadDir('data/src/scripts', '.flo', (src) => {
        let current = null;
        let config = [];

        for (let i = 0; i < src.length; i++) {
            let line = src[i];
            if (line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (current) {
                    configs[floPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[floPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < floPack.length; i++) {
        packFlo(configs[i], dat, idx, floPack[i]);
    }

    dat.save('data/pack/server/flo.dat');
    idx.save('data/pack/server/flo.idx');
}
console.timeEnd('Packing .flo');

// ----

function packIdk(config, dat, idx, configName) {
    let start = dat.pos;

    // collect these to write at the end
    let recol_s = [];
    let recol_d = [];
    let models = [];
    let heads = [];

    for (let i = 0; i < config.length; i++) {
        let line = config[i];
        let key = line.substring(0, line.indexOf('='));
        let value = line.substring(line.indexOf('=') + 1);

        if (key.startsWith('model')) {
            let index = parseInt(key.substring('model'.length)) - 1;
            models[index] = modelPack.indexOf(value);
        } else if (key.startsWith('head')) {
            let index = parseInt(key.substring('head'.length)) - 1;
            heads[index] = modelPack.indexOf(value);
        } else if (key.startsWith('recol') && key.endsWith('s')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_s[index] = parseInt(value);
        } else if (key.startsWith('recol') && key.endsWith('d')) {
            let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
            recol_d[index] = parseInt(value);
        } else if (key === 'type') {
            dat.p1(1);

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

            dat.p1(bodypart);
        } else if (key === 'disable' && value === 'yes') {
            dat.p1(3);
        }
    }

    if (recol_s.length) {
        for (let i = 0; i < recol_s.length; i++) {
            dat.p1(40 + i);
            dat.p2(recol_s[i]);
        }
    }

    if (recol_d.length) {
        for (let i = 0; i < recol_d.length; i++) {
            dat.p1(50 + i);
            dat.p2(recol_d[i]);
        }
    }

    if (heads.length) {
        for (let i = 0; i < heads.length; i++) {
            dat.p1(60 + i);
            dat.p2(heads[i]);
        }
    }

    if (models.length) {
        dat.p1(2);
        dat.p1(models.length);

        for (let i = 0; i < models.length; i++) {
            dat.p2(models[i]);
        }
    }

    dat.p1(250);
    dat.pjstr(configName);

    dat.p1(0);
    idx.p2(dat.pos - start);
}

console.time('Packing .idk');
{
    let dat = new Packet();
    let idx = new Packet();

    dat.p2(idkPack.length);
    idx.p2(idkPack.length);

    let configs = [];
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
                    configs[idkPack.indexOf(current)] = config;
                }

                current = line.substring(1, line.length - 1);
                config = [];
                continue;
            }

            config.push(line);
        }

        if (current) {
            configs[idkPack.indexOf(current)] = config;
        }
    });

    for (let i = 0; i < idkPack.length; i++) {
        packIdk(configs[i], dat, idx, idkPack[i]);
    }

    dat.save('data/pack/server/idk.dat');
    idx.save('data/pack/server/idk.idx');
}
console.timeEnd('Packing .idk');
