import net from 'net';

import Packet from '#/io/Packet.js';

import Environment from '#/util/Environment.js';

export default class TcpMaintenanceServer {
    tcp: net.Server;

    constructor() {
        this.tcp = net.createServer();
    }

    start() {
        this.tcp.on('connection', (s: net.Socket) => {
            s.setTimeout(30000);
            s.setNoDelay(true);

            // todo: connection negotiation feature flag
            const seed = new Packet(new Uint8Array(8));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            seed.p4(Math.floor(Math.random() * 0xffffffff));
            s.write(seed.data);

            s.on('data', () => {
                s.write(Uint8Array.from([ 14 ]));
            });

            s.on('close', () => {
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
