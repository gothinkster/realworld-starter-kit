const humps = require('humps')
const uuid = require('uuid')

module.exports = {

  async byComment (comment, ctx, next) {
    if (!comment) {
      ctx.throw(404)
    }

    [comment] = await ctx.app.db('comments')
      .select()
      .where({id: comment})

    if (!comment) {
      ctx.throw(404)
    }

    ctx.params.comment = comment

    return next()
  },

  async get (ctx) {
    const {user} = ctx.state
    const {article} = ctx.params

    let comments = await ctx.app.db('comments')
      .select('id', 'created_at', 'updated_at', 'body', 'author')
      .where({article: article.id})

    comments = await Promise.all(comments.map(async c => {
      const [author] = await ctx.app.db('users')
        .where({id: c.author})
        .select('username', 'bio', 'image', 'id')

      author.following = false

      if (user && user.username !== author.username) {
        const res = await ctx.app.db('followers')
          .where({user: author.id, follower: user.id})
          .select()

        if (res.length > 0) {
          author.following = true
        }
      }

      delete author.id

      return Object.assign({}, c, {author})
    }))

    ctx.body = {comments}
  },

  async post (ctx) {
    const {body} = ctx.request
    const {user} = ctx.state
    const {article, author} = ctx.params
    let {comment = {}} = body

    const opts = {abortEarly: false}

    comment.id = uuid()
    comment.author = user.id
    comment.article = article.id

    comment = await ctx.app.schemas.comment.validate(comment, opts)

    await ctx.app.db('comments').insert(humps.decamelizeKeys(comment))

    comment.author = author

    ctx.body = {comment}
  },

  async del (ctx) {
    const {comment} = ctx.params

    await ctx.app.db('comments')
      .del()
      .where({id: comment.id})

    ctx.body = {}
  }

}
