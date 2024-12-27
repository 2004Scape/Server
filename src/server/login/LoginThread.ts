import { parentPort } from 'worker_threads';

import LoginClient from '#/server/login/LoginClient.js';

import Environment from '#/util/Environment.js';

if (!parentPort) {
    throw new Error('LoginThread must be ran as a worker.');
}

const client = new LoginClient(Environment.NODE_ID);

parentPort.on('message', async (msg) => {
});
