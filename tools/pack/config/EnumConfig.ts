import ScriptVarType from '#/cache/config/ScriptVarType.js';

import { ConfigValue, ConfigLine, PackedData, isConfigBoolean, getConfigBoolean, packStepError } from '#tools/pack/config/PackShared.js';
import { lookupParamValue } from '#tools/pack/config/ParamConfig.js';
import { EnumPack } from '#/util/PackFile.js';

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
        if (!isConfigBoolean(value)) {
            return null;
        }

        return getConfigBoolean(value);
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

export function packEnumConfigs(configs: Map<string, ConfigLine[]>): { client: PackedData, server: PackedData } {
    const client: PackedData = new PackedData(EnumPack.size);
    const server: PackedData = new PackedData(EnumPack.size);

    for (let i = 0; i < EnumPack.size; i++) {
        const debugname = EnumPack.getById(i);
        const config = configs.get(debugname)!;

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
                server.p1(1);
                if (value as number === ScriptVarType.AUTOINT) {
                    server.p1(ScriptVarType.INT);
                } else {
                    server.p1(value as number);
                }
            } else if (key === 'outputtype') {
                server.p1(2);
                server.p1(value as number);
            } else if (key === 'default') {
                if (outputtype === ScriptVarType.STRING) {
                    server.p1(3);
                    server.pjstr(lookupParamValue(outputtype, value as string) as string);
                } else {
                    server.p1(4);
                    server.p4(lookupParamValue(outputtype, value as string) as number);
                }
            }
        }

        if (outputtype === ScriptVarType.STRING) {
            server.p1(5);
        } else {
            server.p1(6);
        }

        server.p2(val.length);
        for (let i = 0; i < val.length; i++) {
            if (inputtype === ScriptVarType.AUTOINT) {
                server.p4(i);
            } else {
                const key = val[i].substring(0, val[i].indexOf(','));
                const value = lookupParamValue(inputtype, key);

                if (value === null) {
                    throw packStepError(debugname, `Invalid value-key: ${val[i]}`);
                }

                server.p4(value as number);
            }

            if (outputtype === ScriptVarType.AUTOINT) {
                const value = lookupParamValue(outputtype, val[i]);

                if (value === null) {
                    throw packStepError(debugname, `Invalid value: ${val[i]}`);
                }

                server.p4(value as number);
            } else {
                const value = lookupParamValue(outputtype, val[i].substring(val[i].indexOf(',') + 1));

                if (value === null) {
                    throw packStepError(debugname, `Invalid value: ${val[i]}`);
                }

                if (outputtype === ScriptVarType.STRING) {
                    server.pjstr(value as string);
                } else {
                    server.p4(value as number);
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
