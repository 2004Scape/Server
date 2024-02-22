import fs from 'fs';

import Packet from '#jagex2/io/Packet.js';

import { VarnPack, VarpPack, VarsPack, shouldBuild } from '#lostcity/util/PackFile.js';

import ParamType from '#lostcity/cache/ParamType.js';

import { packParamConfigs, parseParamConfig } from '#lostcity/tools/packconfig/ParamConfig.js';
import { loadDir } from '#lostcity/util/NameMap.js';

export const CONSTANTS = new Map<string, string>();
// console.time('Generating constants');
loadDir('data/src/scripts', '.constant', src => {
    for (let i = 0; i < src.length; i++) {
        if (!src[i] || src[i].startsWith('//')) {
            continue;
        }

        const parts = src[i].split('=');
        let name = parts[0].trim();
        const value = parts[1].trim();

        if (name.startsWith('^')) {
            name = name.substring(1);
        }

        if (CONSTANTS.has(name)) {
            console.error(`Duplicate constant found: ${name}`);
            process.exit(1);
        }

        CONSTANTS.set(name, value);
    }
});
// console.timeEnd('Generating constants');

// var domains are global, so we need to check for conflicts

for (let id = 0; id < VarpPack.size; id++) {
    const name = VarpPack.getById(id);

    if (VarnPack.getByName(name) !== -1) {
        console.error(`Varp and varn name conflict: ${name}\nPick a different name for one of them!`);
        process.exit(1);
    }

    if (VarsPack.getByName(name) !== -1) {
        console.error(`Varp and vars name conflict: ${name}\nPick a different name for one of them!`);
        process.exit(1);
    }
}

for (let id = 0; id < VarnPack.size; id++) {
    const name = VarnPack.getById(id);

    if (VarsPack.getByName(name) !== -1) {
        console.error(`Varn and vars name conflict: ${name}\nPick a different name for one of them!`);
        process.exit(1);
    }
}

export function findFiles(path: string, extension: string, results: string[] = []): string[] {
    const files = fs.readdirSync(path);

    for (let i = 0; i < files.length; i++) {
        if (fs.statSync(path + '/' + files[i]).isDirectory()) {
            findFiles(path + '/' + files[i], extension, results);
        } else {
            if (files[i].endsWith(extension)) {
                results.push(path + '/' + files[i]);
            }
        }
    }

    return results;
}

export function readFiles(files: string[]): Map<string, string> {
    const contents = new Map<string, string>(); // key: file, value: content

    for (let i = 0; i < files.length; i++) {
        contents.set(files[i], fs.readFileSync(files[i], 'utf8').replace(/\r/g, ''));
    }

    return contents;
}

export function parseStepError(file: string, lineNumber: number, message: string) {
    console.error(`\nError during parsing - see ${file}:${lineNumber + 1}`);
    console.error(message);
    process.exit(1);
}

export function packStepError(debugname: string, message: string) {
    console.error(`\nError during packing - [${debugname}]`);
    console.error(message);
    process.exit(1);
}

export type ParamValue = {
    id: number;
    type: number;
    value: string | number | boolean;
};
export type LocModelShape = { model: number; shape: number };
export type ConfigValue = string | number | boolean | number[] | LocModelShape[] | ParamValue;
export type ConfigLine = { key: string; value: ConfigValue };

// we're using null for invalid values, undefined for invalid keys
export type ConfigParseCallback = (key: string, value: string) => ConfigValue | null | undefined;
export type ConfigDatIdx = { dat: Packet; idx: Packet };
export type ConfigPackCallback = (configs: Map<string, ConfigLine[]>) => ConfigDatIdx;
export type ConfigSaveCallback = (dat: Packet, idx: Packet) => void;

export function readConfigs(extension: string, requiredProperties: string[], parse: ConfigParseCallback, pack: ConfigPackCallback, save: ConfigSaveCallback) {
    const files = readFiles(findFiles('data/src/scripts', extension));

    const configs = new Map<string, ConfigLine[]>();
    files.forEach((value, file) => {
        const lines = value.split('\n');

        let debugname: string | null = null;
        let config: ConfigLine[] = [];

        for (let lineNumber = 0; lineNumber < lines.length; lineNumber++) {
            const line = lines[lineNumber];
            if (line.length === 0 || line.startsWith('//')) {
                continue;
            }

            if (line.startsWith('[')) {
                if (!line.endsWith(']')) {
                    throw parseStepError(file, lineNumber, `Missing closing bracket: ${line}`);
                }

                if (debugname !== null) {
                    if (requiredProperties.length > 0) {
                        // check config keys against requiredProperties
                        for (let i = 0; i < requiredProperties.length; i++) {
                            if (!config.some(value => value.key === requiredProperties[i])) {
                                throw parseStepError(file, -1, `Missing required property: ${requiredProperties[i]}`);
                            }
                        }
                    }

                    configs.set(debugname, config);
                }

                debugname = line.substring(1, line.length - 1); // TODO: .toLowerCase();
                if (!debugname.length) {
                    throw parseStepError(file, lineNumber, 'No config name');
                }

                if (configs.has(debugname)) {
                    throw parseStepError(file, lineNumber, `Duplicate config found: ${debugname}`);
                }

                config = [];
                continue;
            }

            const separator = line.indexOf('=');
            if (separator === -1) {
                throw parseStepError(file, lineNumber, `Missing property separator: ${line}`);
            }

            const key = line.substring(0, separator);
            let value = line.substring(separator + 1);

            for (let i = 0; i < value.length; i++) {
                // check the value for a constant starting with ^ and ending with a \r, \n, comma, or otherwise end of string
                // then replace just that substring with CONSTANTS.get(value) if CONSTANTS.has(value) returns true

                if (value[i] === '^') {
                    const start = i;
                    let end = i + 1;

                    while (end < value.length) {
                        if (value[end] === '\r' || value[end] === '\n' || value[end] === ',' || value[end] === ' ') {
                            break;
                        }

                        end++;
                    }

                    const constant = value.substring(start + 1, end);
                    if (CONSTANTS.has(constant)) {
                        value = value.substring(0, start) + CONSTANTS.get(constant) + value.substring(end);
                    }

                    i = end;
                }
            }

            const parsed = parse(key, value);
            if (parsed === null) {
                throw parseStepError(file, lineNumber, `Invalid property value: ${line}`);
            } else if (typeof parsed === 'undefined') {
                throw parseStepError(file, lineNumber, `Invalid property key: ${line}`);
            }

            config.push({ key, value: parsed });
        }

        if (debugname !== null) {
            if (requiredProperties.length > 0) {
                // check config keys against requiredProperties
                for (let i = 0; i < requiredProperties.length; i++) {
                    if (!config.some(value => value.key === requiredProperties[i])) {
                        throw parseStepError(file, -1, `Missing required property: ${requiredProperties[i]}`);
                    }
                }
            }

            configs.set(debugname, config);
        }
    });

    const { dat, idx } = pack(configs);
    save(dat, idx);
}

// We have to pack params for other configs to parse correctly
if (shouldBuild('data/src/scripts', '.param', 'data/pack/server/param.dat')) {
    readConfigs('.param', ['type'], parseParamConfig, packParamConfigs, (dat: Packet, idx: Packet) => {
        dat.save('data/pack/server/param.dat');
        idx.save('data/pack/server/param.idx');
    });
}

// Now that they're up to date, load them for us to use elsewhere during this process
ParamType.load('data/pack/server');
