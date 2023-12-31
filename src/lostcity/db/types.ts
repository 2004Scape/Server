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
    registration_date: Generated<Timestamp>;
};
export type newspost = {
    id: Generated<number>;
    category_id: number;
    title: string;
    content: string;
    date: Timestamp;
};
export type newspost_category = {
    id: Generated<number>;
    name: string;
    style: string;
};
export type DB = {
    account: account;
    newspost: newspost;
    newspost_category: newspost_category;
};
