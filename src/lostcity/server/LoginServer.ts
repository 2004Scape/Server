import fs from 'fs';
import fsp from 'fs/promises';

import bcrypt from 'bcrypt';
import { WebSocket, WebSocketServer } from 'ws';

import { fromBase37 } from '#jagex2/jstring/JString.js';

import { db } from '#lostcity/db/query.js';

import Environment from '#lostcity/util/Environment.js';

// todo: replace magic numbers with enums
export default class LoginServer {
    private server: WebSocketServer;
    private players: bigint[][] = [];

    constructor() {
        this.server = new WebSocketServer({ port: Environment.LOGIN_PORT, host: '0.0.0.0' }, () => {
            console.log(`Login server listening on port ${Environment.LOGIN_PORT}`);
        });

        this.server.on('connection', (socket: WebSocket) => {
            socket.on('message', async (buf: Buffer) => {
                const message = JSON.parse(buf.toString());
                const { type, replyTo } = message;

                if (type === 1) {
                    // login
                    const { world, password, uid } = message;

                    if (!this.players[world]) {
                        this.players[world] = [];
                    }

                    const username37 = BigInt(message.username37);
                    const username = fromBase37(username37);

                    const account = await db.selectFrom('account').where('username', '=', username).selectAll().executeTakeFirst();

                    if (!account || !(await bcrypt.compare(password.toLowerCase(), account.password))) {
                        // invalid credentials (bad user or bad pass)
                        socket.send(JSON.stringify({
                            replyTo,
                            type: 1,
                            response: 3
                        }));
                        return;
                    }

                    if (this.players[world].includes(username37)) {
                        // logged into this world (reconnect logic)
                        socket.send(JSON.stringify({
                            replyTo,
                            type: 1,
                            response: 4
                        }));
                        return;
                    }

                    for (let i = 0; i < this.players.length; i++) {
                        if (!this.players[i]) {
                            continue;
                        }

                        if (this.players[i].includes(username37)) {
                            // logged into another world
                            socket.send(JSON.stringify({
                                replyTo,
                                type: 1,
                                response: 5
                            }));
                            return;
                        }
                    }

                    this.players[world].push(username37);

                    if (!fs.existsSync(`data/players/${username}.sav`)) {
                        // new player save
                        socket.send(JSON.stringify({
                            replyTo,
                            type: 1,
                            response: 2
                        }));
                        return;
                    }

                    const save = await fsp.readFile(`data/players/${username}.sav`);
                    socket.send(JSON.stringify({
                        replyTo,
                        type: 1,
                        response: 1,
                        save: save.toString('base64')
                    }));
                } else if (type === 2) {
                    // logout
                    const { world, save } = message;

                    const username37 = BigInt(message.username37);
                    const username = fromBase37(username37);
                    await fsp.writeFile(`data/players/${username}.sav`, Buffer.from(save, 'base64'));

                    if (!this.players[world]) {
                        this.players[world] = [];
                    }

                    const index = this.players[world].indexOf(username37);
                    if (index > -1) {
                        this.players[world].splice(index, 1);
                    }

                    // confirmation
                    socket.send(JSON.stringify({
                        replyTo,
                        type: 2
                    }));
                } else if (type === 3) {
                    // reset world
                    const { world } = message;

                    if (!this.players[world]) {
                        this.players[world] = [];
                    }

                    this.players[world] = [];
                } else if (type === 4) {
                    // count players
                    const { world } = message;

                    if (!this.players[world]) {
                        this.players[world] = [];
                    }

                    socket.send(JSON.stringify({
                        replyTo,
                        type: 3,
                        count: this.players[world].length
                    }));
                } else if (type === 5) {
                    // heartbeat/check in - update player list (used for re-syncing right now... logic bug)
                    const { world, players } = message;

                    this.players[world] = [];

                    for (let i = 0; i < players.length; i++) {
                        this.players[world].push(BigInt(players[i]));
                    }
                }
            });

            socket.on('close', () => { });
            socket.on('error', () => { });
        });
    }

    start() {
        // todo: move server start back here later
        //       websocket has us set up the port/host in the constructor instead of on .listen
    }
}
