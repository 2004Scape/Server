import net, { Server } from 'net';

import Packet from '#jagex/io/Packet.js';

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
            s.setTimeout(60000);
            s.setNoDelay(true);

            const ip: string = s.remoteAddress ?? 'unknown';

            const socket = new ClientSocket(s, ip, ClientSocket.TCP);

            const seed = new Packet(new Uint8Array(4 + 4));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            socket.send(seed.data);

            s.on('data', (data: Buffer) => {
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

            s.on('close', () => {
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

        this.tcp.listen(Environment.NODE_PORT, '0.0.0.0', () => {
        });
    }
}
