import child_process from 'child_process';
import { parentPort } from 'worker_threads';

import { packServerInterface } from '#lostcity/tools/packinterface/PackServer.js';
import { packServerMap } from '#lostcity/tools/packmap/PackServer.js';
import { generateServerSymbols } from '#lostcity/tools/pack/symbols.js';
import { packConfigs } from '#lostcity/tools/packconfig/PackShared.js';
import { packWorldmap } from '#lostcity/tools/packmap/Worldmap.js';
import Environment from '#lostcity/util/Environment.js';
import { revalidatePack } from '#lostcity/util/PackFile.js';

import { packClientInterface } from '#lostcity/tools/packinterface/PackClient.js';
import { packClientMap } from '#lostcity/tools/packmap/PackClient.js';
import { packClientModel } from '#lostcity/tools/client/models/pack.js';
import { packClientMusic } from '#lostcity/tools/client/music/pack.js';
import { packClientSound } from '#lostcity/tools/client/sounds/pack.js';
import { packClientWordenc } from '#lostcity/tools/client/wordenc/pack.js';
import { packClientTitle } from '#lostcity/tools/client/title/pack.js';
import { packClientTexture } from '#lostcity/tools/client/textures/pack.js';
import { packClientMedia } from '#lostcity/tools/client/media/pack.js';

async function packServer() {
    console.time('packing server...');
    try {
        revalidatePack();
        packConfigs();
        packServerInterface();

        packServerMap();
        await packWorldmap();

        generateServerSymbols();
    } catch (err) {
        console.error(err);
    }

    try {
        child_process.execSync(`"${Environment.JAVA_PATH}" -jar RuneScriptCompiler.jar`, { stdio: 'inherit' });
    } catch (err) {
        process.exit(1);
    }
    console.timeEnd('packing server...');
}

async function packClient() {
    console.time('packing client...');
    await packClientTitle();
    packConfigs();
    packClientInterface();
    await packClientMedia();
    packClientModel();
    await packClientTexture();
    packClientWordenc();
    packClientSound();
    
    packClientMap();
    packClientMusic();
    console.timeEnd('packing client...');
}

if (!parentPort) {
    await packServer();
    await packClient();
}

if (parentPort) {
    let active: boolean = false;

    parentPort.on('message', async msg => {
        if (active) {
            return;
        }

        if (msg.type === 'pack') {
            active = true;
            await packServer();
            await packClient();
            parentPort!.postMessage({ type: 'done' });
            active = false;
        }
    });
}
