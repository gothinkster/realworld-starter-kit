const path = require('path')
const ROOT = path.resolve(__dirname, '../../')
require('dotenv').config({path: path.join(ROOT, '.env')})

module.exports = {

  development: {
    client: 'sqlite3',
    connection: path.join(ROOT, 'data/dev.sqlite3'),
    migrations: {
      directory: path.join(ROOT, 'src/migrations'),
      tableName: 'migrations'
    },
    debug: false,
    seeds: {
      directory: path.join(ROOT, 'src/seeds')
    },
    useNullAsDefault: true
  },

  test: {
    client: 'sqlite3',
    connection: path.join(ROOT, 'data/test.sqlite3'),
    migrations: {
      directory: path.join(ROOT, 'src/migrations'),
      tableName: 'migrations'
    },
    seeds: {
      directory: path.join(ROOT, 'src/seeds')
    },
    useNullAsDefault: true
  },

  production: {
    client: 'pg',
    connection: process.env.DB_CONNECTION,
    pool: {
      min: 2,
      max: 10
    },
    migrations: {
      directory: path.join(ROOT, 'src/migrations'),
      tableName: 'migrations'
    },
    seeds: {
      directory: path.join(ROOT, 'src/seeds')
    }
  }

}
