import LoginClient from '#/server/login/LoginClient.js';
import { parentPort } from 'worker_threads';

if (!parentPort) {
    throw new Error('LoginThread must be ran as a worker.');
}

const client = new LoginClient();

parentPort.on('message', async (msg) => {
});
