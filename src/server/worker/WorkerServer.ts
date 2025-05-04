import World from '#/engine/World.js';
import Packet from '#/io/Packet.js';
import ClientSocket from '#/server/ClientSocket.js';
import NullClientSocket from '#/server/NullClientSocket.js';
import WorkerClientSocket from '#/server/worker/WorkerClientSocket.js';
import Environment from '#/util/Environment.js';

export default class WorkerServer {
    sockets: Map<string, ClientSocket> = new Map();

    constructor() {}

    start() {
        self.onmessage = (e: MessageEvent) => {
            const socket = this.sockets.get(e.data.id);

            switch (e.data.type) {
                case 'connection': {
                    const socket = new WorkerClientSocket(self, e.data.id);
                    this.sockets.set(e.data.id, socket);

                    if (Environment.ENGINE_REVISION <= 225) {
                        const seed = new Packet(new Uint8Array(8));
                        seed.p4(Math.floor(Math.random() * 0xffffffff));
                        seed.p4(Math.floor(Math.random() * 0xffffffff));
                        socket.send(seed.data);
                    }
                    break;
                }
                case 'data': {
                    if (socket) {
                        socket.buffer(e.data.data);
                        World.onClientData(socket);
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
