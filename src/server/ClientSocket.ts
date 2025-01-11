import { randomUUID } from 'crypto';

import Isaac from '#/io/Isaac.js';
import Packet from '#/io/Packet.js';

import { NetworkPlayer } from '#/engine/entity/NetworkPlayer.js';

export default abstract class ClientSocket {
    uuid = randomUUID();
    remoteAddress = 'unknown';
    totalBytesRead = 0;
    totalBytesWritten = 0;

    state = 0;
    player: NetworkPlayer | null = null;
    encryptor: Isaac | null = null;
    decryptor: Isaac | null = null;

    in = Packet.alloc(65535); // node won't let us read from the socket as a stream so we buffer it ourselves
    out = Packet.alloc(1);

    opcode = -1; // current opcode being read
    waiting = 0; // bytes to wait for (if any)

    buffer(data: Buffer) {
        if (data.length + this.in.pos > this.in.length) {
            this.close();
            return;
        }

        this.in.pdata(data, 0, data.length);
    }

    // available bytes we can read
    get available() {
        return this.in.pos;
    }

    // remaining bytes we can buffer
    get remaining() {
        return this.in.length - this.in.pos;
    }

    read(dest: Uint8Array, offset: number, length: number) {
        if (this.available < length) {
            return false;
        }

        // copy data to dest
        dest.set(this.in.data.subarray(0, length), offset);
        this.in.pos -= length;

        // shift buffer to the next read
        this.in.data.set(this.in.data.subarray(length), 0);

        return true;
    }

    abstract send(src: Uint8Array): void;
    abstract close(): void;
    abstract terminate(): void;
}
