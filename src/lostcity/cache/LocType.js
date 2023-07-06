import { loadDir, loadPack } from '#lostcity/tools/pack/NameMap.js';

let modelPack = loadPack('data/pack/model.pack');

let locPack = loadPack('data/pack/loc.pack');
let seqPack = loadPack('data/pack/seq.pack');

export default class LocType {
    static configs = [];

    static init() {
        // reading
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
                        let id = locPack.indexOf(current);
                        LocType.configs[id] = config;
                    }

                    current = line.substring(1, line.length - 1);
                    config = [];
                    continue;
                }

                config.push(line);
            }

            if (current) {
                let id = locPack.indexOf(current);
                LocType.configs[id] = config;
            }
        });

        // parsing
        for (let i = 0; i < LocType.configs.length; i++) {
            let lines = LocType.configs[i];

            let model = null;
            let forceshape = null;
            let active = -1;

            let config = new LocType();
            config.id = i;
            config.config = locPack[i];

            for (let j = 0; j < lines.length; j++) {
                let line = lines[j];
                let key = line.substring(0, line.indexOf('='));
                let value = line.substring(line.indexOf('=') + 1);

                if (key === 'name') {
                    config.name = value;
                } else if (key === 'desc') {
                    config.desc = value;
                } else if (key === 'model') {
                    model = value;
                } else if (key === 'forceshape') {
                    forceshape = value;
                } else if (key.startsWith('recol') && key.endsWith('s')) {
                    let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                    config.recol_s[index] = parseInt(value);
                } else if (key.startsWith('recol') && key.endsWith('d')) {
                    let index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                    config.recol_d[index] = parseInt(value);
                } else if (key === 'width') {
                    config.width = parseInt(value);
                } else if (key === 'length') {
                    config.length = parseInt(value);
                } else if (key === 'blockwalk' && value === 'no') {
                    config.blockwalk = false;
                } else if (key === 'blockrange' && value === 'no') {
                    config.blockrange = false;
                } else if (key === 'active') {
                    active = value === 'yes' ? 1 : 0;
                } else if (key === 'hillskew' && value === 'yes') {
                    config.hillskew = true;
                } else if (key === 'sharelight' && value === 'yes') {
                    config.sharelight = true;
                } else if (key === 'occlude' && value === 'yes') {
                    config.occlude = true;
                } else if (key === 'anim') {
                    config.anim = seqPack.indexOf(value);
                } else if (key === 'hasalpha' && value === 'yes') {
                    config.hasalpha = true;
                } else if (key === 'walloff') {
                    config.walloff = parseInt(value);
                } else if (key === 'ambient') {
                    config.ambient = parseInt(value);
                } else if (key === 'contrast') {
                    config.contrast = parseInt(value);
                } else if (key.startsWith('op')) {
                    let index = parseInt(key.substring('op'.length)) - 1;
                    config.ops[index] = value;
                } else if (key === 'mapfunction') {
                    config.mapfunction = parseInt(value);
                } else if (key === 'mirror' && value === 'yes') {
                    config.mirror = true;
                } else if (key === 'shadow' && value === 'no') {
                    config.shadow = false;
                } else if (key === 'resizex') {
                    config.resizex = parseInt(value);
                } else if (key === 'resizey') {
                    config.resizey = parseInt(value);
                } else if (key === 'resizez') {
                    config.resizez = parseInt(value);
                } else if (key === 'mapscene') {
                    config.mapscene = parseInt(value);
                } else if (key === 'forceapproach') {
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

                    config.forceapproach = flags;
                } else if (key === 'xoff') {
                    config.xoff = parseInt(value);
                } else if (key === 'yoff') {
                    config.yoff = parseInt(value);
                } else if (key === 'zoff') {
                    config.zoff = parseInt(value);
                } else if (key === 'forcedecor' && value === 'yes') {
                    config.forcedecor = true;
                }
            }

            if (forceshape) {
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

                let index = modelPack.indexOf(modelName);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(10);
                }
            } else if (model) {
                // centrepiece_straight
                let index = modelPack.indexOf(model); // default
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(10);
                }

                // wall_straight
                index = modelPack.indexOf(`${model}_1`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(0);
                }

                // wall_diagonalcorner
                index = modelPack.indexOf(`${model}_2`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(1);
                }

                // wall_l
                index = modelPack.indexOf(`${model}_3`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(2);
                }

                // wall_squarecorner
                index = modelPack.indexOf(`${model}_4`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(3);
                }

                // wall_diagonal
                index = modelPack.indexOf(`${model}_5`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(9);
                }

                // walldecor_straight_nooffset
                index = modelPack.indexOf(`${model}_q`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(4);
                }

                // walldecor_straight_offset
                index = modelPack.indexOf(`${model}_w`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(5);
                }

                // walldecor_diagonal_nooffset
                index = modelPack.indexOf(`${model}_r`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(6);
                }

                // walldecor_diagonal_offset
                index = modelPack.indexOf(`${model}_e`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(7);
                }

                // walldecor_diagonal_both
                index = modelPack.indexOf(`${model}_t`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(8);
                }

                // centrepiece_diagonal
                index = modelPack.indexOf(`${model}_9`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(11);
                }

                // roof_straight
                index = modelPack.indexOf(`${model}_a`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(12);
                }

                // roof_diagonal_with_roofedge
                index = modelPack.indexOf(`${model}_s`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(13);
                }

                // roof_diagonal
                index = modelPack.indexOf(`${model}_d`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(14);
                }

                // roof_l_concave
                index = modelPack.indexOf(`${model}_f`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(15);
                }

                // roof_l_convex
                index = modelPack.indexOf(`${model}_g`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(16);
                }

                // roof_flat
                index = modelPack.indexOf(`${model}_h`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(17);
                }

                // roofedge_straight
                index = modelPack.indexOf(`${model}_z`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(18);
                }

                // roofedge_diagonalcorner
                index = modelPack.indexOf(`${model}_x`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(19);
                }

                // roofedge_l
                index = modelPack.indexOf(`${model}_c`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(20);
                }

                // roofedge_squarecorner
                index = modelPack.indexOf(`${model}_v`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(21);
                }

                // grounddecor
                index = modelPack.indexOf(`${model}_0`);
                if (index != -1) {
                    config.models.push(index);
                    config.shapes.push(22);
                }
            }

            if (active === -1) {
                config.active = config.shapes.length > 0 && config.shapes[0] == 10;

                if (config.ops.length) {
                    config.active = true;
                }
            }

            LocType.configs[i] = config;
        }
    }

    static get(id) {
        return LocType.configs[id];
    }

    static getId(name) {
        return locPack.indexOf(name);
    }

    static getByName(name) {
        let id = this.getId(name);
        if (id === -1) {
            return null;
        }

        return this.get(id);
    }

    // ----

    models = [];
    shapes = [];
    name = null;
    desc = null;
    recol_s = [];
    recol_d = [];
    width = 1;
    length = 1;
    blockwalk = true;
    blockrange = true;
    active = false;
    hillskew = false;
    sharelight = false;
    occlude = false;
    anim = -1;
    hasalpha = false;
    walloff = 16;
    ambient = 0;
    contrast = 0;
    ops = [];
    mapfunction = -1;
    mapscene = -1;
    mirror = false;
    shadow = true;
    resizex = 128;
    resizey = 128;
    resizez = 128;
    forceapproach = 0;
    xoff = 0;
    yoff = 0;
    zoff = 0;
    forcedecor = false;
}

console.time('LocType.init()');
LocType.init();
console.timeEnd('LocType.init()');
