import { WebSocketServer } from 'ws';

import Environment from '#/util/Environment.js';
import { printInfo } from '#/util/Logger.js';
import { db, loggerDb, toDbDate } from '#/db/query.js';
import InputTrackingEvent from '#/engine/entity/tracking/InputEvent.js';
import { SessionLog } from '#/engine/entity/tracking/SessionLog.js';

export default class LoggerServer {
    private server: WebSocketServer;

    constructor() {
        this.server = new WebSocketServer({ port: Environment.LOGGER_PORT, host: '0.0.0.0' }, () => {
            printInfo(`Logger server listening on port ${Environment.LOGGER_PORT}`);
        });

        this.server.on('connection', (socket: WebSocket) => {
            socket.on('message', async (data: Buffer) => {
                try {
                    const msg = JSON.parse(data.toString());
                    const { type } = msg;

                    switch (type) {
                        case 'session_log': {
                            const { world, profile, logs } = msg;

                            const schemaLogs = logs.map((x: SessionLog) => ({
                                account_id: x.account_id,
                                world,
                                profile,
                                session_uuid: x.session_uuid,

                                timestamp: toDbDate(x.timestamp),
                                coord: x.coord,
                                event: x.event,
                                event_type: x.event_type
                            }));

                            await loggerDb.insertInto('account_session').values(schemaLogs).execute();
                            break;
                        }
                        case 'report': {
                            const { world, profile, username, timestamp, coord, offender, reason } = msg;

                            const account = await db.selectFrom('account').where('username', '=', username).selectAll().executeTakeFirstOrThrow();

                            await db.insertInto('report').values({
                                account_id: account.id,
                                world,
                                profile,

                                timestamp: toDbDate(timestamp),
                                coord,
                                offender,
                                reason
                            }).execute();

                            break;
                        }
                        case 'input_track': {
                            const { username, session_uuid, timestamp, events } = msg;
                            if (!events.length) {
                                break;
                            }

                            const account = await db.selectFrom('account').where('username', '=', username).selectAll().executeTakeFirst();
                            if (!account) {
                                console.log(msg);
                            } else {
                                const report = await loggerDb.insertInto('input_report').values({
                                    account_id: account.id,
                                    session_uuid,
                                    timestamp: toDbDate(timestamp),
                                }).executeTakeFirst();
                                const values = events.map((e: InputTrackingEvent) => {
                                    return {
                                        input_report_id: report.insertId,
                                        seq: e.seq,
                                        coord: e.coord,
                                        data: Buffer.from(e.data, 'base64'),
                                    };
                                });
                                await loggerDb.insertInto('input_report_event_raw').values(values).execute();
                            }
                            break;
                        }
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
