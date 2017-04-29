const Router = require('koa-router')
const ctrl = require('controllers').users
const router = new Router()

const auth = require('middleware/auth-required-middleware')

router.post('/users/login', ctrl.login)
router.post('/users', ctrl.post)

router.get('/user', auth, ctrl.get)
router.put('/user', auth, ctrl.put)

module.exports = router.routes()
