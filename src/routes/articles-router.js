const Router = require('koa-router')
const ctrl = require('controllers').articles
const router = new Router()

const auth = require('middleware/auth-required-middleware')

router.param('slug', ctrl.bySlug)
router.param('comment', ctrl.comments.byComment)

router.get('/articles', ctrl.get)
router.post('/articles', auth, ctrl.post)

router.get('/articles/feed', ctrl.feed.get)

router.get('/articles/:slug', ctrl.getOne)
router.put('/articles/:slug', ctrl.put)
router.del('/articles/:slug', ctrl.del)

router.post('/articles/:slug/favorite', auth, ctrl.favorite.post)
router.del('/articles/:slug/favorite', auth, ctrl.favorite.del)

router.get('/articles/:slug/comments', ctrl.comments.get)
router.post('/articles/:slug/comments', ctrl.comments.post)
router.del('/articles/:slug/comments/:comment', ctrl.comments.del)

module.exports = router.routes()
