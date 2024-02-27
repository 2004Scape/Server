import Packet from '#jagex2/io/Packet.js';

import ScriptVarType from '#lostcity/cache/ScriptVarType.js';

import { ConfigValue, ConfigLine } from '#lostcity/tools/packconfig/PackShared.js';
import { VarnPack } from '#lostcity/util/PackFile.js';

export function parseVarnConfig(key: string, value: string): ConfigValue | null | undefined {
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
    } else if (key === 'type') {
        return ScriptVarType.getTypeChar(value);
    } else {
        return undefined;
    }
}

export function packVarnConfigs(configs: Map<string, ConfigLine[]>) {
    const dat = new Packet();
    const idx = new Packet();
    dat.p2(VarnPack.size);
    idx.p2(VarnPack.size);

    for (let i = 0; i < VarnPack.size; i++) {
        const debugname = VarnPack.getById(i);
        const config = configs.get(debugname)!;

        const start = dat.pos;

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'type') {
                dat.p1(1);
                dat.p1(value as number);
            }
        }

        dat.p1(250);
        dat.pjstr(debugname);

        dat.p1(0);
        idx.p2(dat.pos - start);
    }

    return { dat, idx };
}
