const Router = require('koa-router')
const ctrl = require('controllers').tags
const router = new Router()

router.get('/tags', ctrl.get)

module.exports = router.routes()
