import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean } from '#tools/pack/config/PackShared.js';
import { FloPack, TexturePack } from '#/util/PackFile.js';

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
        if (!isConfigBoolean(value)) {
            return null;
        }

        return getConfigBoolean(value);
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

export function packFloConfigs(configs: Map<string, ConfigLine[]>): { client: PackedData, server: PackedData } {
    const client: PackedData = new PackedData(FloPack.size);
    const server: PackedData = new PackedData(FloPack.size);

    for (let i = 0; i < FloPack.size; i++) {
        const debugname = FloPack.getById(i);
        const config = configs.get(debugname)!;

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'rgb') {
                client.p1(1);
                client.p3(value as number);
            } else if (key === 'texture') {
                client.p1(2);
                client.p1(value as number);
            } else if (key === 'overlay') {
                if (value === true) {
                    client.p1(3);
                }
            } else if (key === 'occlude') {
                if (value === false) {
                    client.p1(5);
                }
            }
        }

        // yes, this was originally transmitted!
        client.p1(6);
        client.pjstr(debugname);

        client.next();
        server.next();
    }

    return { client, server };
}
