import { parentPort } from 'worker_threads';
import { packClient, packServer } from '#lostcity/cache/packall.js';

if (!parentPort) {
    process.exit(1);
}

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
