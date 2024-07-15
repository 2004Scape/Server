import ClientSocket from './ClientSocket.js';

export default class NullClientSocket extends ClientSocket {
    constructor() {
        super(null, '');
    }

    isTCP() {
        return this.type === ClientSocket.TCP;
    }

    isWebSocket() {
        return this.type === ClientSocket.WEBSOCKET;
    }

    send(data: Uint8Array) {
        if (!this.socket) {
            return;
        }
    }

    // close the connection gracefully
    close() {
        if (!this.socket) {
            return;
        }
    }

    // terminate the connection immediately
    terminate() {
        if (!this.socket) {
            return;
        }
    }

    reset() {
        this.inOffset = 0;
        this.inCount.fill(0);
    }
}
