import net from 'net';

import Packet from '#jagex2/io/Packet.js';

import { db } from '#lostcity/db/query.js';

import NetworkStream from '#lostcity/server/NetworkStream.js';

import Environment from '#lostcity/util/Environment.js';
import { fromBase37, toDisplayName } from '#jagex2/jstring/JString.js';

export class FriendServer {
    private server: net.Server;

    private messageId: number = 0;
    private messages: Map<number, string> = new Map();

    private worlds: Map<number, bigint> = new Map();
    private players: Map<bigint, number> = new Map();

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
                const data = new Packet();
                await stream.readBytes(socket, data, 0, 3);

                const opcode = data.g1();
                const length = data.g2();
                if (stream.available < length) {
                    stream.waiting = length - stream.available;
                    return;
                }

                await stream.readBytes(socket, data, 0, length);

                if (opcode === 1) {
                    // player logged in
                    const world = data.g2();
                    const username = data.g8();
                } else if (opcode === 2) {
                    // player logged out
                    const world = data.g2();
                    const username = data.g8();
                } else if (opcode === 3) {
                    // player sent message to another player
                    const from = data.g8();
                    const to = data.g8();
                    const message = data.gjstr();
                } else if (opcode === 4) {
                    // world requested latest messages since last check
                    const lastMessageId = data.g4();
                } else if (opcode === 5) {
                    // player added friend
                    const player = data.g8();
                    const other = data.g8();

                    const playerAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(player))
                        .selectAll().executeTakeFirst();
                    const otherAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(other))
                        .selectAll().executeTakeFirst();

                    if (!playerAcc || !otherAcc) {
                        return;
                    }

                    await db.insertInto('friendlist')
                        .values({
                            account_id: playerAcc.id,
                            friend_account_id: otherAcc?.id
                        })
                        .ignore().execute();
                } else if (opcode === 6) {
                    // player removed friend
                    const player = data.g8();
                    const other = data.g8();

                    const playerAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(player))
                        .selectAll().executeTakeFirst();
                    const otherAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(other))
                        .selectAll().executeTakeFirst();

                    if (!playerAcc || !otherAcc) {
                        return;
                    }

                    await db.deleteFrom('friendlist')
                        .where('account_id', '=', playerAcc.id)
                        .where('friend_account_id', '=', otherAcc.id)
                        .execute();
                } else if (opcode === 7) {
                    // player added ignore
                    const player = data.g8();
                    const other = data.g8();

                    const playerAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(player))
                        .selectAll().executeTakeFirst();
                    const otherAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(other))
                        .selectAll().executeTakeFirst();

                    if (!playerAcc || !otherAcc) {
                        return;
                    }

                    await db.insertInto('ignorelist')
                        .values({
                            account_id: playerAcc.id,
                            ignore_account_id: otherAcc?.id
                        })
                        .ignore().execute();
                } else if (opcode === 8) {
                    // player removed ignore
                    const player = data.g8();
                    const other = data.g8();

                    const playerAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(player))
                        .selectAll().executeTakeFirst();
                    const otherAcc = await db.selectFrom('account')
                        .where('username', '=', fromBase37(other))
                        .selectAll().executeTakeFirst();

                    if (!playerAcc || !otherAcc) {
                        return;
                    }

                    await db.deleteFrom('ignorelist')
                        .where('account_id', '=', playerAcc.id)
                        .where('ignore_account_id', '=', otherAcc.id)
                        .execute();
                }
            });

            socket.on('close', () => { });
            socket.on('error', () => { });
        });

        this.server.listen({ port: Environment.FRIEND_PORT, host: '0.0.0.0' }, () => {
            console.log(`[Friend]: Listening on port ${Environment.FRIEND_PORT}`);
        });
    }

    private async write(socket: net.Socket, data: Uint8Array | Buffer, full: boolean = true) {
        if (socket === null) {
            return;
        }

        const done = socket.write(data);

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
}

export class FriendClient {
    private socket: net.Socket | null = null;
    private stream: NetworkStream = new NetworkStream();

    async connect() {
        if (this.socket) {
            return;
        }

        return new Promise<void>(res => {
            this.socket = net.createConnection({
                port: Environment.FRIEND_PORT as number,
                host: Environment.FRIEND_HOST as string
            });

            this.socket.setNoDelay(true);
            this.socket.setTimeout(1000);

            this.socket.on('data', async buf => {
                this.stream.received(buf);
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

    private async write(socket: net.Socket, opcode: number, data: Uint8Array | null = null, full: boolean = true) {
        if (socket === null) {
            return;
        }

        const packet = new Packet();
        packet.p1(opcode);
        if (data !== null) {
            packet.p2(data.length);
            packet.pdata(data);
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

    async addFriend(player: bigint, other: bigint) {
        await this.connect();

        if (this.socket === null) {
            return;
        }

        const data = new Packet();
        data.p8(player);
        data.p8(other);
        await this.write(this.socket, 5, data.data);
    }

    async removeFriend(player: bigint, other: bigint) {
        await this.connect();

        if (this.socket === null) {
            return;
        }

        const data = new Packet();
        data.p8(player);
        data.p8(other);
        await this.write(this.socket, 6, data.data);
    }

    async addIgnore(player: bigint, other: bigint) {
        await this.connect();

        if (this.socket === null) {
            return;
        }

        const data = new Packet();
        data.p8(player);
        data.p8(other);
        await this.write(this.socket, 7, data.data);
    }

    async removeIgnore(player: bigint, other: bigint) {
        await this.connect();

        if (this.socket === null) {
            return;
        }

        const data = new Packet();
        data.p8(player);
        data.p8(other);
        await this.write(this.socket, 8, data.data);
    }
}
