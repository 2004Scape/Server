import fs from 'fs';

import Packet from '#util/Packet.js';

export class RandomAccessFile {
    #offset;

    constructor(path, mode = 'r+') {
        this.path = path;
        if (mode !== 'r' && !fs.existsSync(path)) {
            fs.writeFileSync(path, new Uint8Array());
        }
        this.fd = fs.openSync(path, mode);
        this.#offset = 0;
    }

    get length() {
        return fs.statSync(this.path).size;
    }

    get offset() {
        return this.#offset;
    }

    get available() {
        return this.length - this.pos;
    }

    close() {
        fs.closeSync(this.fd);
    }

    front() {
        this.#offset = 0;
        return this;
    }

    back() {
        this.#offset = this.length;
        return this;
    }

    seek(bytes = 1) {
        this.#offset += Number(bytes);
        return this;
    }

    align(boundary) {
        this.#offset = (this.#offset + boundary - 1) & -boundary;
        return this;
    }

    clear() {
        fs.writeFileSync(this.path, new Uint8Array());
    }

    truncate() {
        fs.ftruncateSync(this.fd, this.pos);
    }

    copy(length) {
        let buffer = new Uint8Array(Number(Math.min(this.available, length)));
        this.seek(fs.readSync(this.fd, buffer, 0, buffer.length, this.pos));
        return buffer;
    }

    read(length = this.available) {
        return new Packet(this.copy(length));
    }

    stream(length = this.available) {
        return fs.createReadStream(this.path, {
            fd: this.fd,
            start: this.pos,
            end: length
        });
    }

    pdata(data) {
        this.seek(fs.writeSync(this.fd, data, 0, data.length, this.pos));
    }
};
