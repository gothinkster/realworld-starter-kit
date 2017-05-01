module.exports = {

  async byComment (comment, ctx, next) {
    return next()
  },

  async get (ctx) {
    ctx.body = 'GET /articles/:slug/comments'
  },

  async post (ctx) {
    ctx.body = 'POST /articles/:slug/comments'
  },

  async del (ctx) {
    ctx.body = 'DELETE /articles/:slug/comments/:comment'
  }

}
