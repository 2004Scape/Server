import { startWeb } from '#lostcity/web.js';

startWeb();

import TcpMaintenanceServer from '#lostcity/server/TcpMaintenanceServer.js';
import WSMaintenanceServer from '#lostcity/server/WSMaintenanceServer.js';

const tcpServer = new TcpMaintenanceServer();
tcpServer.start();

const wsServer = new WSMaintenanceServer();
wsServer.start();
