import fs from 'fs';

import { startManagementWeb, startWeb } from '#lostcity/web.js';

import World from '#lostcity/engine/World.js';

import { packClient, packServer } from '#lostcity/pack/packall.js';

import TcpServer from '#lostcity/server/TcpServer.js';
import WSServer from '#lostcity/server/WSServer.js';

import Environment from '#lostcity/util/Environment.js';
import { printError, printInfo } from '#lostcity/util/Logger.js';
import { updateCompiler } from '#lostcity/util/RuneScriptCompiler.js';
import { collectDefaultMetrics, register } from 'prom-client';

if (Environment.BUILD_STARTUP_UPDATE) {
    await updateCompiler();
}

if (!fs.existsSync('data/pack/client/config') || !fs.existsSync('data/pack/server/script.dat')) {
    printInfo('Packing cache, please wait until you see the world is ready.');

    try {
        await packServer();
        await packClient();
    } catch (err) {
        if (err instanceof Error) {
            printError(err.message);
        }
    
        process.exit(1);
    }
}

fs.mkdirSync('data/players', { recursive: true });

await World.start();

startWeb();
startManagementWeb();

register.setDefaultLabels({nodeId: Environment.NODE_ID});
collectDefaultMetrics({register});

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

    if (Environment.NODE_PRODUCTION) {
        World.rebootTimer(Environment.NODE_KILLTIMER as number);
    } else {
        World.rebootTimer(0);
    }
});
