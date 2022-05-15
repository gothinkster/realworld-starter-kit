import 'dotenv/config';
import { knex, Knex } from 'knex';

const config: { [key: string]: Knex.Config } = {
    development: {
        client: 'pg',
        connection: {
            host: process.env.DATABASE_HOST,
            port: parseFloat(process.env.DATABASE_PORT),
            user: process.env.DATABASE_USERNAME,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
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
