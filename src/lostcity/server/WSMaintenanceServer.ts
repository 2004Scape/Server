import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';

import Packet from '#jagex/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import Environment from '#lostcity/util/Environment.js';
import LoginResponse from '#lostcity/server/LoginResponse.js';

function getIp(req: IncomingMessage) {
    let forwardedFor = req.headers['x-forwarded-for'];

    if (!forwardedFor) {
        return req.connection.remoteAddress;
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
        const port = (Environment.NODE_PORT as number) + 1;

        this.wss = new WebSocketServer({ port, host: '0.0.0.0' }, () => {
        });

        this.wss.on('connection', (ws, req) => {
            const ip: string = getIp(req) ?? 'unknown';

            const socket = new ClientSocket(ws, ip, ClientSocket.WEBSOCKET);

            const seed = new Packet(new Uint8Array(4 + 4));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            socket.send(seed.data);

            ws.on('message', (data: any) => {
                socket.send(LoginResponse.SERVER_UPDATING);
                socket.close();
            });

            ws.on('close', () => {
            });
        });
    }
}
