import Database from 'better-sqlite3';
import { createPool } from 'mysql2';
import { Dialect, Kysely, MysqlDialect, SqliteDialect } from 'kysely';

import { DB } from '#/db/types.js';

import Environment from '#/util/Environment.js';

let dialect: Dialect;

if (Environment.DB_BACKEND === 'sqlite') {
    dialect = new SqliteDialect({
        database: async () => new Database('db.sqlite')
    });
} else {
    dialect = new MysqlDialect({
        pool: async () =>
            createPool({
                database: Environment.DB_NAME,
                host: Environment.DB_HOST,
                port: Environment.DB_PORT,
                user: Environment.DB_USER,
                password: Environment.DB_PASS,
                timezone: 'Z'
            })
    });
}

export const db = new Kysely<DB>({
    dialect,
    // log(event) {
    //     if (event.level === 'query') {
    //         console.log(event.query.sql);
    //         console.log(event.query.parameters);
    //     }
    // }
});

export function toDbDate(date: Date | string | number) {
    if (typeof date === 'string' || typeof date === 'number') {
        date = new Date(date);
    }

    return date.toISOString().slice(0, 19).replace('T', ' ');
}
