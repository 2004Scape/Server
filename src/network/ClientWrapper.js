export default class ClientWrapper {
    static TCP = 0;
    static WEBSOCKET = 1;

    socket = null;
    type = -1;
    state = -1;
    remoteAddress = null;
    totalBytesRead = 0;
    totalBytesWritten = 0;

    encryptor = null;
    decryptor = null;

    // we only want to receive 5KB per tick to mitigate bad actors
    in = new Uint8Array(5000);
    inOffset = 0;

    // we limit the amount of packets we receive per opcode (no more than 10) to mitigate bad actors
    inCount = new Uint8Array(256);

    // packets are flushed in up to 5KB chunks
    out = new Uint8Array(5000);
    outOffset = 0;

    constructor(socket, state = -1, remoteAddress = null, type = ClientWrapper.TCP) {
        this.socket = socket;
        this.state = state;
        this.remoteAddress = remoteAddress;
        this.type = type;
    }
    
    isTCP() {
        return this.type === ClientWrapper.TCP;
    }

    isWebSocket() {
        return this.type === ClientWrapper.WEBSOCKET;
    }

    send(data) {
        this.totalBytesWritten += data.length;
        if (this.isTCP()) {
            this.socket.write(data);
        } else if (this.isWebSocket()) {
            this.socket.send(data);
        }
    }

    // close the connection gracefully
    close() {
        // TODO: revisit this to make sure no overflow attacks can be done
        setTimeout(() => {
            if (this.isTCP()) {
                this.socket.end();
            } else if (this.isWebSocket()) {
                this.socket.close();
            }
        }, 10);
    }

    // terminate the connection immediately
    terminate() {
        if (this.isTCP()) {
            this.socket.destroy();
        } else if (this.isWebSocket()) {
            this.socket.terminate();
        }
    }

    reset() {
        this.inOffset = 0;
        this.inCount.fill(0);
    }

    get untilNextFlush() {
        return this.out.length - this.outOffset;
    }

    write(data) {
        if (data.data) {
            data = data.data;
        }

        let offset = 0;
        let remaining = data.length;

        // pack as much data as we can into a single 5kb chunk, then flush and repeat
        while (remaining > 0) {
            const untilNextFlush = this.out.length - this.outOffset;

            if (remaining > untilNextFlush) {
                this.out.set(data.slice(offset, offset + untilNextFlush), this.outOffset);
                this.outOffset += untilNextFlush;
                this.flush();
                offset += untilNextFlush;
                remaining -= untilNextFlush;
            } else {
                this.out.set(data.slice(offset, offset + remaining), this.outOffset);
                this.outOffset += remaining;
                offset += remaining;
                remaining = 0;
            }
        }
    }

    writeNaive(data) {
        if (this.outOffset + data.length > this.out.length) {
            this.flush();
        }

        this.out.set(data, this.outOffset);
        this.outOffset += data.length;
    }

    flush() {
        if (this.outOffset) {
            // console.log('Flushing', this.out.slice(0, this.outOffset), this.outOffset);
            this.send(this.out.slice(0, this.outOffset));
            this.outOffset = 0;
        }
    }
}