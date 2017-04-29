const config = require('config')
const db = require('knex')(config.db)
const fs = require('fs')

module.exports = function (app) {
  app.db = db
  let promise

  if (!config.env.isProd) {
    try {
      fs.mkdirSync(config.server.data)
    } catch (err) {
      if (err.code !== 'EEXIST') {
        throw err
      }
    }
  }

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
