import Packet from '#jagex2/io/Packet.js';

import ParamType from '#lostcity/cache/ParamType.js';
import ScriptVarType from '#lostcity/cache/ScriptVarType.js';

import { LocModelShape, ConfigValue, ConfigLine, ParamValue } from '#lostcity/tools/packconfig/PackShared.js';
import { lookupParamValue } from '#lostcity/tools/packconfig/ParamConfig.js';
import { CategoryPack, LocPack, ModelPack, SeqPack } from '#lostcity/util/PackFile.js';

// these suffixes are simply the map editor keybinds
enum LocShapeSuffix {
    _1 = 0, // wall_straight
    _2 = 1, // wall_diagonalcorner
    _3 = 2, // wall_l
    _4 = 3, // wall_squarecorner
    _q = 4, // walldecor_straight_nooffset
    _5 = 9, // wall_diagonal
    _w = 5, // walldecor_straight_offset
    _r = 6, // walldecor_diagonal_offset
    _e = 7, // walldecor_diagonal_nooffset
    _t = 8, // walldecor_diagonal_both
    _8 = 10, // centrepiece_straight
    _9 = 11, // centrepiece_diagonal
    _0 = 22, // grounddecor
    _a = 12, // roof_straight
    _s = 13, // roof_diagonal_with_roofedge
    _d = 14, // roof_diagonal
    _f = 15, // roof_l_concave
    _g = 16, // roof_l_convex
    _h = 17, // roof_flat
    _z = 18, // roofedge_straight
    _x = 19, // roofedge_diagonalcorner
    _c = 20, // roofedge_l
    _v = 21 // roofedge_squarecorner
}

export function parseLocConfig(key: string, value: string): ConfigValue | null | undefined {
    // prettier-ignore
    const stringKeys = [
        'name', 'desc',
        'op1', 'op2', 'op3', 'op4', 'op5'
    ];
    // prettier-ignore
    const numberKeys = [
        'width', 'length',
        'recol1s', 'recol1d', 'recol2s', 'recol2d', 'recol3s', 'recol3d', 'recol4s', 'recol4d', 'recol5s', 'recol5d', 'recol6s', 'recol6d',
        'wallwidth',
        'ambient', 'contrast',
        'mapfunction',
        'resizex', 'resizey', 'resizez',
        'mapscene',
        'offsetx', 'offsety', 'offsetz'
    ];
    // prettier-ignore
    const booleanKeys = [
        'blockwalk', 'blockrange',
        'active', 'hillskew', 'sharelight', 'occlude',
        'hasalpha',
        'mirror', 'shadow',
        'forcedecor'
    ];

    if (stringKeys.includes(key)) {
        if (value.length > 1000) {
            // arbitrary limit
            return null;
        }

        return value;
    } else if (numberKeys.includes(key)) {
        let number;
        if (value.startsWith('0x')) {
            // check that the string contains only hexadecimal characters, and minus sign if applicable
            if (!/^-?[0-9a-fA-F]+$/.test(value.slice(2))) {
                return null;
            }

            number = parseInt(value, 16);
        } else {
            // check that the string contains only numeric characters, and minus sign if applicable
            if (!/^-?[0-9]+$/.test(value)) {
                return null;
            }

            number = parseInt(value);
        }

        if (Number.isNaN(number)) {
            return null;
        }

        if ((key === 'width' || key === 'length') && (number < 1 || number > 255)) {
            return null;
        }

        if (key.startsWith('recol') && (number < 0 || number > 65535)) {
            return null;
        }

        if (key === 'wallwidth' && (number < 0 || number > 32 || number % 8 !== 0)) {
            return null;
        }

        if ((key === 'ambient' || key === 'contrast') && (number < -128 || number > 127)) {
            return null;
        }

        if (key === 'mapfunction' && (number < 0 || number > 50)) {
            return null;
        }

        if ((key === 'resizex' || key === 'resizey' || key === 'resizez') && (number < 0 || number > 512)) {
            return null;
        }

        if (key === 'mapscene' && (number < 0 || number > 50)) {
            return null;
        }

        return number;
    } else if (booleanKeys.includes(key)) {
        if (value !== 'yes' && value !== 'no') {
            return null;
        }

        return value === 'yes';
    } else if (key === 'model') {
        // models are unique in locs, they may specify a model key to match against for a supported shapes
        const models: LocModelShape[] = [];

        // if a model matches directly, we know that they want to make another suffix act like _8
        let model = ModelPack.getByName(value);
        if (model !== -1) {
            models.push({ model, shape: LocShapeSuffix._8 });
            return models;
        }

        // if it doesn't match, we'll have to lookup all model suffixes to see what's supported
        // this shape (centrepiece_default) comes first in their check, so we do it separately
        model = ModelPack.getByName(value + '_8');
        if (model !== -1) {
            models.push({ model, shape: LocShapeSuffix._8 });
        }
        for (let i = 0; i <= 22; i++) {
            if (i === 10) {
                continue;
            }

            model = ModelPack.getByName(value + LocShapeSuffix[i]);
            if (model !== -1) {
                models.push({ model, shape: i });
            }
        }

        if (models.length > 0) {
            return models;
        }

        return null;
    } else if (key === 'category') {
        const index = CategoryPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index;
    } else if (key === 'anim') {
        const index = SeqPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index;
    } else if (key === 'param') {
        const paramKey = value.substring(0, value.indexOf(','));
        const param = ParamType.getByName(paramKey);
        if (!param) {
            return null;
        }

        const paramValue = lookupParamValue(param.type, value.substring(value.indexOf(',') + 1));
        if (paramValue === null) {
            return null;
        }

        return {
            id: param.id,
            type: param.type,
            value: paramValue
        };
    } else if (key === 'forceapproach') {
        let flags = 0b1111;
        switch (value) {
            case 'top':
                flags &= ~0b0001;
                break;
            case 'right':
                flags &= ~0b0010;
                break;
            case 'bottom':
                flags &= ~0b0100;
                break;
            case 'left':
                flags &= ~0b1000;
                break;
        }
        return flags;
    } else {
        return undefined;
    }
}

