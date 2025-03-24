import http from 'http';

import { WebSocketServer, WebSocket } from 'ws';

import Packet from '#/io/Packet.js';

// todo: websocket keepalives
export default class WSMaintenanceServer {
    wss: WebSocketServer | null = null;

    start(server: http.Server) {
        this.wss = new WebSocketServer({
            server,
            perMessageDeflate: false
        });

        this.wss.on('connection', (ws: WebSocket) => {
            // todo: connection negotation feature flag
            const seed = new Packet(new Uint8Array(8));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            ws.send(seed.data);

            ws.on('message', () => {
                ws.send(Uint8Array.from([14]));
            });

            ws.on('close', () => {});

            ws.on('error', () => {
                ws.terminate();
            });
        });
    }
}
