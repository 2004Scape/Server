import fs from 'fs';
import readline from 'readline';

import Packet from '#jagex/io/Packet.js';

import { VarnPack, VarpPack, VarsPack, shouldBuild } from '#lostcity/util/PackFile.js';

import ParamType from '#lostcity/cache/config/ParamType.js';

import { packParamConfigs, parseParamConfig } from '#lostcity/pack/config/ParamConfig.js';
import { loadDir } from '#lostcity/util/NameMap.js';

import { packFloConfigs, parseFloConfig } from '#lostcity/pack/config/FloConfig.js';
import { packIdkConfigs, parseIdkConfig } from '#lostcity/pack/config/IdkConfig.js';
import { packLocConfigs, parseLocConfig } from '#lostcity/pack/config/LocConfig.js';
import { packNpcConfigs, parseNpcConfig } from '#lostcity/pack/config/NpcConfig.js';
import { packObjConfigs, parseObjConfig } from '#lostcity/pack/config/ObjConfig.js';
import { packSeqConfigs, parseSeqConfig } from '#lostcity/pack/config/SeqConfig.js';
import { packSpotAnimConfigs, parseSpotAnimConfig } from '#lostcity/pack/config/SpotAnimConfig.js';
import { packVarpConfigs, parseVarpConfig } from '#lostcity/pack/config/VarpConfig.js';

import { AnimPack, CategoryPack, shouldBuildFile } from '#lostcity/util/PackFile.js';
import { listFilesExt } from '#lostcity/util/Parse.js';

import DbTableType from '#lostcity/cache/config/DbTableType.js';

import { packDbRowConfigs, parseDbRowConfig } from '#lostcity/pack/config/DbRowConfig.js';
import { packDbTableConfigs, parseDbTableConfig } from '#lostcity/pack/config/DbTableConfig.js';
import { packEnumConfigs, parseEnumConfig } from '#lostcity/pack/config/EnumConfig.js';
import { packInvConfigs, parseInvConfig } from '#lostcity/pack/config/InvConfig.js';
import { packMesAnimConfigs, parseMesAnimConfig } from '#lostcity/pack/config/MesAnimConfig.js';
import { packStructConfigs, parseStructConfig } from '#lostcity/pack/config/StructConfig.js';
import { packHuntConfigs, parseHuntConfig } from '#lostcity/pack/config/HuntConfig.js';
import { packVarnConfigs, parseVarnConfig } from '#lostcity/pack/config/VarnConfig.js';
import { packVarsConfigs, parseVarsConfig } from '#lostcity/pack/config/VarsConfig.js';
import Jagfile from '#jagex/io/Jagfile.js';
import Environment from '#lostcity/util/Environment.js';

export function isConfigBoolean(input: string): boolean {
    return input === 'yes' || input === 'no' || input === 'true' || input === 'false' || input === '1' || input === '0';
}

export function getConfigBoolean(input: string): boolean {
    return input === 'yes' || input === 'true' || input === '1';
}

export class PackedData {
    dat: Packet;
    idx: Packet;
    size: number = 0;
    marker: number;

    constructor(size: number) {
        this.dat = Packet.alloc(5);
        this.idx = Packet.alloc(3);
        this.size = size;

        this.dat.p2(size);
        this.idx.p2(size);
        this.marker = 2;
    }

    next() {
        this.dat.p1(0);
        this.idx.p2(this.dat.pos - this.marker);
        this.marker = this.dat.pos;
    }

    p1(value: number) {
        this.dat.p1(value);
    }

    pbool(value: boolean) {
        this.dat.pbool(value);
    }

    p2(value: number) {
        this.dat.p2(value);
    }

    p3(value: number) {
        this.dat.p3(value);
    }

    p4(value: number) {
        this.dat.p4(value);
    }

    pjstr(value: string) {
        this.dat.pjstr(value);
    }
}

export const CONSTANTS = new Map<string, string>();

export function readDirTree(dirTree: Set<string>, path: string) {
    const files = fs.readdirSync(path);

    for (const file of files) {
        if (fs.statSync(path + '/' + file).isDirectory()) {
            readDirTree(dirTree, path + '/' + file);
        } else {
            dirTree.add(path + '/' + file);
        }
    }
}

export function findFiles(dirTree: Set<string>, extension: string) {
    const results = new Set<string>();

    for (const entry of dirTree) {
        if (entry.endsWith(extension)) {
            results.add(entry);
        }
    }

    return results;
}

