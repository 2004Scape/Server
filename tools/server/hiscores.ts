import fs from 'fs';

import { db } from '#/db/query.js';

import { PlayerLoading } from '#/engine/entity/PlayerLoading.js';
import Packet from '#/io/Packet.js';
import InvType from '#/cache/config/InvType.js';

InvType.load('data/pack');

// todo: optimize!

// const worldProfiles = await db.selectFrom('world').select('profile').groupBy('profile').execute();
// for (const { profile } of worldProfiles) {
//     const players = fs.readdirSync(`data/players/${profile}`);

console.time('hiscores');
const players = fs.readdirSync('data/players');
for (const file of players) {
    try {
        const username = file.slice(0, -4);
        const player = PlayerLoading.load(username, Packet.load(`data/players/${file}`), null);
        const account = await db.selectFrom('account').select('id').where('username', '=', player.username).executeTakeFirstOrThrow();

        // if (!account) {
        //     // testing!
        //     await db.insertInto('account').values({
        //         username: player.username,
        //         password: ''
        //     }).execute();

        //     account = await db.selectFrom('account').select('id').where('username', '=', player.username).executeTakeFirstOrThrow();
        // }

        const insert = [];
        const update = [];

        for (let stat = 0; stat < player.stats.length; stat++) {
            if (player.baseLevels[stat] >= 15) {
                // todo: can we upsert in kysely?
                const existing = await db.selectFrom('hiscore').select('type').select('value').where('account_id', '=', account.id).where('type', '=', stat).executeTakeFirst();

                if (existing && existing.value === player.stats[stat]) {
                    continue;
                }

                if (existing) {
                    update.push({
                        type: stat,
                        value: player.stats[stat]
                    });
                } else {
                    insert.push({
                        account_id: account.id,
                        type: stat,
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
            await db.updateTable('hiscore').set(update[i]).where('account_id', '=', account.id).where('type', '=', update[i].type).execute();
        }
    } catch (err) {
        if (err instanceof Error) {
            console.error(file, err.message);
        }
    }
}
console.timeEnd('hiscores');

process.exit(0);