function packLocConfig(configs: Map<string, ConfigLine[]>, transmitAll: boolean) {
    const dat = new Packet();
    const idx = new Packet();
    dat.p2(LocPack.size);
    idx.p2(LocPack.size);

    for (let i = 0; i < LocPack.size; i++) {
        const debugname = LocPack.getById(i);
        const config = configs.get(debugname)!;

        const start = dat.pos;

        // collect these to write at the end
        const recol_s: number[] = [];
        const recol_d: number[] = [];
        let models: LocModelShape[] = [];
        let name: string | null = null;
        let active: number = -1; // not written last, but affects name output
        let desc: string | null = null;
        const params: ParamValue[] = [];

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'name') {
                name = value as string;
            } else if (key === 'desc') {
                desc = value as string;
            } else if (key === 'model') {
                models = value as LocModelShape[];
            } else if (key.startsWith('recol')) {
                const index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                if (key.endsWith('s')) {
                    recol_s[index] = value as number;
                } else {
                    recol_d[index] = value as number;
                }
            } else if (key === 'param') {
                params.push(value as ParamValue);
            } else if (key === 'width') {
                dat.p1(14);
                dat.p1(value as number);
            } else if (key === 'length') {
                dat.p1(15);
                dat.p1(value as number);
            } else if (key === 'blockwalk') {
                if (value === false) {
                    dat.p1(17);
                }
            } else if (key === 'blockrange') {
                if (value === false) {
                    dat.p1(18);
                }
            } else if (key === 'active') {
                dat.p1(19);
                dat.pbool(value as boolean);
                active = value ? 1 : 0;
            } else if (key === 'hillskew') {
                if (value === true) {
                    dat.p1(21);
                }
            } else if (key === 'sharelight') {
                if (value === true) {
                    dat.p1(22);
                }
            } else if (key === 'occlude') {
                if (value === true) {
                    dat.p1(23);
                }
            } else if (key === 'anim') {
                dat.p1(24);
                dat.p2(value as number);
            } else if (key === 'hasalpha') {
                if (value === true) {
                    dat.p1(25);
                }
            } else if (key === 'wallwidth') {
                dat.p1(28);
                dat.p1(value as number);
            } else if (key === 'ambient') {
                dat.p1(29);
                dat.p1(value as number);
            } else if (key === 'contrast') {
                dat.p1(39);
                dat.p1(value as number);
            } else if (key.startsWith('op')) {
                const index = parseInt(key.substring('op'.length)) - 1;
                dat.p1(30 + index);
                dat.pjstr(value as string);
            } else if (key === 'mapfunction') {
                dat.p1(60);
                dat.p2(value as number);
            } else if (key === 'mirror') {
                if (value === true) {
                    dat.p1(62);
                }
            } else if (key === 'shadow') {
                if (value === false) {
                    dat.p1(64);
                }
            } else if (key === 'resizex') {
                dat.p1(65);
                dat.p2(value as number);
            } else if (key === 'resizey') {
                dat.p1(66);
                dat.p2(value as number);
            } else if (key === 'resizez') {
                dat.p1(67);
                dat.p2(value as number);
            } else if (key === 'mapscene') {
                dat.p1(68);
                dat.p2(value as number);
            } else if (key === 'forceapproach') {
                dat.p1(69);
                dat.p1(value as number);
            } else if (key === 'offsetx') {
                dat.p1(70);
                dat.p2(value as number);
            } else if (key === 'offsety') {
                dat.p1(71);
                dat.p2(value as number);
            } else if (key === 'offsetz') {
                dat.p1(72);
                dat.p2(value as number);
            } else if (key === 'forcedecor') {
                if (value === true) {
                    dat.p1(73);
                }
            } else if (key === 'category') {
                if (transmitAll === true) {
                    dat.p1(200);
                    dat.p2(value as number);
                }
            }
        }

        if (recol_s.length > 0) {
            dat.p1(40);
            dat.p1(recol_s.length);

            for (let k = 0; k < recol_s.length; k++) {
                dat.p2(recol_s[k]);
                dat.p2(recol_d[k]);
            }
        }

        if (models.length > 0) {
            dat.p1(1);

            dat.p1(models.length);
            for (let k = 0; k < models.length; k++) {
                dat.p2(models[k].model);
                dat.p1(models[k].shape);
            }
        }

        if (name === null && active !== 0) {
            // edge case: a loc has no name= property but contains a centrepiece_straight shape or active=yes
            //   we have to transmit a name - so we fall back to the debugname
            let shouldTransmit: boolean = active === 1;

            if (active === -1) {
                for (let k = 0; k < models.length; k++) {
                    if (models[k].shape === LocShapeSuffix._8) {
                        // the presence of any _8 shape means we have to transmit a name
                        shouldTransmit = true;
                        break;
                    }
                }
            }

            if (shouldTransmit) {
                name = debugname;
            }
        }

        if (name !== null) {
            dat.p1(2);
            dat.pjstr(name);
        }

        if (desc !== null) {
            dat.p1(3);
            dat.pjstr(desc);
        }

        if (transmitAll === true && params.length > 0) {
            dat.p1(249);

            dat.p1(params.length);
            for (let k = 0; k < params.length; k++) {
                const paramData = params[k] as ParamValue;
                dat.p3(paramData.id);
                dat.pbool(paramData.type === ScriptVarType.STRING);

                if (paramData.type === ScriptVarType.STRING) {
                    dat.pjstr(paramData.value as string);
                } else {
                    dat.p4(paramData.value as number);
                }
            }
        }

        if (transmitAll === true) {
            dat.p1(250);
            dat.pjstr(debugname);
        }

        dat.p1(0);
        idx.p2(dat.pos - start);
    }

    return { dat, idx };
}

export function packLocClient(configs: Map<string, ConfigLine[]>) {
    return packLocConfig(configs, false);
}

export function packLocServer(configs: Map<string, ConfigLine[]>) {
    return packLocConfig(configs, true);
}
