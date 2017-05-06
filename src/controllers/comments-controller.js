const humps = require('humps')
const uuid = require('uuid')
const _ = require('lodash')
const {getSelect} = require('lib/utils')
const {commentFields, userFields, relationsMaps} = require('lib/relations-map')
const joinJs = require('join-js').default

module.exports = {

  async byComment (comment, ctx, next) {
    if (!comment) {
      ctx.throw(404)
    }

    comment = await ctx.app.db('comments').first().where({id: comment})

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
      .select(
        ...getSelect('comments', 'comment', commentFields),
        ...getSelect('users', 'author', userFields),
        'followers.id as author_following'
      )
      .where({article: article.id})
      .leftJoin('users', 'comments.author', 'users.id')
      .leftJoin('followers', function () {
        this
          .on('users.id', '=', 'followers.user')
          .onIn('followers.follower', [user && user.id])
      })

    comments = joinJs
      .map(comments, relationsMaps, 'commentMap', 'comment_')
      .map(c => {
        delete c.author.id
        c.author.following = Boolean(c.author.following)
        return c
      })

    ctx.body = {comments}
  },

  async post (ctx) {
    const {body} = ctx.request
    const {user} = ctx.state
    const {article} = ctx.params
    let {comment = {}} = body

    const opts = {abortEarly: false}

    comment.id = uuid()
    comment.author = user.id
    comment.article = article.id

    comment = await ctx.app.schemas.comment.validate(comment, opts)

    await ctx.app.db('comments').insert(humps.decamelizeKeys(comment))

    comment.author = _.pick(user, ['username', 'bio', 'image', 'id'])

    ctx.body = {comment}
  },

  async del (ctx) {
    const {comment} = ctx.params

    await ctx.app.db('comments').del().where({id: comment.id})

    ctx.body = {}
  }

}
