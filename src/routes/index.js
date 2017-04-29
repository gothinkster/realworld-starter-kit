const Router = require('koa-router')
const router = new Router()
const api = new Router()

const users = require('./users-router')
const articles = require('./articles-router')
const profiles = require('./profiles-router')
const tags = require('./tags-router')

api.use(users)
api.use(articles)
api.use(profiles)
api.use(tags)

router.use('/api', api.routes())

module.exports = router.routes()
