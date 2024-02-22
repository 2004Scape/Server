import Packet from '#jagex2/io/Packet.js';

import { ConfigValue, ConfigLine } from '#lostcity/tools/packconfig/PackShared.js';
import { FloPack, TexturePack } from '#lostcity/util/PackFile.js';

export function parseFloConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    // prettier-ignore
    const numberKeys = [
        'rgb'
    ];
    // prettier-ignore
    const booleanKeys = [
        'overlay', 'occlude'
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

        return number;
    } else if (booleanKeys.includes(key)) {
        if (value !== 'yes' && value !== 'no') {
            return null;
        }

        return value === 'yes';
    } else if (key === 'texture') {
        const index = TexturePack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index;
    } else {
        return undefined;
    }
}

function packFloConfigs(configs: Map<string, ConfigLine[]>, transmitAll: boolean) {
    const dat = new Packet();
    const idx = new Packet();
    dat.p2(FloPack.size);
    idx.p2(FloPack.size);

    for (let i = 0; i < FloPack.size; i++) {
        const debugname = FloPack.getById(i);
        const config = configs.get(debugname)!;

        const start = dat.pos;

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'rgb') {
                dat.p1(1);
                dat.p3(value as number);
            } else if (key === 'texture') {
                dat.p1(2);
                dat.p1(value as number);
            } else if (key === 'overlay') {
                if (value === true) {
                    dat.p1(3);
                }
            } else if (key === 'occlude') {
                if (value === false) {
                    dat.p1(5);
                }
            }
        }

        dat.p1(6); // editname
        dat.pjstr(debugname);

        dat.p1(0);
        idx.p2(dat.pos - start);
    }

    return { dat, idx };
}

export function packFloClient(configs: Map<string, ConfigLine[]>) {
    return packFloConfigs(configs, false);
}

export function packFloServer(configs: Map<string, ConfigLine[]>) {
    return packFloConfigs(configs, true);
}
