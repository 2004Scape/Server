import fs from 'fs';
import fsp from 'fs/promises';

import bcrypt from 'bcrypt';
import { WebSocketServer } from 'ws';


import { db, toDbDate } from '#/db/query.js';
import { PlayerLoading } from '#/engine/entity/PlayerLoading.js';
import Packet from '#/io/Packet.js';
import Environment from '#/util/Environment.js';
import { printInfo } from '#/util/Logger.js';
import { getUnreadMessageCount } from '#/util/Messages.js';
import { startManagementWeb } from '#/web.js';

export default class LoginServer {
    private server: WebSocketServer;

    rejectLoginForSafety(s: WebSocket, replyTo: number) {
        // Send opcode 7 ('Please try again') if something has gone wrong
        // during login attempt, which may be resolved by simply retrying.
        s.send(
            JSON.stringify({
                replyTo,
                response: 7
            })
        );
    }

    async wouldResetSaveFile(newSaveBytes: Buffer, profile: string, username: string) {
        // check whether `save`, if saved to disk, would have reset `username`'s progress.
        // it does this by checking whether the player's tick count has gone backwards.
        if (!fs.existsSync(`data/players/${profile}/${username}.sav`)) {
            // No existing save - no problem.
            return false;
        }
        const existingSaveRaw = await fsp.readFile(`data/players/${profile}/${username}.sav`);
        const existingSave = PlayerLoading.load('tmp', new Packet(existingSaveRaw), null);
        const newSave = PlayerLoading.load('tmp', new Packet(newSaveBytes), null);
        if (existingSave.playtime > newSave.playtime) {
            // Int32, 1 per tick logged in. Should wrap only after insane amount of years.
            return true;
        }
        return false;
    }

