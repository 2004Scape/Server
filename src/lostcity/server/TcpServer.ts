import net, { Server } from 'net';

import Packet from '#jagex2/io/Packet.js';
import Packet2 from '#jagex2/io/Packet2.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import Login from '#lostcity/engine/Login.js';
import World from '#lostcity/engine/World.js';

import Environment from '#lostcity/util/Environment.js';

export default class TcpServer {
    tcp: Server;

    constructor() {
        this.tcp = net.createServer();
    }

    start() {
        this.tcp.on('connection', (s: net.Socket) => {
            s.setTimeout(30000);
            s.setNoDelay(true);

            const ip: string = s.remoteAddress ?? 'unknown';
            console.log(`[World]: Connection from ${ip}`);

            const socket = new ClientSocket(s, ip, ClientSocket.TCP);

            const seed = Packet.alloc(8);
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            socket.send(seed.data);

            s.on('data', async (data: Buffer) => {
                // const packet = new Packet2(data);

                if (socket.state === 1) {
                    await World.readIn(socket, new Packet(data));
                } else {
                    await Login.readIn(socket, new Packet2(new Uint8Array(data)));
                }
            });

            s.on('close', () => {
                console.log(`[World]: Disconnected from ${socket.remoteAddress}`);

                if (socket.player) {
                    socket.player.client = null;
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

        this.tcp.listen(Environment.GAME_PORT as number, '0.0.0.0', () => {
            console.log(`[World]: Listening on port ${Environment.GAME_PORT}`);
        });
    }
}
