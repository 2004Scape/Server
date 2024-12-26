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
        this.state = -1;

        // give time to flush packets
        setTimeout(() => this.socket.close(), 10);
    }

    terminate(): void {
        this.state = -1;

        // give time to flush packets
        setTimeout(() => this.socket.terminate(), 10);
    }
}
