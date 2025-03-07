import { db, toDbDate } from '#/db/query.js';

console.time('banwave');

const accounts = await db.selectFrom('account').selectAll()
    .where('banwave_start', '<', toDbDate(Date.now() - 6 * 60 * 60 * 1000)) // Grace period of 6 hours
    .where('banwave_until', '>', toDbDate(Date.now()))
    .where('staffmodlevel', '<=', 1)
    .execute();

for (const account of accounts) {
    try {
        if (!account) {
            continue;
        }

        const startDiff = Date.now() - new Date(account.banwave_start!).getTime();
        const untilDiff = Date.now() - new Date(account.banwave_until!).getTime();

        await db
            .updateTable('account')
            .set({
                banned_until: toDbDate(new Date(Date.now() + (startDiff - untilDiff))),
                banwave_start: null,
                banwave_until: null
            })
            .where('username', '=', account.username)
            .executeTakeFirst();
    } catch (err) {
        if (err instanceof Error) {
            console.error(account.username || 'undefined', err.message);
            console.error(err.stack);
        }
    }
}

console.timeEnd('banwave');
process.exit(0);