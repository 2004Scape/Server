import { WebSocketServer } from 'ws';
import { IncomingMessage } from 'http';

import Packet from '#jagex2/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

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
        this.wss = new WebSocketServer({ port: (Number(process.env.GAME_PORT) + 1), host: '0.0.0.0' }, () => {
            console.log(`[WSMaintenance]: Listening on port ${Number(process.env.GAME_PORT) + 1}`);
        });

        this.wss.on('connection', (ws, req) => {
            const ip = getIp(req);
            console.log(`[WSMaintenance]: Connection from ${ip}`);

            const socket = new ClientSocket(ws, ip, ClientSocket.WEBSOCKET);

            const seed = Packet.alloc(8);
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            socket.send(seed.data);

            ws.on('message', (data: any) => {
                socket.send(Uint8Array.from([14]));
                socket.close();
            });

            ws.on('close', () => {
                console.log(`[WSMaintenance]: Disconnected from ${ip}`);
            });
        });
    }
}
