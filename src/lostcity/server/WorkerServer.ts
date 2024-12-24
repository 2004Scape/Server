import Packet from '#jagex/io/Packet.js';

import ClientSocket from '#lostcity/server/ClientSocket.js';

import NullClientSocket from '#lostcity/server/NullClientSocket.js';
import WorkerClientSocket from '#lostcity/server/WorkerClientSocket.js';

export default class WorkerServer {
    sockets: Map<string, ClientSocket> = new Map();

    constructor() {}

    start() {
        self.onmessage = (e: MessageEvent) => {
            const socket = this.sockets.get(e.data.id);

            switch (e.data.type) {
                case 'connection': {
                    this.sockets.set(e.data.id, new WorkerClientSocket(self, e.data.id));

                    // todo: connection negotation feature flag
                    const seed = new Packet(new Uint8Array(8));
                    seed.p4(Math.floor(Math.random() * 0xffffffff));
                    seed.p4(Math.floor(Math.random() * 0xffffffff));

                    this.sockets.get(e.data.id)?.send(seed.data);
                    break;
                }
                case 'data': {
                    if (socket) {
                        socket.buffer(e.data.data);
                    }
                    break;
                }
                case 'close': {
                    if (socket) {
                        if (socket.player) {
                            socket.player.client = new NullClientSocket();
                        }
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
