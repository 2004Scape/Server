import net from 'net';

import Packet from '#jagex2/io/Packet.js';

import NetworkStream from '#lostcity/server/NetworkStream.js';

import Environment from '#lostcity/util/Environment.js';

/**
 * client -> server opcodes for friends server
 */
export enum FriendsClientOpcodes {
    WORLD_CONNECT,
}

/**
 * TODO refactor, this class shares a lot with the other servers
 */
export class FriendsServer {
    private server: net.Server;

    /**
     * socketByWorld[worldId] = socket
     */
    private socketByWorld: Record<number, net.Socket> = {};

    constructor() {
        this.server = net.createServer();
    }

    start() {
        this.server.on('connection', socket => {
            socket.setNoDelay(true);
            socket.setTimeout(5000);

            const stream = new NetworkStream();

            /**
             * The world number for this connection. This is set when the world sends a WORLD_CONNECT packet.
             */
            let world: number | null = null;

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

                try
                {
                    if (opcode === FriendsClientOpcodes.WORLD_CONNECT) {
                        if (world !== null) {
                            console.error('[Friends]: Received WORLD_CONNECT after already connected');
                            return;
                        }

                        world = data.g2();

                        if (this.socketByWorld[world]) {
                            this.socketByWorld[world].destroy();
                        }

                        this.socketByWorld[world] = socket;

                        console.log(`[Friends]: World ${world} connected`);
                    } else {
                        console.error(`[Friends]: Unknown opcode ${opcode}, length ${length}`);
                    }
                }
                finally
                {
                    data.release();
                }
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

    private async write(socket: net.Socket, opcode: FriendsClientOpcodes, data: Uint8Array | null = null, full: boolean = true) {
        if (socket === null) {
            return;
        }

        const packet = new Packet(new Uint8Array(1 + 2 + (data !== null ? data?.length : 0)));
        packet.p1(opcode);
        if (data !== null) {
            packet.p2(data.length);
            packet.pdata(data, 0, data.length);
        } else {
            packet.p2(0);
        }
        const done = socket.write(packet.data);

        if (!done && full) {
            await new Promise<void>(res => {
                const interval = setInterval(() => {
                    if (socket === null || socket.closed) {
                        clearInterval(interval);
                        res();
                    }
                }, 100);

                socket.once('drain', () => {
                    clearInterval(interval);
                    res();
                });
            });
        }
    }

    private messageHandlers: ((opcode: number, data: Uint8Array) => void)[] = [];

    public async onMessage(fn: (opcode: number, data: Uint8Array) => void) {
        this.messageHandlers.push(fn);
    }

    public async worldConnect(world: number) {
        await this.connect();

        if (this.socket === null) {
            return -1;
        }

        const request = new Packet(new Uint8Array(2));
        request.p2(world);
        await this.write(this.socket, FriendsClientOpcodes.WORLD_CONNECT, request.data);
    }
}
