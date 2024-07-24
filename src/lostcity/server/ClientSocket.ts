import { randomUUID } from 'crypto';
import { Socket } from 'net';
import { WebSocket } from 'ws';

import Isaac from '#jagex2/io/Isaac.js';
import Packet from '#jagex2/io/Packet.js';

import { NetworkPlayer } from '#lostcity/entity/NetworkPlayer.js';

export default class ClientSocket {
    static TCP = 0;
    static WEBSOCKET = 1;

    socket: Socket | WebSocket | DedicatedWorkerGlobalScope | null = null;
    type = -1;
    state = -1;
    remoteAddress: string;
    totalBytesRead = 0;
    totalBytesWritten = 0;
    uniqueId: string;

    encryptor: Isaac | null = null;
    decryptor: Isaac | null = null;

    // we only want to receive 5KB per tick to mitigate bad actors
    in = new Uint8Array(5000);
    inOffset = 0;

    // we limit the amount of packets we receive per opcode (no more than 10) to mitigate bad actors
    inCount = new Uint8Array(256);

    // packets are flushed in up to 5KB chunks
    // out = new Uint8Array(5000);
    // outOffset = 0;
    out: Packet = new Packet(new Uint8Array(5000));

    player: NetworkPlayer | null = null;

    constructor(socket: Socket | WebSocket | DedicatedWorkerGlobalScope | null, remoteAddress: string, type = ClientSocket.TCP, state = -1, uniqueId: string = randomUUID()) {
        this.socket = socket;
        this.remoteAddress = remoteAddress;
        this.type = type;
        this.state = state;
        this.uniqueId = uniqueId;
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

        this.totalBytesWritten += data.length;
        if (this.isTCP()) {
            (this.socket as Socket).write(data);
        } else if (this.isWebSocket()) {
            (this.socket as WebSocket).send(data);
        } else if (typeof self !== 'undefined') {
            (this.socket as DedicatedWorkerGlobalScope).postMessage({ type: 'data', data: data, id: this.uniqueId });
        }
    }

    // close the connection gracefully
    close() {
        if (!this.socket) {
            return;
        }

        setTimeout(() => {
            if (this.isTCP()) {
                (this.socket as Socket).end();
            } else if (this.isWebSocket()) {
                (this.socket as WebSocket).close();
            } else if (typeof self !== 'undefined') {
                (this.socket as DedicatedWorkerGlobalScope).postMessage({ type: 'close', id: this.uniqueId });
            }
        }, 100);
    }

    // terminate the connection immediately
    terminate() {
        if (!this.socket) {
            return;
        }

        if (this.isTCP()) {
            (this.socket as Socket).destroy();
        } else if (this.isWebSocket()) {
            (this.socket as WebSocket).terminate();
        } else if (typeof self !== 'undefined') {
            (this.socket as DedicatedWorkerGlobalScope).postMessage({ type: 'close', id: this.uniqueId });
        }
    }

    reset() {
        this.inOffset = 0;
        this.inCount.fill(0);
    }

    writeImmediate(data: Uint8Array) {
        this.send(data);
    }

    flush() {
        const out = this.out;
        if (out.pos === 0) {
            return;
        }
        this.send(out.data.subarray(0, out.pos));
        out.pos = 0;
    }
}
