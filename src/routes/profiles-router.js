const Router = require('koa-router')
const ctrl = require('controllers').profiles
const router = new Router()

const auth = require('middleware/auth-required-middleware')

router.param('username', ctrl.byUsername)

router.get('/profiles/:username', ctrl.get)
router.post('/profiles/:username/follow', auth, ctrl.follow.post)
router.del('/profiles/:username/follow', auth, ctrl.follow.del)

module.exports = router.routes()
