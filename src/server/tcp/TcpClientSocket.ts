import net from 'net';

import ClientSocket from '#/server/ClientSocket.js';

export default class TcpClientSocket extends ClientSocket {
    socket: net.Socket;

    constructor(socket: net.Socket, remoteAddress: string) {
        super();

        this.socket = socket;
        this.remoteAddress = remoteAddress;
    }

    send(src: Uint8Array): void {
        this.socket.write(src);
    }

    close(): void {
        this.state = -1;

        setTimeout(() => this.socket.end(), 10);
    }

    terminate(): void {
        this.state = -1;

        setTimeout(() => this.socket.destroy(), 10);
    }
}
