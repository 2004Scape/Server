import net, { Server } from 'net';

import Packet from '#jagex2/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

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
            console.log(`[Maintenance]: Connection from ${ip}`);

            const socket = new ClientSocket(s, ip, ClientSocket.TCP);

            const seed = Packet.alloc(8);
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            socket.send(seed.data);

            s.on('data', (data: Buffer) => {
                socket.send(Uint8Array.from([14]));
                socket.close();
            });

            s.on('close', () => {
                console.log(`[Maintenance]: Disconnected from ${socket.remoteAddress}`);
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
            console.log(`[Maintenance]: Listening on port ${Number(process.env.GAME_PORT)}`);
        });
    }
}
