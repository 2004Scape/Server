import Packet from '#jagex2/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import Login from '#lostcity/engine/Login.js';
import World from '#lostcity/engine/World.js';

export default class WorkerServer {
    socket: ClientSocket = new ClientSocket(self.crypto.randomUUID(), null, '127.0.0.1');

    constructor() {}

    start() {
        const seed = new Packet(new Uint8Array(4 + 4));
        seed.p4(Math.floor(Math.random() * 0xffffffff));
        seed.p4(Math.floor(Math.random() * 0xffffffff));
        this.socket.send(seed.data);

        self.onmessage = async (e: MessageEvent) => {
            const packet = new Packet(new Uint8Array(e.data));
            switch (e.data.type) {
                // TODO: are these needed later?
                // case 'close':
                //     if (this.socket.player) {
                //         this.socket.player.client = null;
                //     }
                //     break;
                // case 'error':
                //     this.socket.close();
                //     break;
                default:
                    try {
                        if (this.socket.state === 1) {
                            await World.readIn(this.socket, packet);
                        } else {
                            await Login.readIn(this.socket, packet);
                        }
                    } catch (err) {
                        this.socket.close();
                    }
                    break;
            }
        };
    }
}
