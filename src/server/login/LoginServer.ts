import fs from 'fs';
import fsp from 'fs/promises';
import { WebSocketServer } from 'ws';

import bcrypt from 'bcrypt';

import { db, toDbDate } from '#/db/query.js';

import Environment from '#/util/Environment.js';
import { printInfo } from '#/util/Logger.js';
import { PlayerLoading } from '#/engine/entity/PlayerLoading.js';
import Packet from '#/io/Packet.js';

export default class LoginServer {
    private server: WebSocketServer;

    constructor() {
        this.server = new WebSocketServer({ port: Environment.LOGIN_PORT, host: '0.0.0.0' }, () => {
            printInfo(`Login server listening on port ${Environment.LOGIN_PORT}`);
        });

        this.server.on('connection', (s: WebSocket) => {
            s.on('message', async (data: Buffer) => {
                try {
                    const msg = JSON.parse(data.toString());
                    const { type, nodeId, nodeTime, profile } = msg;

                    if (type === 'world_startup') {
                        await db.updateTable('account').set({
                            logged_in: 0,
                            login_time: null
                        }).where('logged_in', '=', nodeId).execute();
                    } else if (type === 'player_login') {
                        const { replyTo, username, password, uid, socket, remoteAddress, reconnecting, hasSave } = msg;

                        const ipBan = await db.selectFrom('ipban').selectAll()
                            .where('ip', '=', remoteAddress).executeTakeFirst();

                        if (ipBan) {
                            s.send(JSON.stringify({
                                replyTo,
                                response: 7
                            }));
                            return;
                        }

                        const account = await db.selectFrom('account').where('username', '=', username).selectAll().executeTakeFirst();

                        if (!Environment.WEBSITE_REGISTRATION && !account) {
                            // register the user automatically
                            await db.insertInto('account').values({
                                username,
                                password: bcrypt.hashSync(password.toLowerCase(), 10),
                                registration_ip: remoteAddress,
                                registration_date: toDbDate(new Date())
                            }).execute();

                            s.send(JSON.stringify({
                                replyTo,
                                response: 4,
                                staffmodlevel: 0
                            }));
                            return;
                        }

                        if (account) {
                            const recent = await db.selectFrom('login').selectAll()
                                .where('account_id', '=', account.id)
                                .where('ip', '=', remoteAddress)
                                .where('timestamp', '>=', toDbDate(new Date(Date.now() - 5000)))
                                .limit(3).execute();

                            if (recent.length === 3) {
                                // rate limited
                                s.send(JSON.stringify({
                                    replyTo,
                                    response: 8
                                }));
                                return;
                            }

                            // todo: concurrent logins by ip

                            await db.insertInto('login').values({
                                uuid: socket,
                                account_id: account.id,
                                world: nodeId,
                                timestamp: toDbDate(nodeTime),
                                uid,
                                ip: remoteAddress
                            }).execute();
                        }

                        if (!account || !(await bcrypt.compare(password.toLowerCase(), account.password))) {
                            // invalid username or password
                            s.send(JSON.stringify({
                                replyTo,
                                response: 1
                            }));
                            return;
                        }

                        if (account.banned_until !== null && new Date(account.banned_until) > new Date()) {
                            // account disabled
                            s.send(JSON.stringify({
                                replyTo,
                                response: 5
                            }));
                            return;
                        }

                        if (reconnecting && account.logged_in === nodeId) {
                            await db.insertInto('session').values({
                                uuid: socket,
                                account_id: account.id,
                                profile,
                                world: nodeId,
                                timestamp: toDbDate(nodeTime),
                                uid,
                                ip: remoteAddress
                            }).execute();

                            if (!hasSave) {
                                const save = await fsp.readFile(`data/players/${profile}/${username}.sav`);
                                s.send(JSON.stringify({
                                    replyTo,
                                    response: 2,
                                    account_id: account.id,
                                    staffmodlevel: account.staffmodlevel,
                                    muted_until: account.muted_until,
                                    save: save.toString('base64'),
                                }));
                            } else {
                                s.send(JSON.stringify({
                                    replyTo,
                                    response: 2,
                                    account_id: account.id,
                                    staffmodlevel: account.staffmodlevel,
                                    muted_until: account.muted_until
                                }));
                            }
                            return;
                        } else if (account.logged_in !== 0) {
                            // already logged in elsewhere
                            s.send(JSON.stringify({
                                replyTo,
                                response: 3
                            }));
                            return;
                        } else if (
                            account.staffmodlevel < 1 &&
                            account.logged_out !== 0 && account.logged_out !== nodeId &&
                            account.logout_time !== null && new Date(account.logout_time) >= new Date(Date.now() - 45000)
                        ) {
                            // rate limited (hop timer)
                            s.send(JSON.stringify({
                                replyTo,
                                response: 6
                            }));
                            return;
                        }

                        await db.insertInto('session').values({
                            uuid: socket,
                            account_id: account.id,
                            profile,
                            world: nodeId,
                            timestamp: toDbDate(nodeTime),
                            uid,
                            ip: remoteAddress
                        }).execute();

                        await db.updateTable('account').set({
                            logged_in: nodeId,
                            login_time: toDbDate(new Date())
                        }).where('id', '=', account.id).executeTakeFirst();

                        if (!fs.existsSync(`data/players/${profile}/${username}.sav`)) {
                            // not an error - never logged in before
                            s.send(JSON.stringify({
                                replyTo,
                                response: 4,
                                account_id: account.id,
                                staffmodlevel: account.staffmodlevel,
                                muted_until: account.muted_until
                            }));
                            return;
                        }

                        const save = await fsp.readFile(`data/players/${profile}/${username}.sav`);
                        s.send(JSON.stringify({
                            replyTo,
                            response: 0,
                            account_id: account.id,
                            staffmodlevel: account.staffmodlevel,
                            save: save.toString('base64'),
                            muted_until: account.muted_until
                        }));
                    } else if (type === 'player_logout') {
                        const { replyTo, username, save } = msg;

                        const raw = Buffer.from(save, 'base64');
                        if (PlayerLoading.verify(new Packet(raw))) {
                            if (!fs.existsSync(`data/players/${profile}`)) {
                                await fsp.mkdir(`data/players/${profile}`, { recursive: true });
                            }

                            await fsp.writeFile(`data/players/${profile}/${username}.sav`, raw);
                        } else {
                            console.error(username, 'Invalid save file');
                        }

                        await db.updateTable('account').set({
                            logged_in: 0,
                            login_time: null,
                            logged_out: nodeId,
                            logout_time: toDbDate(new Date()),
                        }).where('username', '=', username).executeTakeFirst();

                        s.send(JSON.stringify({
                            replyTo,
                            response: 0
                        }));
                    } else if (type === 'player_autosave') {
                        const { username, save } = msg;

                        const raw = Buffer.from(save, 'base64');
                        if (PlayerLoading.verify(new Packet(raw))) {
                            if (!fs.existsSync(`data/players/${profile}`)) {
                                await fsp.mkdir(`data/players/${profile}`, { recursive: true });
                            }

                            await fsp.writeFile(`data/players/${profile}/${username}.sav`, raw);
                        } else {
                            console.error(username, 'Invalid save file');
                        }
                    } else if (type === 'player_force_logout') {
                        const { username } = msg;

                        await db.updateTable('account').set({
                            logged_in: 0,
                            login_time: null
                        }).where('username', '=', username).executeTakeFirst();
                    } else if (type === 'player_ban') {
                        const { _staff, username, until } = msg;

                        // todo: audit log

                        await db.updateTable('account').set({
                            banned_until: toDbDate(until)
                        }).where('username', '=', username).executeTakeFirst();
                    } else if (type === 'player_mute') {
                        const { _staff, username, until } = msg;

                        // todo: audit log

                        await db.updateTable('account').set({
                            muted_until: toDbDate(until)
                        }).where('username', '=', username).executeTakeFirst();
                    }
                } catch (err) {
                    console.error(err);
                }
            });

            s.on('close', () => { });
            s.on('error', () => { });
        });
    }
}
