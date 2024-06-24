import fs from 'fs';

import { startWeb } from '#lostcity/web.js';

import World from '#lostcity/engine/World.js';

import TcpServer from '#lostcity/server/TcpServer.js';
import WSServer from '#lostcity/server/WSServer.js';

import Environment from '#lostcity/util/Environment.js';
import { packClient, packServer } from './cache/packall.js';
import { updateCompiler } from '#lostcity/util/RuneScriptCompiler.js';

if (Environment.UPDATE_ON_STARTUP) {
    await updateCompiler();
}

if (!fs.existsSync('data/pack/client/config')) {
    console.log('Packing cache for the first time, please wait until you see the world is ready.');
    console.log('----');
    await packServer();
    await packClient();
}

fs.mkdirSync('data/players', { recursive: true });

await World.start();

startWeb();

const tcpServer = new TcpServer();
tcpServer.start();

const wsServer = new WSServer();
wsServer.start();

let exiting = false;
process.on('SIGINT', function () {
    if (exiting) {
        return;
    }

    exiting = true;

    if (Environment.LOCAL_DEV) {
        World.rebootTimer(0);
    } else {
        World.rebootTimer(Environment.SHUTDOWN_TIMER as number);
    }
});
