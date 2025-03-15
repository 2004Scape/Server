import { db } from '#/db/query.js';

export const getUnreadMessageCount = async (accountId: number): Promise<number> => {
    const messages = await db
        .selectFrom('message_thread')
        .select(({ fn }) => [fn.count<number>('id').as('messageCount')])
        .where('to_deleted', 'is', null)
        .where(eb => eb.or([eb('to_account_id', '=', accountId), eb('from_account_id', '=', accountId)]))
        .where('last_message_from', '!=', accountId)
        .where('read', 'is', null)
        .executeTakeFirst();
    return messages?.messageCount ?? 0;
};
