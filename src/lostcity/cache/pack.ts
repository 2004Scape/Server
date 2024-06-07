import { parentPort } from 'worker_threads';
import { packClient, packServer } from '#lostcity/cache/packall.js';
import Environment from '#lostcity/util/Environment.js';
import { updateCompiler } from '#lostcity/util/RuneScriptCompiler.js';

if (!parentPort) {
    if (Environment.UPDATE_ON_STARTUP) {
        await updateCompiler();
    }

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
