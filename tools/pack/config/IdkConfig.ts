import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean } from '#tools/pack/config/PackShared.js';
import ColorConversion from '#/util/ColorConversion.js';
import { IdkPack, ModelPack } from '#/util/PackFile.js';

export function parseIdkConfig(key: string, value: string): ConfigValue | null | undefined {
    const stringKeys: string[] = [];
    // prettier-ignore
    const numberKeys: string[] = [];
    // prettier-ignore
    const booleanKeys = [
        'disable'
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
    } else if (key === 'type') {
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
            default:
                return null;
        }

        return bodypart;
    } else if (key.startsWith('model')) {
        const index = ModelPack.getByName(value);
        if (index === -1) {
            return null;
        }

        return index;
    } else if (key.startsWith('head')) {
        const index = ModelPack.getByName(value);
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

export function packIdkConfigs(configs: Map<string, ConfigLine[]>) {
    const client: PackedData = new PackedData(IdkPack.size);
    const server: PackedData = new PackedData(IdkPack.size);

    for (let i = 0; i < IdkPack.size; i++) {
        const debugname = IdkPack.getById(i);
        const config = configs.get(debugname)!;

        // collect these to write at the end
        const recol_s: number[] = [];
        const recol_d: number[] = [];
        const models: number[] = [];
        const heads: number[] = [];

        for (let j = 0; j < config.length; j++) {
            const { key, value } = config[j];
            if (key.startsWith('model')) {
                const index = parseInt(key.substring('model'.length)) - 1;
                models[index] = value as number;
            } else if (key.startsWith('head')) {
                const index = parseInt(key.substring('head'.length)) - 1;
                heads[index] = value as number;
            } else if (key.startsWith('recol') && key.endsWith('s')) {
                const index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                recol_s[index] = value as number;
            } else if (key.startsWith('recol') && key.endsWith('d')) {
                const index = parseInt(key.substring('recol'.length, key.length - 1)) - 1;
                recol_d[index] = value as number;
            } else if (key === 'type') {
                client.p1(1);
                client.p1(value as number);
            } else if (key === 'disable') {
                if (value === true) {
                    client.p1(3);
                }
            }
        }

        if (recol_s.length) {
            for (let i = 0; i < recol_s.length; i++) {
                client.p1(40 + i);
                client.p2(recol_s[i]);
            }
        }

        if (recol_d.length) {
            for (let i = 0; i < recol_d.length; i++) {
                client.p1(50 + i);
                client.p2(recol_d[i]);
            }
        }

        if (heads.length) {
            for (let i = 0; i < heads.length; i++) {
                client.p1(60 + i);
                client.p2(heads[i]);
            }
        }

        if (models.length) {
            client.p1(2);
            client.p1(models.length);

            for (let i = 0; i < models.length; i++) {
                client.p2(models[i]);
            }
        }

        server.p1(250);
        server.pjstr(debugname);

        client.next();
        server.next();
    }

    return { client, server };
}
