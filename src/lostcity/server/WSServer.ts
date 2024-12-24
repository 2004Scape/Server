import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

import Packet from '#jagex/io/Packet.js';

import Environment from '#lostcity/util/Environment.js';
import NullClientSocket from '#lostcity/server/NullClientSocket.js';
import WSClientSocket from '#lostcity/server/WSClientSocket.js';
import Login from '#lostcity/engine/Login.js';

function getIp(req: IncomingMessage) {
    let forwardedFor = req.headers['x-forwarded-for'];

    if (!forwardedFor) {
        return req.socket.remoteAddress;
    }

    if (Array.isArray(forwardedFor)) {
        forwardedFor = forwardedFor[0];
    }

    return forwardedFor.split(',')[0].trim();
}

// TODO: keepalives
export default class WSServer {
    wss: WebSocketServer | null = null;

    start() {
        const port = Environment.NODE_PORT + 1;

        this.wss = new WebSocketServer({ port, host: '0.0.0.0' }, () => {
        });

        this.wss.on('connection', (ws: WebSocket, req) => {
            const socket = new WSClientSocket(ws, getIp(req) ?? 'unknown');
            Login.clients.set(socket.uuid, socket);

            // todo: connection negotation feature flag
            const seed = new Packet(new Uint8Array(8));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            socket.send(seed.data);
            socket.state = 0;

            ws.on('message', (data: Buffer) => {
                if (socket.state !== -1) {
                    socket.buffer(data);
                }
            });

            ws.on('close', () => {
                socket.state = -1;

                if (socket.player) {
                    socket.player.client = new NullClientSocket();
                }
            });

            ws.on('error', () => {
                ws.terminate();
            });
        });
    }
}
