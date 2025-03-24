import child_process from 'child_process';
import fs from 'fs';
import { parentPort } from 'worker_threads';

import { CrcBuffer } from '#/cache/CrcTable.js';
import Environment from '#/util/Environment.js';
import { revalidatePack } from '#/util/PackFile.js';
import { packClientWordenc } from '#tools/pack/chat/pack.js';
import { packConfigs } from '#tools/pack/config/PackShared.js';
import { packClientModel } from '#tools/pack/graphics/pack.js';
import { packClientInterface } from '#tools/pack/interface/PackClient.js';
import { packServerInterface } from '#tools/pack/interface/PackServer.js';
import { packClientMap } from '#tools/pack/map/PackClient.js';
import { packServerMap } from '#tools/pack/map/PackServer.js';
import { packWorldmap } from '#tools/pack/map/Worldmap.js';
import { packClientMusic } from '#tools/pack/midi/pack.js';
import { packClientSound } from '#tools/pack/sound/pack.js';
import { packClientMedia } from '#tools/pack/sprite/media.js';
import { packClientTexture } from '#tools/pack/sprite/textures.js';
import { packClientTitle } from '#tools/pack/sprite/title.js';
import { generateServerSymbols } from '#tools/pack/symbols.js';

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
    } catch (_err) {
        // console.error(err);
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
