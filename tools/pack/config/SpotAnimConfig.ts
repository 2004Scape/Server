import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean } from '#tools/pack/config/PackShared.js';
import ColorConversion from '#/util/ColorConversion.js';
import { ModelPack, SeqPack, SpotAnimPack } from '#/util/PackFile.js';

export function parseSpotAnimConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    // prettier-ignore
    const numberKeys = [
        'resizeh', 'resizev',
        'orientation',
        'ambient', 'contrast',
    ];
    // prettier-ignore
    const booleanKeys = [
        'hasalpha'
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

        if ((key === 'resizeh' || key === 'resizev') && (number < 0 || number > 512)) {
            return null;
        }

        if (key === 'orientation' && (number < 0 || number > 360)) {
            return null;
        }

        if ((key === 'ambient' || key === 'contrast') && (number < -128 || number > 127)) {
            return null;
        }

        return number;
    } else if (booleanKeys.includes(key)) {
        if (!isConfigBoolean(value)) {
            return null;
        }

        return getConfigBoolean(value);
    } else if (key === 'model') {
        const index = ModelPack.getByName(value);
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
    } else if (key.startsWith('recol')) {
        const index = parseInt(key[5]);
        if (index > 9) {
            return null;
        }

        return ColorConversion.rgb15toHsl16(parseInt(value));
    } else {
        return undefined;
    }
}

export function packSpotAnimConfigs(configs: Map<string, ConfigLine[]>): { client: PackedData, server: PackedData } {
    const client: PackedData = new PackedData(SpotAnimPack.size);
    const server: PackedData = new PackedData(SpotAnimPack.size);

    for (let i = 0; i < SpotAnimPack.size; i++) {
        const debugname = SpotAnimPack.getById(i);
        const config = configs.get(debugname)!;

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];

            if (key === 'model') {
                client.p1(1);
                client.p2(value as number);
            } else if (key === 'anim') {
                client.p1(2);
                client.p2(value as number);
            } else if (key === 'hasalpha') {
                if (value === true) {
                    client.p1(3);
                }
            } else if (key === 'resizeh') {
                client.p1(4);
                client.p2(value as number);
            } else if (key === 'resizev') {
                client.p1(5);
                client.p2(value as number);
            } else if (key === 'orientation') {
                client.p1(6);
                client.p2(value as number);
            } else if (key === 'ambient') {
                client.p1(7);
                client.p1(value as number);
            } else if (key === 'contrast') {
                client.p1(8);
                client.p1(value as number);
            } else if (key.startsWith('recol')) {
                const index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                if (key.endsWith('s')) {
                    client.p1(40 + index);
                    client.p2(value as number);
                } else {
                    client.p1(50 + index);
                    client.p2(value as number);
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
