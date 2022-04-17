import 'dotenv/config';
import { knex, Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: process.env.DATABASE_URL,
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};

module.exports = config;