export function parseStepError(file: string, lineNumber: number, message: string) {
    return new Error(`\nError during parsing - see ${file}:${lineNumber + 1}\n${message}`);
}

export function packStepError(debugname: string, message: string) {
    return new Error(`\nError during packing - [${debugname}]\n${message}`);
}

export type ParamValue = {
    id: number;
    type: number;
    value: string | number | boolean;
};
export type LocModelShape = { model: number; shape: number };
export type HuntCheckInv = { inv: number; obj: number; condition: string; val: number; };
export type HuntCheckInvParam = { inv: number; param: number; condition: string; val: number; };
export type HuntCheckVar = { varp: number; condition: string; val: number; }
export type ConfigValue = string | number | boolean | number[] | LocModelShape[] | ParamValue | HuntCheckInv | HuntCheckInvParam | HuntCheckVar;
export type ConfigLine = { key: string; value: ConfigValue };

// we're using null for invalid values, undefined for invalid keys
export type ConfigParseCallback = (key: string, value: string) => ConfigValue | null | undefined;
export type ConfigDatIdx = { client: PackedData, server: PackedData };
export type ConfigPackCallback = (configs: Map<string, ConfigLine[]>) => ConfigDatIdx;
export type ConfigSaveCallback = (dat: Packet, idx: Packet) => void;

