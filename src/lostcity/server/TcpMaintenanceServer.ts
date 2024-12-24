import net from 'net';

import Packet from '#jagex/io/Packet.js';

import Environment from '#lostcity/util/Environment.js';
import LoginResponse from '#lostcity/server/LoginResponse.js';

// todo: move into TcpServer
export default class TcpServer {
    tcp: net.Server;

    constructor() {
        this.tcp = net.createServer();
    }

    start() {
        this.tcp.on('connection', (s: net.Socket) => {
            s.setTimeout(60000);
            s.setNoDelay(true);

            const seed = new Packet(new Uint8Array(4 + 4));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            s.write(seed.data);

            s.on('data', (_data: Buffer) => {
                s.write(LoginResponse.SERVER_UPDATING);
                s.end();
            });

            s.on('end', () => {
                s.destroy();
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
