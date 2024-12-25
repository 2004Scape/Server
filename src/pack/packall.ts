import fs from 'fs';
import child_process from 'child_process';
import { parentPort } from 'worker_threads';

import { packServerInterface } from '#/pack/interface/PackServer.js';
import { packServerMap } from '#/pack/map/PackServer.js';
import { generateServerSymbols } from '#/pack/symbols.js';
import { packConfigs } from '#/pack/config/PackShared.js';
import { packWorldmap } from '#/pack/map/Worldmap.js';
import Environment from '#/util/Environment.js';
import { revalidatePack } from '#/util/PackFile.js';

import { packClientInterface } from '#/pack/interface/PackClient.js';
import { packClientMap } from '#/pack/map/PackClient.js';
import { packClientModel } from '#/pack/graphics/pack.js';
import { packClientMusic } from '#/pack/midi/pack.js';
import { packClientSound } from '#/pack/sound/pack.js';
import { packClientWordenc } from '#/pack/chat/pack.js';
import { packClientTitle } from '#/pack/sprite/title.js';
import { packClientTexture } from '#/pack/sprite/textures.js';
import { packClientMedia } from '#/pack/sprite/media.js';
import { CrcBuffer } from '#/cache/CrcTable.js';

export async function packServer() {
    if (!fs.existsSync('RuneScriptCompiler.jar')) {
        throw new Error('The RuneScript compiler is missing and the build process cannot continue.');
    }

    if (parentPort) {
        parentPort.postMessage({
            type: 'dev_progress',
            broadcast: 'Packing server cache (1/2)'
        });
    }

    revalidatePack();
    await packConfigs();
    packServerInterface();

    packServerMap();
    await packWorldmap();

    generateServerSymbols();

    if (parentPort) {
        parentPort.postMessage({
            type: 'dev_progress',
            text: 'Compiling server scripts'
        });
    }

    try {
        child_process.execSync(`"${Environment.BUILD_JAVA_PATH}" -jar RuneScriptCompiler.jar`, { stdio: 'inherit' });
    } catch (err) {
        throw new Error('Failed to compile scripts.');
    }

    if (parentPort) {
        parentPort.postMessage({
            type: 'dev_progress',
            text: 'Packed server cache (1/2)'
        });
    }

    fs.writeFileSync('data/pack/server/lastbuild.pack', '');
}

export async function packClient() {
    if (parentPort) {
        parentPort.postMessage({
            type: 'dev_progress',
            broadcast: 'Packing client cache (2/2)'
        });
    }

    await packClientTitle();
    packClientInterface();
    await packClientMedia();
    packClientModel();
    await packClientTexture();
    packClientWordenc();
    packClientSound();
    
    packClientMap();
    packClientMusic();

    if (parentPort) {
        parentPort.postMessage({
            type: 'dev_progress',
            text: 'Packed client cache (2/2)'
        });
    }

    fs.writeFileSync('data/pack/client/crc', CrcBuffer.data);
    fs.writeFileSync('data/pack/client/lastbuild.pack', '');
}
