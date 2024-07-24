import Packet from '#jagex2/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import Login from '#lostcity/engine/Login.js';
import World from '#lostcity/engine/World.js';

export default class WorkerServer {
    sockets: Map<string, ClientSocket> = new Map();

    constructor() {}

    start() {
        self.onmessage = async (e: MessageEvent) => {
            const packet = new Packet(new Uint8Array(e.data.data));
            const socket = this.sockets.get(e.data.id);

            switch (e.data.type) {
                case 'connection': {
                    this.sockets.set(e.data.id, new ClientSocket(self, '127.0.0.1', -1, -1, e.data.id));

                    const seed = new Packet(new Uint8Array(4 + 4));
                    seed.p4(Math.floor(Math.random() * 0xffffffff));
                    seed.p4(Math.floor(Math.random() * 0xffffffff));

                    this.sockets.get(e.data.id)?.send(seed.data);
                    break;
                }
                case 'data': {
                    if (socket) {
                        try {
                            if (socket.state === 1) {
                                await World.readIn(socket, packet);
                            } else {
                                await Login.readIn(socket, packet);
                            }
                        } catch (err) {
                            console.log('error', err);
                            socket.close();
                            this.sockets.delete(e.data.id);
                        }
                    }
                    break;
                }
                case 'close': {
                    if (socket) {
                        if (socket.player) {
                            socket.player.client = null;
                        }
                        socket.close();
                        this.sockets.delete(e.data.id);
                    }
                    break;
                }
            }
        };

        self.onerror = async (e: Event) => {
            console.log(e);
        };

        self.onmessageerror = async (e: MessageEvent) => {
            console.log(e);
            this.sockets.get(e.data.id)?.close();
            this.sockets.delete(e.data.id);
        };
    }
}
