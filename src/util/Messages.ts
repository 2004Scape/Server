import { db } from '#/db/query.js';

export const getUnreadMessageCount = async (accountId: number): Promise<number> => {
    const messages = await db
        .selectFrom('message_thread as thd')
        .leftJoin('message_status as s', join => join
            .onRef('s.thread_id', '=', 'thd.id')
            .on('s.account_id', '=', accountId)
        )
        .innerJoin((eb) => eb
            .selectFrom('message')
            .where('message.deleted', 'is', null)
            .groupBy('message.thread_id')
            .select([
                'message.thread_id',
                db.fn.max('message.created').as('last_message_date')
            ])
            .as('last_message'),
        (join) => join.onRef('last_message.thread_id', '=', 'thd.id'))
        .where(eb => eb.or([
            eb('thd.from_account_id', '=', accountId),
            eb('thd.to_account_id', '=', accountId)
        ]))
        .where((eb) => eb.or([
            eb('s.deleted', 'is', null),
            eb('s.deleted', '<', eb.ref('last_message.last_message_date'))
        ]))
        .where((eb) => eb.or([
            eb('s.read', 'is', null),
            eb('s.read', '<', eb.ref('last_message.last_message_date'))
        ]))
        .where('thd.last_message_from', '!=', accountId)
        .select(db.fn.countAll().as('unread'))
        .executeTakeFirst();

    return Number(messages?.unread || 0);
};
