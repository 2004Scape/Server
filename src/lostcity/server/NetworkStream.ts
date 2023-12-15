import Packet from '#jagex2/io/Packet.js';

export default class NetworkStream {
    private queue: Uint8Array[] = []; // queue of data events
    public available: number = 0; // remaining bytes to read
    private buffer: Uint8Array | null = null; // current data event
    private offset: number = 0;
    public waiting: number = 0; // number of bytes waiting to be read

    received(buf: Buffer) {
        this.queue.push(buf);
        this.available += buf.length;
    }

    async readByte(): Promise<number> {
        if (this.available < 1) {
            await new Promise(res => setTimeout(res, 5));
            return this.readByte();
        }

        if (this.buffer === null) {
            this.buffer = this.queue.shift() ?? null;
            this.offset = 0;
        }

        const value = this.buffer?.[this.offset] ?? 0;
        this.offset++;
        this.available--;

        if (this.buffer && this.offset === this.buffer.length) {
            this.buffer = null;
        }

        return value;
    }

    async readBytes(destination: Packet, offset: number, length: number): Promise<number> {
        if (destination.length - offset < length) {
            destination.resize(offset + length);
        }

        if (this.available < length) {
            await new Promise(res => setTimeout(res, 5));
            return this.readBytes(destination, offset, length);
        }

        destination.pos = offset;
        for (let i = 0; i < length; i++) {
            if (this.buffer === null) {
                this.buffer = this.queue.shift() ?? null;
                this.offset = 0;
            }

            destination.data[offset + i] = this.buffer?.[this.offset] ?? 0;
            this.offset++;
            this.available--;

            if (this.buffer && this.offset === this.buffer.length) {
                this.buffer = null;
            }
        }

        return length;
    }
}
