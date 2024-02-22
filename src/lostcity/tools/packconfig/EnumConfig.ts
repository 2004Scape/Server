import Packet from '#jagex2/io/Packet.js';

import ScriptVarType from '#lostcity/cache/ScriptVarType.js';

import { ConfigValue, ConfigLine } from '#lostcity/tools/packconfig/PackShared.js';
import { lookupParamValue } from '#lostcity/tools/packconfig/ParamConfig.js';
import { EnumPack } from '#lostcity/util/PackFile.js';

export function parseEnumConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    const numberKeys: string[] = [];
    const booleanKeys: string[] = [];

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

        return number;
    } else if (booleanKeys.includes(key)) {
        if (value !== 'yes' && value !== 'no') {
            return null;
        }

        return value === 'yes';
    } else if (key === 'inputtype') {
        return ScriptVarType.getTypeChar(value);
    } else if (key === 'outputtype') {
        return ScriptVarType.getTypeChar(value);
    } else if (key === 'default') {
        return value;
    } else if (key === 'val') {
        return value;
    } else {
        return undefined;
    }
}

export function packEnumConfigs(configs: Map<string, ConfigLine[]>) {
    const dat = new Packet();
    const idx = new Packet();
    dat.p2(EnumPack.size);
    idx.p2(EnumPack.size);

    for (let i = 0; i < EnumPack.size; i++) {
        const debugname = EnumPack.getById(i);
        const config = configs.get(debugname)!;

        const start = dat.pos;

        // collect these to write at the end
        const val = [];

        // need to read-ahead for type info
        const inputtype = config.find(line => line.key === 'inputtype')!.value as number;
        const outputtype = config.find(line => line.key === 'outputtype')!.value as number;

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'val') {
                val.push(value as string);
            } else if (key === 'inputtype') {
                dat.p1(1);
                dat.p1(value as number);
            } else if (key === 'outputtype') {
                dat.p1(2);
                dat.p1(value as number);
            } else if (key === 'default') {
                if (outputtype === ScriptVarType.STRING) {
                    dat.p1(3);
                    dat.pjstr(lookupParamValue(outputtype, value as string) as string);
                } else {
                    dat.p1(4);
                    dat.p4(lookupParamValue(outputtype, value as string) as number);
                }
            }
        }

        if (outputtype === ScriptVarType.STRING) {
            dat.p1(5);
        } else {
            dat.p1(6);
        }

        dat.p2(val.length);
        for (let i = 0; i < val.length; i++) {
            if (inputtype === ScriptVarType.AUTOINT) {
                dat.p4(i);
            } else {
                const key = val[i].substring(0, val[i].indexOf(','));
                dat.p4(lookupParamValue(inputtype, key) as number);
            }

            if (outputtype === ScriptVarType.AUTOINT) {
                dat.p4(lookupParamValue(outputtype, val[i]) as number);
            } else {
                const value = val[i].substring(val[i].indexOf(',') + 1);
                if (outputtype === ScriptVarType.STRING) {
                    dat.pjstr(lookupParamValue(outputtype, value) as string);
                } else {
                    dat.p4(lookupParamValue(outputtype, value) as number);
                }
            }
        }

        dat.p1(250);
        dat.pjstr(debugname);

        dat.p1(0);
        idx.p2(dat.pos - start);
    }

    return { dat, idx };
}
