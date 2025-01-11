import ClientSocket from '#/server/ClientSocket.js';

export default class NullClientSocket extends ClientSocket {
    send(_src: Uint8Array): void {
        // no-op
    }

    read(_dest: Uint8Array, _offset: number, _length: number): boolean {
        return false;
    }

    buffer(_data: Buffer): void {
        // no-op
    }

    get available(): number {
        return 0;
    }

    close(): void {
        // no-op
    }

    terminate(): void {
        // no-op
    }
}
