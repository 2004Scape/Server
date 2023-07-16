import { WebSocketServer, Event } from 'ws';

import ClientSocket from '#lostcity/server/ClientSocket.js';
import Packet from '#jagex2/io/Packet.js';
import World from '#lostcity/engine/World.js';
import Login from '#lostcity/engine/Login.js';
import { IncomingMessage } from 'http';

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
            console.log(`[WSWorld]: Listening on port ${Number(process.env.GAME_PORT) + 1}`);
        });

        this.wss.on('connection', (ws, req) => {
            const ip = getIp(req);
            console.log(`[WSWorld]: Connection from ${ip}`);

            const socket = new ClientSocket(ws, ip, ClientSocket.WEBSOCKET);

            const seed = new Packet(8);
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            socket.send(seed.data);

            // TODO (jkm) add a type for this
            ws.on('message', (data: any) => {
                const packet = new Packet(data);

                if (socket.state === 1) {
                    World.readIn(socket, packet);
                } else {
                    Login.readIn(socket, packet);
                }
            });

            ws.on('close', () => {
                if (socket.state === 1) {
                    World.removePlayerBySocket(socket);
                }

                console.log(`[WSWorld]: Disconnected from ${ip}`);
            });
        });
    }
}
