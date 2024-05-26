import child_process from 'child_process';
import { parentPort } from 'worker_threads';

import { packServerInterface } from '#lostcity/tools/packinterface/PackServer.js';
import { packServerMap } from '#lostcity/tools/packmap/PackServer.js';
import { generateServerSymbols } from '#lostcity/tools/pack/symbols.js';
import { packConfigs } from '#lostcity/tools/packconfig/PackShared.js';
import { packWorldmap } from '#lostcity/tools/packmap/Worldmap.js';
import Environment from '#lostcity/util/Environment.js';
import { revalidatePack } from '#lostcity/util/PackFile.js';

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

if (!parentPort) {
    await packServer();
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
            parentPort!.postMessage({ type: 'done' });
            active = false;
        }
    });
}
