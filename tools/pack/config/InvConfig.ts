import InvType from '#/cache/config/InvType.js';

import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean } from '#tools/pack/config/PackShared.js';
import { InvPack, ObjPack } from '#/util/PackFile.js';

export function parseInvConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    // prettier-ignore
    const numberKeys = [
        'size'
    ];
    // prettier-ignore
    const booleanKeys = [
        'stackall', 'restock', 'allstock', 'protect', 'runweight',
        'dummyinv' // guessing that ObjType.dummyitem can only add to these invs
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

        if (key === 'size' && (number < 0 || number > 500)) {
            return null;
        }

        return number;
    } else if (booleanKeys.includes(key)) {
        if (!isConfigBoolean(value)) {
            return null;
        }

        return getConfigBoolean(value);
    } else if (key === 'scope') {
        if (value === 'shared') {
            return InvType.SCOPE_SHARED;
        } else if (value === 'perm') {
            return InvType.SCOPE_PERM;
        } else if (value === 'temp') {
            return InvType.SCOPE_TEMP;
        } else {
            return null;
        }
    } else if (key.startsWith('stock')) {
        const parts = value.split(',');
        const objIndex = ObjPack.getByName(parts[0]);
        if (objIndex === -1) {
            return null;
        }

        const objCount = parseInt(parts[1]);
        if (isNaN(objCount)) {
            return null;
        }

        if (parts.length === 2) {
            return [objIndex, objCount];
        }

        const objRespawn = parseInt(parts[2]);
        if (isNaN(objRespawn)) {
            return null;
        }

        return [objIndex, objCount, objRespawn];
    } else {
        return undefined;
    }
}

export function packInvConfigs(configs: Map<string, ConfigLine[]>): { client: PackedData, server: PackedData } {
    const client: PackedData = new PackedData(InvPack.size);
    const server: PackedData = new PackedData(InvPack.size);

    for (let i = 0; i < InvPack.size; i++) {
        const debugname = InvPack.getById(i);
        const config = configs.get(debugname)!;

        // collect these to write at the end
        const stock = [];

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'scope') {
                server.p1(1);
                server.p1(value as number);
            } else if (key === 'size') {
                server.p1(2);
                server.p2(value as number);
            } else if (key.startsWith('stock')) {
                stock.push(value);
            } else if (key === 'stackall') {
                if (value === true) {
                    server.p1(3);
                }
            } else if (key === 'restock') {
                if (value === true) {
                    server.p1(5);
                }
            } else if (key === 'allstock') {
                if (value === true) {
                    server.p1(6);
                }
            } else if (key === 'protect') {
                if (value === false) {
                    server.p1(7);
                }
            } else if (key === 'runweight') {
                if (value === true) {
                    server.p1(8);
                }
            } else if (key === 'dummyinv') {
                if (value === true) {
                    server.p1(9);
                }
            }
        }

        if (stock.length > 0) {
            server.p1(4);
            server.p1(stock.length);

            for (let i = 0; i < stock.length; i++) {
                const [id, count, rate] = stock[i] as number[];
                server.p2(id);
                server.p2(count);

                if (typeof rate !== 'undefined') {
                    server.p4(rate);
                } else {
                    server.p4(0);
                }
            }
        }

        server.p1(250);
        server.pjstr(debugname);

        client.next();
        server.next();
    }

    return { client, server };
}
