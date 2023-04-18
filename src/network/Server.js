import net from 'net';

import Login from '#engine/Login.js';
import World from '#engine/World.js';

import Packet from '#util/Packet.js';
import ClientWrapper from '#network/ClientWrapper.js';

export default class Server {
    tcp = null;

    constructor() {
        this.tcp = net.createServer();
    }

    start() {
        this.tcp.on('connection', (s) => {
            s.setTimeout(30000);
            s.setNoDelay(true);

            const ip = s.remoteAddress;
            console.log(`Server connection from ${ip}`);

            let socket = new ClientWrapper(s, Login.STATE, ip, ClientWrapper.TCP);

            let seed = new Packet(8);
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            seed.p4(Math.floor(Math.random() * 0xFFFFFFFF));
            socket.send(seed.data);

            s.on('data', async (data) => {
                socket.totalBytesRead += data.length;
                data = new Packet(data);

                if (socket.state === Login.STATE) {
                    await Login.readIn(socket, data);
                } else if (socket.state === World.STATE) {
                    World.readIn(socket, data);
                } else {
                    socket.close();
                }
            });

            s.on('close', () => {
                console.log(`Server disconnected from ${socket.remoteAddress}`);

                if (socket.state === World.STATE) {
                    World.removeBySocket(socket);
                }
            });

            s.on('end', () => {
                socket.terminate();
            });

            s.on('error', (err) => {
                socket.terminate();
            });

            s.on('timeout', () => {
                socket.terminate();
            });
        });

        this.tcp.listen(Number(process.env.GAME_PORT), '0.0.0.0', () => {
            console.log(`Server listening on :${Number(process.env.GAME_PORT)}`);
        });
    }
}
