import { WebSocketServer } from 'ws';

import Packet from '#jagex/io/Packet.js';

import Environment from '#lostcity/util/Environment.js';
import LoginResponse from '#lostcity/server/LoginResponse.js';

// todo: move into WSServer
export default class WSMaintenanceServer {
    wss: WebSocketServer | null = null;

    start() {
        const port = Environment.NODE_PORT + 1;

        this.wss = new WebSocketServer({ port, host: '0.0.0.0' }, () => {
        });

        this.wss.on('connection', (ws, req) => {
            const seed = new Packet(new Uint8Array(8));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            ws.send(seed.data);

            ws.on('message', () => {
                ws.send(LoginResponse.SERVER_UPDATING);
                ws.close();
            });

            ws.on('error', () => {
            });
        });
    }
}
