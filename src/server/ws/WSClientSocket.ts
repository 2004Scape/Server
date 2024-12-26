import { WebSocket } from 'ws';

import ClientSocket from '#/server/ClientSocket.js';

export default class WSClientSocket extends ClientSocket {
    socket: WebSocket;

    constructor(socket: WebSocket, remoteAddress: string) {
        super();

        this.socket = socket;
        this.remoteAddress = remoteAddress;
    }

    send(src: Uint8Array): void {
        this.socket.send(src);
    }

    close(): void {
        // give time to acknowledge and receive packets
        this.state = -1;
        setTimeout(() => this.socket.close(), 1000);
    }

    terminate(): void {
        this.state = -1;
        this.socket.terminate();
    }
}
