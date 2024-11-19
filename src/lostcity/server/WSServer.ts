import { WebSocketServer, WebSocket } from 'ws';
import { IncomingMessage } from 'http';

import Packet from '#jagex/io/Packet.js';

import Login from '#lostcity/engine/Login.js';
import World from '#lostcity/engine/World.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import Environment from '#lostcity/util/Environment.js';

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
        const port = Environment.NODE_PORT + 1;

        this.wss = new WebSocketServer({ port, host: '0.0.0.0' }, () => {
        });

        this.wss.on('connection', (ws: WebSocket, req) => {
            const ip: string = getIp(req) ?? 'unknown';

            const socket = new ClientSocket(ws, ip, ClientSocket.WEBSOCKET);

            const seed = new Packet(new Uint8Array(4 + 4));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            socket.send(seed.data);

            ws.on('message', (data: Buffer) => {
                const packet = new Packet(new Uint8Array(data));

                try {
                    if (socket.state === 1) {
                        World.readIn(socket, packet);
                    } else {
                        Login.readIn(socket, packet);
                    }
                } catch (err) {
                    socket.close();
                }
            });

            ws.on('close', () => {
                if (socket.player) {
                    socket.player.client = null;
                }
            });

            ws.on('error', () => {
                socket.terminate();
            });
        });
    }
}
