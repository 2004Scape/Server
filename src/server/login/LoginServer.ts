import fs from 'fs';
import { WebSocketServer } from 'ws';

import bcrypt from 'bcrypt';

import { db } from '#/db/query.js';

import Environment from '#/util/Environment.js';
import { printInfo } from '#/util/Logger.js';

export default class LoginServer {
    private server: WebSocketServer;

    constructor() {
        this.server = new WebSocketServer({ port: Environment.LOGIN_PORT, host: '0.0.0.0' }, () => {
            printInfo(`Login server listening on port ${Environment.LOGIN_PORT}`);
        });

        this.server.on('connection', (socket: WebSocket) => {
            socket.on('message', async (data: Buffer) => {
                try {
                    const msg = JSON.parse(data.toString());
                    const { type, nodeId, nodeTime } = msg;

                    if (type === 'world_startup') {
                        await db.updateTable('account').set({
                            logged_in: 0,
                            login_time: null
                        }).where('logged_in', '=', nodeId).execute();
                    } else if (type === 'player_login') {
                        const { replyTo, username, password, uid } = msg;

                        // todo: record login attempt + uid

                        const account = await db.selectFrom('account').where('username', '=', username).selectAll().executeTakeFirst();
                        if (!account || !(await bcrypt.compare(password.toLowerCase(), account.password))) {
                            // invalid username or password
                            socket.send(JSON.stringify({
                                replyTo,
                                response: 1
                            }));
                            return;
                        }

                        if (account.banned_until !== null && account.banned_until > new Date()) {
                            // account disabled
                            socket.send(JSON.stringify({
                                replyTo,
                                response: 5
                            }));
                            return;
                        }

                        if (account.logged_in === nodeId) {
                            // could be a reconnect so we have special logic here
                            // the world will respond already logged in otherwise
                            socket.send(JSON.stringify({
                                replyTo,
                                response: 2
                            }));
                        } else if (account.logged_in !== 0) {
                            // already logged in elsewhere
                            socket.send(JSON.stringify({
                                replyTo,
                                response: 3
                            }));
                            return;
                        }

                        await db.updateTable('account').set({
                            logged_in: nodeId,
                            login_time: new Date()
                        }).where('id', '=', account.id).executeTakeFirst();

                        if (!fs.existsSync(`data/players/${username}.sav`)) {
                            // not an error - never logged in before
                            socket.send(JSON.stringify({
                                replyTo,
                                response: 4,
                                muted_until: account.muted_until
                            }));
                            return;
                        }

                        const save = fs.readFileSync(`data/players/${username}.sav`);
                        socket.send(JSON.stringify({
                            replyTo,
                            response: 0,
                            save: save.toString('base64'),
                            muted_until: account.muted_until
                        }));
                    } else if (type === 'player_logout') {
                        const { replyTo, username, save } = msg;

                        // todo: record logout history

                        fs.writeFileSync(`data/players/${username}.sav`, Buffer.from(save, 'base64'));

                        await db.updateTable('account').set({
                            logged_in: 0,
                            login_time: null
                        }).where('username', '=', username).executeTakeFirst();

                        socket.send(JSON.stringify({
                            replyTo,
                            response: 0
                        }));
                    } else if (type === 'player_autosave') {
                        const { username, save } = msg;

                        fs.writeFileSync(`data/players/${username}.sav`, Buffer.from(save, 'base64'));
                    } else if (type === 'player_force_logout') {
                        const { username } = msg;

                        await db.updateTable('account').set({
                            logged_in: 0,
                            login_time: null
                        }).where('username', '=', username).executeTakeFirst();
                    }
                } catch (err) {
                    console.error(err);
                }
            });

            socket.on('close', () => {});
            socket.on('error', () => {});
        });
    }
}
