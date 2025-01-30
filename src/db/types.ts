import type { ColumnType } from 'kysely';
export type Generated<T> = T extends ColumnType<infer S, infer I, infer U>
  ? ColumnType<S, I | undefined, U>
  : ColumnType<T, T | undefined, T>;
export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export type account = {
    id: Generated<number>;
    username: string;
    password: string;
    registration_ip: string | null;
    registration_date: Generated<string>;
    logged_in: Generated<number>;
    login_time: string | null;
    muted_until: string | null;
    banned_until: string | null;
    staffmodlevel: Generated<number>;
};
export type account_session = {
    id: Generated<number>;
    account_id: number;
    world: Generated<number>;
    profile: Generated<string>;
    session_uuid: string;
    timestamp: string;
    coord: number;
    event: string;
    event_type: Generated<number>;
};
export type friendlist = {
    account_id: number;
    friend_account_id: number;
};
export type hiscore = {
    profile: Generated<string>;
    account_id: number;
    type: number;
    level: number;
    value: number;
    date: Generated<string>;
};
export type hiscore_large = {
    profile: Generated<string>;
    account_id: number;
    type: number;
    level: number;
    value: number;
    date: Generated<string>;
};
export type ignorelist = {
    account_id: number;
    ignore_account_id: number;
};
export type newspost = {
    id: Generated<number>;
    category: number;
    title: string;
    content: string;
    slug: string | null;
    created: Generated<string>;
    updated: Generated<string>;
};
export type npc_hiscore = {
    id: Generated<number>;
    npc_id: number;
    account_id: number;
    kill_count: Generated<number>;
};
export type private_chat = {
    id: Generated<number>;
    from_account_id: number;
    to_account_id: number;
    message: string;
    date: Generated<string>;
};
export type public_chat = {
    id: Generated<number>;
    account_id: number;
    message: string;
    date: Generated<string>;
};
export type DB = {
    account: account;
    account_session: account_session;
    friendlist: friendlist;
    hiscore: hiscore;
    hiscore_large: hiscore_large;
    ignorelist: ignorelist;
    newspost: newspost;
    npc_hiscore: npc_hiscore;
    private_chat: private_chat;
    public_chat: public_chat;
};
