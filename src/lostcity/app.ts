import 'dotenv/config';
import fs from 'fs';

fs.mkdirSync('data/players', { recursive: true });

if (fs.existsSync('dump')) {
    fs.rmSync('dump', { recursive: true, force: true });
    fs.mkdirSync('dump', { recursive: true });
}

import { startWeb } from '#lostcity/web/app.js';

startWeb();

import World from '#lostcity/engine/World.js';

World.start();

import TcpServer from '#lostcity/server/TcpServer.js';
import WSServer from '#lostcity/server/WSServer.js';

import Environment from '#lostcity/util/Environment.js';

if (Environment.GAME_PORT === null) {
    console.error('GAME_PORT is not defined in .env');
    console.error('Please make sure you have a .env file in the main directory, copy and rename .env.example if you don\'t have one');
    process.exit(1);
}

const tcpServer = new TcpServer();
tcpServer.start();

const wsServer = new WSServer();
wsServer.start();

let exiting = false;
process.on('SIGINT', function() {
    if (exiting) {
        return;
    }

    exiting = true;
    if (Environment.LOCAL_DEV) {
        World.shutdownTick = World.currentTick; // shutdown asap
    } else {
        World.shutdownTick = World.currentTick + 50; // shutdown in 30 seconds
    }
});
