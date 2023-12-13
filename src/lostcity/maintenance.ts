import 'dotenv/config';

import { startWeb } from '#lostcity/web/app.js';

startWeb();

import TcpMaintenanceServer from '#lostcity/server/TcpMaintenanceServer.js';
import WSMaintenanceServer from '#lostcity/server/WSMaintenanceServer.js';

import Environment from '#lostcity/util/Environment.js';

if (Environment.LOCAL_DEV) {
    console.error('GAME_PORT is not defined in .env');
    console.error('Please make sure you have a .env file in the server root directory, copy it from .env.example if you don\'t have one');
    process.exit(1);
}

const tcpServer = new TcpMaintenanceServer();
tcpServer.start();

const wsServer = new WSMaintenanceServer();
wsServer.start();
