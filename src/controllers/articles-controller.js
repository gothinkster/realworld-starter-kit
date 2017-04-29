const slug = require('slug')
const uuid = require('uuid')
const humps = require('humps')
const _ = require('lodash')

module.exports = {

  async bySlug (slug, ctx, next) {
    if (!slug) {
      ctx.throw(404)
    }

    const [article] = await ctx.app.db('articles')
      .where({slug})
      .select()

    if (!article) {
      ctx.throw(404)
    }

    const tagsRelations = await ctx.app.db('articles_tags')
      .select()
      .where({article: article.id})

    let tagList = []

    if (tagsRelations && tagsRelations.length > 0) {
      tagList = await ctx.app.db('tags')
        .select()
        .whereIn('id', tagsRelations.map(r => r.tag))

      tagList = tagList.map(t => t.name)
    }

    article.tagList = tagList

    article.favorited = false

    const [author] = await ctx.app.db('users')
      .where({id: article.author})
      .select('username', 'bio', 'image', 'id')

    article.author = author

    article.author.following = false

    const {user} = ctx.state

    if (user && user.username !== article.author.username) {
      const res = await ctx.app.db('followers')
        .where({user: article.author.id, follower: user.id})
        .select()

      if (res.length > 0) {
        article.author.following = true
      }
    }

    ctx.params.article = article
    ctx.params.author = author
    ctx.params.tagList = tagList
    ctx.params.tagsRelations = tagsRelations

    return next()
  },

  async get (ctx) {
    // ?tag=AngularJS ?author=jake ?favorited=jake ?limit=20 ?offset=0
    ctx.body = 'GET /articles'
  },

  async getOne (ctx) {
    ctx.body = {article: ctx.params.article}
  },

  async post (ctx) {
    const {body} = ctx.request
    let {article} = body
    let tags
    const opts = {abortEarly: false}

    article.id = uuid()
    article.author = ctx.state.user.id

    article = await ctx.app.schemas.article.validate(article, opts)

    article.slug = slug(_.get(article, 'title', ''), {lower: true})

    if (article.tagList && article.tagList.length > 0) {
      tags = await Promise.all(
        article.tagList
          .map(t => ({id: uuid(), name: t}))
          .map(t => ctx.app.schemas.tag.validate(t, opts))
      )
    }

    await ctx.app.db('articles')
      .insert(humps.decamelizeKeys(_.omit(article, ['tagList'])))

    for (var i = 0; i < tags.length; i++) {
      try {
        await ctx.app.db('tags').insert(humps.decamelizeKeys(tags[i]))
      } catch (err) {
        if (!err.message.includes('UNIQUE constraint failed')) {
          throw err
        }
      }
    }

    tags = await ctx.app.db('tags')
      .select()
      .whereIn('name', tags.map(t => t.name))

    const relations = tags.map(t => ({
      id: uuid(),
      tag: t.id,
      article: article.id
    }))

    await ctx.app.db('articles_tags').insert(relations)

    article.favorited = false
    article.author = _.pick(ctx.state.user, ['username', 'bio', 'image'])
    article.author.following = false

    ctx.body = {article}
  },

  async put (ctx) {
    ctx.body = 'PUT /articles/:slug'
  },

  async del (ctx) {
    ctx.body = 'DELETE /articles/:slug'
  },

  feed: {

    async get (ctx) {
      // ?limit=20 ?offset=0
      ctx.body = 'GET /articles/feed'
    }

  },

  favorite: {

    async post (ctx) {
      // create favorite relation and increment counter
      ctx.body = 'POST /articles:slug/favorite'
    },

    async del (ctx) {
      ctx.body = 'DELETE /articles:slug/favorite'
    }

  },

  comments: {

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

}
