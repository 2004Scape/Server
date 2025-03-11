import { db } from '#/db/query.js';

export const getUnreadMessageCount = async (accountId: number): Promise<number> => {
    return Number((await db.selectFrom('message_thread as thd')
        .leftJoin('message_status as s', join => {
            return join.onRef('s.thread_id', '=', 'thd.id')
                .on('s.account_id', '=', accountId);
        })
        .where(eb => eb.or([
            eb('thd.from_account_id', '=', accountId),
            eb('thd.to_account_id', '=', accountId)
        ]))
        .where('s.deleted', 'is', null)
        .where('s.read', 'is', null)
        .where('thd.last_message_from', '!=', accountId)
        .select(db.fn.countAll().as('unread_messages'))
        .executeTakeFirst())?.unread_messages || 0);
};
