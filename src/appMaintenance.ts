import TcpMaintenanceServer from '#/server/tcp/TcpMaintenanceServer.js';
import WSMaintenanceServer from '#/server/ws/WSMaintenanceServer.js';
import { startWeb } from '#/web.js';

startWeb();

const tcpServer = new TcpMaintenanceServer();
tcpServer.start();

const wsServer = new WSMaintenanceServer();
wsServer.start();
