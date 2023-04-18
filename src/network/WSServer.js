import { WebSocketServer } from 'ws';

import Login from '#engine/Login.js';
import World from '#engine/World.js';

import Packet from '#util/Packet.js';
import ClientWrapper from '#network/ClientWrapper.js';

// TODO: keepalive
export default class WSServer {
    wss = null;

    constructor() {
    }

    start() {
        this.wss = new WebSocketServer({ port: (Number(process.env.GAME_PORT) + 1), host: '0.0.0.0' }, () => {
            console.log(`WSServer listening on :${(Number(process.env.GAME_PORT) + 1)}`);
        });

        this.wss.on('connection', (ws, req) => {
            const ip = req.headers['x-forwarded-for'] ? req.headers['x-forwarded-for'].split(',')[0].trim() : req.connection.remoteAddress;
            console.log(`WSServer connection from ${ip}`);

            let socket = new ClientWrapper(ws, Login.STATE, ip, ClientWrapper.WEBSOCKET);

            let seed = new Packet(8);
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            socket.send(seed.data);

            ws.on('message', (data) => {
                socket.totalBytesRead += data.length;
                data = new Packet(data);

                if (socket.state === Login.STATE) {
                    Login.readIn(socket, data);
                } else if (socket.state === World.STATE) {
                    World.readIn(socket, data);
                } else {
                    socket.close();
                }
            });

            ws.on('close', () => {
                console.log(`WSServer disconnected from ${ip}`);

                if (socket.state === World.STATE) {
                    World.removeBySocket(socket);
                }
            });
        });
    }
}
