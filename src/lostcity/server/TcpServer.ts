import net, { Server } from 'net';

import Packet from '#jagex2/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import Login from '#lostcity/engine/Login.js';
import World from '#lostcity/engine/World.js';

export default class TcpServer {
    tcp: Server;

    constructor() {
        this.tcp = net.createServer();
    }

    start() {
        this.tcp.on('connection', (s) => {
            s.setTimeout(30000);
            s.setNoDelay(true);

            const ip = s.remoteAddress;
            console.log(`[World]: Connection from ${ip}`);

            const socket = new ClientSocket(s, ip, ClientSocket.TCP);

            const seed = Packet.alloc(8);
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            socket.send(seed.data);

            s.on('data', (data: Buffer) => {
                const packet = new Packet(data);

                if (socket.state === 1) {
                    World.readIn(socket, packet);
                } else {
                    Login.readIn(socket, packet);
                }
            });

            s.on('close', () => {
                console.log(`[World]: Disconnected from ${socket.remoteAddress}`);

                if (socket.player) {
                    socket.player.logoutRequested = true;
                }
            });

            s.on('end', () => {
                socket.terminate();
            });

            s.on('error', (/* err */) => {
                socket.terminate();
            });

            s.on('timeout', () => {
                socket.terminate();
            });
        });

        this.tcp.listen(Number(process.env.GAME_PORT), '0.0.0.0', () => {
            console.log(`[World]: Listening on port ${Number(process.env.GAME_PORT)}`);
        });
    }
}
