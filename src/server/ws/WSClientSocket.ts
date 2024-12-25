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
        this.socket.close();
    }

    terminate(): void {
        this.socket.terminate();
    }
}
