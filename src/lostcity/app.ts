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

const tcpServer = new TcpServer();
tcpServer.start();

const wsServer = new WSServer();
wsServer.start();
