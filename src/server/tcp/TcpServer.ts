import net from 'net';

import Packet from '#/io/Packet.js';

import Environment from '#/util/Environment.js';
import NullClientSocket from '#/server/NullClientSocket.js';
import TcpClientSocket from '#/server/tcp/TcpClientSocket.js';

export default class TcpServer {
    tcp: net.Server;

    constructor() {
        this.tcp = net.createServer();
    }

    start() {
        this.tcp.on('connection', (s: net.Socket) => {
            s.setTimeout(60000);
            s.setNoDelay(true);

            const socket = new TcpClientSocket(s, s.remoteAddress ?? 'unknown');

            // todo: connection negotiation feature flag
            const seed = new Packet(new Uint8Array(8));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            socket.send(seed.data);
            socket.state = 0;

            s.on('data', (data: Buffer) => {
                if (socket.state !== -1) {
                    socket.buffer(data);
                }
            });

            s.on('close', () => {
                socket.state = -1;

                if (socket.player) {
                    socket.player.client = new NullClientSocket();
                }
            });

            s.on('error', () => {
                s.destroy();
            });

            s.on('timeout', () => {
                s.destroy();
            });
        });

        this.tcp.listen(Environment.NODE_PORT, '0.0.0.0', () => {
        });
    }
}
