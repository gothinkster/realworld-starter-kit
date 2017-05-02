const config = require('config')
const fs = require('fs')

module.exports = function (app) {
  if (config.db.client === 'sqlite3') {
    try {
      fs.mkdirSync(config.server.data)
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
  }

  const db = require('knex')(config.db)
  app.db = db
  let promise

  if (!config.env.isTest) {
    app.migration = true
    promise = db.migrate.latest()
      .then(() => { app.migration = false }, console.error)
  }

  return async function (ctx, next) {
    if (ctx.app.migration && promise) {
      await promise
    }

    return next()
  }
}
