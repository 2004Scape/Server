import fs from 'fs';

import { startManagementWeb, startWeb } from '#/web.js';

import World from '#/engine/World.js';

import { packClient, packServer } from '#/cache/PackAll.js';

import TcpServer from '#/server/tcp/TcpServer.js';
import WSServer from '#/server/ws/WSServer.js';

import Environment from '#/util/Environment.js';
import { printError, printInfo } from '#/util/Logger.js';
import { updateCompiler } from '#/util/RuneScriptCompiler.js';
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

// unfortunately, tsx watch is not giving us a way to gracefully shut down in our dev mode:
// https://github.com/privatenumber/tsx/issues/494
let exiting = false;
function safeExit() {
    if (exiting) {
        return;
    }

    exiting = true;

    if (Environment.NODE_PRODUCTION) {
        World.rebootTimer(Environment.NODE_KILLTIMER as number);
    } else {
        World.rebootTimer(0);
    }
}

process.on('SIGINT', safeExit);
process.on('SIGTERM', safeExit);
