import fs from 'fs';

import InvType from '#/cache/config/InvType.js';
import { db } from '#/db/query.js';
import { PlayerLoading } from '#/engine/entity/PlayerLoading.js';
import { PlayerStatEnabled } from '#/engine/entity/PlayerStat.js';
import Packet from '#/io/Packet.js';

InvType.load('data/pack');

// todo: optimize!

// const worldProfiles = await db.selectFrom('world').select('profile').groupBy('profile').execute();
// for (const { profile } of worldProfiles) {
//     const players = fs.readdirSync(`data/players/${profile}`);

const args = process.argv.slice(2);
if (args.length < 1) {
    process.exit(0);
}

const profile = args[0];

console.time('hiscores');
const players = fs.readdirSync(`data/players/${profile}`);
for (const file of players) {
    try {
        const username = file.slice(0, -4);
        const player = PlayerLoading.load(username, Packet.load(`data/players/${profile}/${file}`), null);
        let account = await db.selectFrom('account').selectAll().where('username', '=', player.username).executeTakeFirst();

        if (!account) {
            // testing!
            await db
                .insertInto('account')
                .values({
                    username: player.username,
                    password: ''
                })
                .execute();

            account = await db.selectFrom('account').selectAll().where('username', '=', player.username).executeTakeFirstOrThrow();
        }

        if (account.staffmodlevel > 1 || (account.banned_until !== null && new Date(account.banned_until) > new Date())) {
            // todo: banned players will lose their exact rank position whenever they get unbanned this logic
            await db.deleteFrom('hiscore').where('account_id', '=', account.id).execute();
            await db.deleteFrom('hiscore_large').where('account_id', '=', account.id).execute();
            continue;
        }

        const insert = [];
        const update = [];

        let totalXp = 0;
        let totalLevel = 0;
        for (let i = 0; i < player.stats.length; i++) {
            if (!PlayerStatEnabled[i]) {
                continue;
            }

            totalXp += player.stats[i];
            totalLevel += player.baseLevels[i];
        }

        const existing = await db.selectFrom('hiscore_large').select('type').select('value').where('account_id', '=', account.id).where('type', '=', 0).where('profile', '=', profile).executeTakeFirst();
        if (existing && existing.value !== totalXp) {
            await db
                .updateTable('hiscore_large')
                .set({
                    type: 0,
                    level: totalLevel,
                    value: totalXp
                })
                .where('account_id', '=', account.id)
                .where('type', '=', 0)
                .where('profile', '=', profile)
                .execute();
        } else if (!existing) {
            await db
                .insertInto('hiscore_large')
                .values({
                    account_id: account.id,
                    profile,
                    type: 0,
                    level: totalLevel,
                    value: totalXp
                })
                .execute();
        }

        for (let stat = 0; stat < player.stats.length; stat++) {
            if (!PlayerStatEnabled[stat]) {
                continue;
            }

            if (player.baseLevels[stat] >= 15) {
                const hiscoreType = stat + 1;

                // todo: can we upsert in kysely?
                const existing = await db.selectFrom('hiscore').select('type').select('value').where('account_id', '=', account.id).where('type', '=', hiscoreType).where('profile', '=', profile).executeTakeFirst();
                if (existing && existing.value !== player.stats[stat]) {
                    update.push({
                        type: hiscoreType,
                        level: player.baseLevels[stat],
                        value: player.stats[stat]
                    });
                } else if (!existing) {
                    insert.push({
                        account_id: account.id,
                        profile,
                        type: hiscoreType,
                        level: player.baseLevels[stat],
                        value: player.stats[stat]
                    });
                }
            }
        }

        if (insert.length > 0) {
            await db.insertInto('hiscore').values(insert).execute();
        }

        // todo: batch update query?
        for (let i = 0; i < update.length; i++) {
            await db.updateTable('hiscore').set(update[i]).where('account_id', '=', account.id).where('type', '=', update[i].type).where('profile', '=', profile).execute();
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(file, err.message);
            console.error(err.stack);
        }
    }
}
console.timeEnd('hiscores');

process.exit(0);
