const path = require('path')
const ROOT = path.resolve(__dirname, '../../')
require('dotenv').config({path: path.join(ROOT, '.env')})

const {DB_CLIENT, DB_CONNECTION} = process.env

const options = {
  client: DB_CLIENT || 'sqlite3',
  connection: DB_CONNECTION || path.join(ROOT, 'data/dev.sqlite3'),
  migrations: {
    directory: path.join(ROOT, 'src/migrations'),
    tableName: 'migrations'
  },
  debug: false,
  seeds: {
    directory: path.join(ROOT, 'src/seeds')
  },
  useNullAsDefault: !DB_CLIENT || DB_CLIENT === 'sqlite3'
}

if (DB_CLIENT && DB_CLIENT !== 'sqlite3') {
  options.pool = {
    min: 2,
    max: 10
  }
}

module.exports = {

  development: Object.assign({}, options),

  test: Object.assign({}, options, {
    connection: DB_CONNECTION || path.join(ROOT, 'data/test.sqlite3')
  }),

  production: Object.assign({}, options, {
    connection: DB_CONNECTION || path.join(ROOT, 'data/prod.sqlite3')
  })

}