    constructor() {
        if (Environment.LOGIN_SERVER && !Environment.EASY_STARTUP) {
            startManagementWeb();
        }

        this.server = new WebSocketServer({ port: Environment.LOGIN_PORT, host: '0.0.0.0' }, () => {
            printInfo(`Login server listening on port ${Environment.LOGIN_PORT}`);
        });

        this.server.on('connection', (s: WebSocket) => {
            s.on('message', async (data: Buffer) => {
                try {
                    const msg = JSON.parse(data.toString());
                    const { type, nodeId, nodeTime, profile } = msg;

                    if (type === 'world_startup') {
                        await db
                            .updateTable('account')
                            .set({
                                logged_in: 0,
                                login_time: null
                            })
                            .where('logged_in', '=', nodeId)
                            .execute();
                    } else if (type === 'player_login') {
                        const { replyTo, username, password, uid, socket, remoteAddress, reconnecting, hasSave } = msg;

                        const ipBan = await db.selectFrom('ipban').selectAll().where('ip', '=', remoteAddress).executeTakeFirst();

                        if (ipBan) {
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 7
                                })
                            );
                            return;
                        }

                        const account = await db.selectFrom('account').where('username', '=', username).selectAll().executeTakeFirst();

                        if (!Environment.WEBSITE_REGISTRATION && !account) {
                            // register the user automatically
                            const insertResult = await db
                                .insertInto('account')
                                .values({
                                    username,
                                    password: bcrypt.hashSync(password.toLowerCase(), 10),
                                    registration_ip: remoteAddress,
                                    registration_date: toDbDate(new Date())
                                })
                                .executeTakeFirst();

                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 4,
                                    staffmodlevel: 0,
                                    account_id: Number(insertResult.insertId),  // bigint
                                })
                            );
                            return;
                        }

                        if (account) {
                            const recent = await db
                                .selectFrom('login')
                                .selectAll()
                                .where('account_id', '=', account.id)
                                .where('ip', '=', remoteAddress)
                                .where('timestamp', '>=', toDbDate(new Date(Date.now() - 5000)))
                                .limit(3)
                                .execute();

                            if (recent.length === 3) {
                                // rate limited
                                s.send(
                                    JSON.stringify({
                                        replyTo,
                                        response: 8
                                    })
                                );
                                return;
                            }

                            // todo: concurrent logins by ip

                            await db
                                .insertInto('login')
                                .values({
                                    uuid: socket,
                                    account_id: account.id,
                                    world: nodeId,
                                    timestamp: toDbDate(nodeTime),
                                    uid,
                                    ip: remoteAddress
                                })
                                .execute();
                        }

                        if (!account || !(await bcrypt.compare(password.toLowerCase(), account.password))) {
                            // invalid username or password
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 1
                                })
                            );
                            return;
                        }

                        if (account.banned_until !== null && new Date(account.banned_until) > new Date()) {
                            // account disabled
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 5
                                })
                            );
                            return;
                        }

                        if (Environment.NODE_MEMBERS && !account.members) {
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 9
                                })
                            );
                            return;
                        }

                        if (reconnecting && account.logged_in === nodeId) {
                            await db
                                .insertInto('session')
                                .values({
                                    uuid: socket,
                                    account_id: account.id,
                                    profile,
                                    world: nodeId,
                                    timestamp: toDbDate(nodeTime),
                                    uid,
                                    ip: remoteAddress
                                })
                                .execute();

                            const messageCount = await getUnreadMessageCount(account.id);

                            if (!hasSave) {
                                const save = await fsp.readFile(`data/players/${profile}/${username}.sav`);
                                if (!save || !PlayerLoading.verify(new Packet(save))) {
                                    // Extreme safety check for savefile existing but having bad data on read:
                                    console.error('on reconnect, account_id %s had invalid save data on disk', account.id);
                                    this.rejectLoginForSafety(s, replyTo);
                                }
                                s.send(
                                    JSON.stringify({
                                        replyTo,
                                        response: 2,
                                        account_id: account.id,
                                        staffmodlevel: account.staffmodlevel,
                                        muted_until: account.muted_until,
                                        save: save.toString('base64'),
                                        members: account.members,
                                        messageCount
                                    })
                                );
                            } else {
                                s.send(
                                    JSON.stringify({
                                        replyTo,
                                        response: 2,
                                        account_id: account.id,
                                        staffmodlevel: account.staffmodlevel,
                                        muted_until: account.muted_until,
                                        members: account.members,
                                        messageCount
                                    })
                                );
                            }
                            return;
                        } else if (account.logged_in !== 0) {
                            // already logged in elsewhere
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 3
                                })
                            );
                            return;
                        } else if (account.staffmodlevel < 1 && account.logged_out !== 0 && account.logged_out !== nodeId && account.logout_time !== null && new Date(account.logout_time) >= new Date(Date.now() - 45000)) {
                            // rate limited (hop timer)
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 6
                                })
                            );
                            return;
                        }

                        await db
                            .insertInto('session')
                            .values({
                                uuid: socket,
                                account_id: account.id,
                                profile,
                                world: nodeId,
                                timestamp: toDbDate(nodeTime),
                                uid,
                                ip: remoteAddress
                            })
                            .execute();

                        const messageCount = await getUnreadMessageCount(account.id);

                        if (!fs.existsSync(`data/players/${profile}/${username}.sav`)) {
                            // not an error - never logged in before
                            // ^ Only not an error if the user has never logged in before:
                            if (account.logout_time !== null) {
                                console.error('on login, account_id %s had no save data on disk!', account.id);
                                this.rejectLoginForSafety(s, replyTo);
                                return;
                            } else {
                                s.send(
                                    JSON.stringify({
                                        replyTo,
                                        response: 4,
                                        account_id: account.id,
                                        staffmodlevel: account.staffmodlevel,
                                        muted_until: account.muted_until,
                                        messageCount
                                    })
                                );
                            }
                        } else {
                            const save = await fsp.readFile(`data/players/${profile}/${username}.sav`);
                            // Extreme safety check for savefile existing but having bad data on read:
                            if (!save || !PlayerLoading.verify(new Packet(save))) {
                                console.error('on login, account_id %s had invalid save data on disk!', account.id);
                                this.rejectLoginForSafety(s, replyTo);
                                return;
                            }
                            s.send(
                                JSON.stringify({
                                    replyTo,
                                    response: 0,
                                    account_id: account.id,
                                    staffmodlevel: account.staffmodlevel,
                                    save: save.toString('base64'),
                                    muted_until: account.muted_until,
                                    members: account.members,
                                    messageCount
                                })
                            );
                        }

                        // Login is valid - update account table
                        await db
                            .updateTable('account')
                            .set({
                                logged_in: nodeId,
                                login_time: toDbDate(new Date())
                            })
                            .where('id', '=', account.id)
                            .executeTakeFirst();
                    } else if (type === 'player_logout') {
                        const { replyTo, username, save } = msg;

                        const raw = Buffer.from(save, 'base64');
                        if (PlayerLoading.verify(new Packet(raw)) && !(await this.wouldResetSaveFile(raw, profile, username))) {
                            if (!fs.existsSync(`data/players/${profile}`)) {
                                await fsp.mkdir(`data/players/${profile}`, { recursive: true });
                            }

                            await fsp.writeFile(`data/players/${profile}/${username}.sav`, raw);
                        } else {
                            console.error(username, 'Invalid save file');
                        }

                        await db
                            .updateTable('account')
                            .set({
                                logged_in: 0,
                                login_time: null,
                                logged_out: nodeId,
                                logout_time: toDbDate(new Date())
                            })
                            .where('username', '=', username)
                            .executeTakeFirst();

                        s.send(
                            JSON.stringify({
                                replyTo,
                                response: 0
                            })
                        );
                    } else if (type === 'player_autosave') {
                        const { username, save } = msg;

                        const raw = Buffer.from(save, 'base64');
                        if (PlayerLoading.verify(new Packet(raw)) && !(await this.wouldResetSaveFile(raw, profile, username))) {
                            if (!fs.existsSync(`data/players/${profile}`)) {
                                await fsp.mkdir(`data/players/${profile}`, { recursive: true });
                            }

                            await fsp.writeFile(`data/players/${profile}/${username}.sav`, raw);
                        } else {
                            console.error(username, 'Invalid save file');
                        }
                    } else if (type === 'player_force_logout') {
                        const { username } = msg;

                        await db
                            .updateTable('account')
                            .set({
                                logged_in: 0,
                                login_time: null
                            })
                            .where('username', '=', username)
                            .executeTakeFirst();
                    } else if (type === 'player_ban') {
                        const { _staff, username, until } = msg;

                        // todo: audit log

                        await db
                            .updateTable('account')
                            .set({
                                banned_until: toDbDate(until)
                            })
                            .where('username', '=', username)
                            .executeTakeFirst();
                    } else if (type === 'player_mute') {
                        const { _staff, username, until } = msg;

                        // todo: audit log

                        await db
                            .updateTable('account')
                            .set({
                                muted_until: toDbDate(until)
                            })
                            .where('username', '=', username)
                            .executeTakeFirst();
                    }
                } catch (err) {
                    console.error(err);
                }
            });

            s.on('close', () => {});
            s.on('error', () => {});
        });
    }
}
