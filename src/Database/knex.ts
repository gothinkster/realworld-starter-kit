import knex, { Knex } from 'knex';

export const KnexInstance: Knex = knex({
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
});
