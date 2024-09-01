import net from 'net';

import Packet from '#jagex2/io/Packet.js';

import NetworkStream from '#lostcity/server/NetworkStream.js';

import Environment from '#lostcity/util/Environment.js';

/**
 * TODO refactor, this class shares a lot with the other servers
 */
export class FriendsServer {
    private server: net.Server;

    constructor() {
        this.server = net.createServer();
    }

    start() {
        this.server.on('connection', socket => {
            socket.setNoDelay(true);
            socket.setTimeout(5000);

            const stream = new NetworkStream();

            socket.on('data', async buf => {
                stream.received(buf);
                if (stream.waiting > stream.available) {
                    return;
                }

                stream.waiting = 0;
                const data = Packet.alloc(1);
                await stream.readBytes(socket, data, 0, 3);

                const opcode = data.g1();
                const length = data.g2();
                if (stream.available < length) {
                    stream.waiting = length - stream.available;
                    return;
                }

                await stream.readBytes(socket, data, 0, length);

                data.release();
            });

            socket.on('close', () => {});
            socket.on('error', () => {});
        });

        this.server.listen({ port: Environment.FRIENDS_PORT, host: '0.0.0.0' }, () => {
            console.log(`[Friends]: Listening on port ${Environment.FRIENDS_PORT}`);
        });
    }
}

export class FriendsClient {
    private socket: net.Socket | null = null;
    private stream: NetworkStream = new NetworkStream();

    async connect() {
        if (this.socket) {
            return;
        }

        return new Promise<void>(res => {
            this.socket = net.createConnection({
                port: Environment.FRIENDS_PORT as number,
                host: Environment.FRIENDS_HOST as string
            });

            this.socket.setNoDelay(true);
            this.socket.setTimeout(1000);

            this.socket.on('data', async buf => {
                this.stream.received(buf);

                if (this.stream.waiting > this.stream.available) {
                    return;
                }

                this.stream.waiting = 0;
                const meta = Packet.alloc(1);
                await this.stream.readBytes(this.socket!, meta, 0, 3);

                const opcode = meta.g1();
                const length = meta.g2();

                meta.release();

                if (this.stream.available < length) {
                    this.stream.waiting = length - this.stream.available;
                    return;
                }

                // TODO review - doing this to avoid passing a 5kb buffer for each message
                const data = Packet.alloc(length);

                await this.stream.readBytes(this.socket!, data, 0, length);

                this.messageHandlers.forEach(fn => fn(opcode, data.data));

                data.release();
            });

            this.socket.once('close', () => {
                this.disconnect();
                res();
            });

            this.socket.once('error', () => {
                this.disconnect();
                res();
            });

            this.socket.once('connect', () => {
                res();
            });
        });
    }

    disconnect() {
        if (this.socket === null) {
            return;
        }

        this.socket.destroy();
        this.socket = null;
        this.stream.clear();
    }

    private messageHandlers: ((opcode: number, data: Uint8Array) => void)[] = [];

    public async onMessage(fn: (opcode: number, data: Uint8Array) => void) {
        this.messageHandlers.push(fn);
    }
}