export async function readConfigs(dirTree: Set<string>, extension: string, requiredProperties: string[], parse: ConfigParseCallback, pack: ConfigPackCallback, saveClient: ConfigSaveCallback, saveServer: ConfigSaveCallback) {
    const files = findFiles(dirTree, extension);

    const configs = new Map<string, ConfigLine[]>();
    for (const file of files) {
        const reader = readline.createInterface({
            input: fs.createReadStream(file)
        });

        let debugname: string | null = null;
        let config: ConfigLine[] = [];

        let lineNumber = 0;
        for await (const line of reader) {
            lineNumber++;

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
    }

    const { client, server } = pack(configs);
    saveClient(client.dat, client.idx);
    saveServer(server.dat, server.idx);
}

function noOp() { }

export async function packConfigs() {
    CONSTANTS.clear();

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
                throw new Error(`Duplicate constant found: ${name}`);
            }

            CONSTANTS.set(name, value);
        }
    });

    // var domains are global, so we need to check for conflicts

    for (let id = 0; id < VarpPack.size; id++) {
        const name = VarpPack.getById(id);

        if (VarnPack.getByName(name) !== -1) {
            throw new Error(`Varp and varn name conflict: ${name}\nPick a different name for one of them!`);
        }

        if (VarsPack.getByName(name) !== -1) {
            throw new Error(`Varp and vars name conflict: ${name}\nPick a different name for one of them!`);
        }
    }

    for (let id = 0; id < VarnPack.size; id++) {
        const name = VarnPack.getById(id);

        if (VarsPack.getByName(name) !== -1) {
            throw new Error(`Varn and vars name conflict: ${name}\nPick a different name for one of them!`);
        }
    }

    const dirTree = new Set<string>();
    readDirTree(dirTree, 'data/src/scripts');

    // We have to pack params for other configs to parse correctly
    if (shouldBuild('data/src/scripts', '.param', 'data/pack/server/param.dat')) {
        await readConfigs(dirTree, '.param', ['type'], parseParamConfig, packParamConfigs, () => { }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/param.dat');
            idx.save('data/pack/server/param.idx');
            dat.release();
            idx.release();
        });
    }

    // Now that they're up to date, load them for us to use elsewhere during this process
    ParamType.load('data/pack');

    const jag = new Jagfile();

    /* client order:
    'seq.dat',      'seq.idx',
    'loc.dat',      'loc.idx',
    'flo.dat',      'flo.idx',
    'spotanim.dat', 'spotanim.idx',
    'obj.dat',      'obj.idx',
    'npc.dat',      'npc.idx',
    'idk.dat',      'idk.idx',
    'varp.dat',     'varp.idx'
    */

    const rebuildClient =
        shouldBuild('data/src/scripts', '.seq', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.loc', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.flo', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.spotanim', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.npc', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.obj', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.idk', 'data/pack/client/config') ||
        shouldBuild('data/src/scripts', '.varp', 'data/pack/client/config') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/client/config');

    // not a config but we want the server to know all the possible categories
    if (
        shouldBuildFile('data/src/pack/category.pack', 'data/pack/server/category.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/category.dat')
    ) {
        const dat = Packet.alloc(1);
        dat.p2(CategoryPack.size);
        for (let i = 0; i < CategoryPack.size; i++) {
            dat.p1(1);
            dat.pjstr(CategoryPack.getById(i));

            dat.p1(0);
        }
        dat.save('data/pack/server/category.dat');
        dat.release();
    }

    // want the server to access frame lengths without loading data from models
    if (
        shouldBuild('data/src/models', '.frame', 'data/pack/server/frame_del.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/frame_del.dat')
    ) {
        const files = listFilesExt('data/src/models', '.frame');
        const frame_del = Packet.alloc(3);
        for (let i = 0; i < AnimPack.max; i++) {
            const name = AnimPack.getById(i);
            if (!name.length) {
                frame_del.p1(0);
                continue;
            }

            const file = files.find(file => file.endsWith(`${name}.frame`));
            if (!file) {
                frame_del.p1(0);
                continue;
            }

            const data = Packet.load(file);

            data.pos = data.data.length - 8;
            const headLength = data.g2();
            const tran1Length = data.g2();
            const tran2Length = data.g2();
            // const delLength = data.g2();

            data.pos = 0;
            data.pos += headLength;
            data.pos += tran1Length;
            data.pos += tran2Length;
            frame_del.p1(data.g1());
        }

        frame_del.save('data/pack/server/frame_del.dat');
        frame_del.release();
    }

    // ----

    if (
        shouldBuild('data/src/scripts', '.dbtable', 'data/pack/server/dbtable.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/dbtable.dat')
    ) {
        await readConfigs(dirTree, '.dbtable', [], parseDbTableConfig, packDbTableConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/dbtable.dat');
            idx.save('data/pack/server/dbtable.idx');
            dat.release();
            idx.release();
        });
    }

    DbTableType.load('data/pack'); // dbrow needs to access it

    // todo: rebuild when any data type changes
    if (
        shouldBuild('data/src/scripts', '.dbrow', 'data/pack/server/dbrow.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/dbrow.dat') ||
        shouldBuild('data/src/scripts', '.dbtable', 'data/pack/server/dbtable.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/dbtable.dat')
    ) {
        await readConfigs(dirTree, '.dbrow', [], parseDbRowConfig, packDbRowConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/dbrow.dat');
            idx.save('data/pack/server/dbrow.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.enum', 'data/pack/server/enum.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/enum.dat')
    ) {
        await readConfigs(dirTree, '.enum', [], parseEnumConfig, packEnumConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/enum.dat');
            idx.save('data/pack/server/enum.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.inv', 'data/pack/server/inv.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/inv.dat')
    ) {
        await readConfigs(dirTree, '.inv', [], parseInvConfig, packInvConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/inv.dat');
            idx.save('data/pack/server/inv.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.mesanim', 'data/pack/server/mesanim.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/mesanim.dat')
    ) {
        await readConfigs(dirTree, '.mesanim', [], parseMesAnimConfig, packMesAnimConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/mesanim.dat');
            idx.save('data/pack/server/mesanim.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.struct', 'data/pack/server/struct.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/struct.dat')
    ) {
        await readConfigs(dirTree, '.struct', [], parseStructConfig, packStructConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/struct.dat');
            idx.save('data/pack/server/struct.idx');
            dat.release();
            idx.release();
        });
    }

    // ----

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.seq', 'data/pack/server/seq.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/seq.dat')
    ) {
        await readConfigs(dirTree, '.seq', [], parseSeqConfig, packSeqConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, 1638136604) || !Packet.checkcrc(idx.data, 0, idx.pos, 969051566))) {
                throw new Error('.seq CRC check failed! Custom data detected.');
            }

            jag.write('seq.dat', dat);
            jag.write('seq.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/seq.dat');
            idx.save('data/pack/server/seq.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.loc', 'data/pack/server/loc.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/loc.dat')
    ) {
        await readConfigs(dirTree, '.loc', [], parseLocConfig, packLocConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, 891497087) || !Packet.checkcrc(idx.data, 0, idx.pos, -941401128))) {
                throw new Error('.loc CRC check failed! Custom data detected.');
            }

            jag.write('loc.dat', dat);
            jag.write('loc.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/loc.dat');
            idx.save('data/pack/server/loc.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.flo', 'data/pack/server/flo.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/flo.dat')
    ) {
        await readConfigs(dirTree, '.flo', [], parseFloConfig, packFloConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, 1976597026) || !Packet.checkcrc(idx.data, 0, idx.pos, 561308705))) {
                throw new Error('.flo CRC check failed! Custom data detected.');
            }

            jag.write('flo.dat', dat);
            jag.write('flo.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/flo.dat');
            idx.save('data/pack/server/flo.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.spotanim', 'data/pack/server/spotanim.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/spotanim.dat')
    ) {
        await readConfigs(dirTree, '.spotanim', [], parseSpotAnimConfig, packSpotAnimConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, -1279835623) || !Packet.checkcrc(idx.data, 0, idx.pos, -1696140322))) {
                throw new Error('.spotanim CRC check failed! Custom data detected.');
            }

            jag.write('spotanim.dat', dat);
            jag.write('spotanim.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/spotanim.dat');
            idx.save('data/pack/server/spotanim.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.npc', 'data/pack/server/npc.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/npc.dat')
    ) {
        await readConfigs(dirTree, '.npc', [], parseNpcConfig, packNpcConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, -2140681882) || !Packet.checkcrc(idx.data, 0, idx.pos, -1986014643))) {
                throw new Error('.npc CRC check failed! Custom data detected.');
            }

            jag.write('npc.dat', dat);
            jag.write('npc.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/npc.dat');
            idx.save('data/pack/server/npc.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.obj', 'data/pack/server/obj.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/obj.dat')
    ) {
        await readConfigs(dirTree, '.obj', [], parseObjConfig, packObjConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, -840233510) || !Packet.checkcrc(idx.data, 0, idx.pos, 669212954))) {
                throw new Error('.obj CRC check failed! Custom data detected.');
            }

            jag.write('obj.dat', dat);
            jag.write('obj.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/obj.dat');
            idx.save('data/pack/server/obj.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.idk', 'data/pack/server/idk.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/idk.dat')
    ) {
        await readConfigs(dirTree, '.idk', [], parseIdkConfig, packIdkConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, -359342366) || !Packet.checkcrc(idx.data, 0, idx.pos, 667216411))) {
                throw new Error('.idk CRC check failed! Custom data detected.');
            }

            jag.write('idk.dat', dat);
            jag.write('idk.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/idk.dat');
            idx.save('data/pack/server/idk.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient ||
        shouldBuild('data/src/scripts', '.varp', 'data/pack/server/varp.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/varp.dat')
    ) {
        await readConfigs(dirTree, '.varp', [], parseVarpConfig, packVarpConfigs, (dat: Packet, idx: Packet) => {
            if (Environment.BUILD_VERIFY && (!Packet.checkcrc(dat.data, 0, dat.pos, 705633567) || !Packet.checkcrc(idx.data, 0, idx.pos, -1843167599))) {
                throw new Error('.varp CRC check failed! Custom data detected.');
            }

            jag.write('varp.dat', dat);
            jag.write('varp.idx', idx);
        }, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/varp.dat');
            idx.save('data/pack/server/varp.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.hunt', 'data/pack/server/hunt.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/hunt.dat')
    ) {
        await readConfigs(dirTree, '.hunt', [], parseHuntConfig, packHuntConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/hunt.dat');
            idx.save('data/pack/server/hunt.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.varn', 'data/pack/server/varn.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/varn.dat')
    ) {
        await readConfigs(dirTree, '.varn', [], parseVarnConfig, packVarnConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/varn.dat');
            idx.save('data/pack/server/varn.idx');
            dat.release();
            idx.release();
        });
    }

    if (
        shouldBuild('data/src/scripts', '.vars', 'data/pack/server/vars.dat') ||
        shouldBuild('src/lostcity/cache/packconfig', '.ts', 'data/pack/server/vars.dat')
    ) {
        await readConfigs(dirTree, '.vars', [], parseVarsConfig, packVarsConfigs, noOp, (dat: Packet, idx: Packet) => {
            dat.save('data/pack/server/vars.dat');
            idx.save('data/pack/server/vars.idx');
            dat.release();
            idx.release();
        });
    }

    if (rebuildClient) {
        // todo: check the CRC of config.jag as well? (as long as bz2 is identical)
        jag.save('data/pack/client/config');
    }
}
