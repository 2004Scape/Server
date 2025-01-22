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
                database: Environment.DB_NAME as string,
                host: Environment.DB_HOST as string,
                user: Environment.DB_USER as string,
                password: Environment.DB_PASS as string
            })
    });
}

export const db = new Kysely<DB>({
    dialect
});
