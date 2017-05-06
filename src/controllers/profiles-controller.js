const _ = require('lodash')
const uuid = require('uuid')

const {getSelect} = require('lib/utils')
const {userFields, relationsMaps} = require('lib/relations-map')
const joinJs = require('join-js').default

module.exports = {

  async byUsername (username, ctx, next) {
    if (!username) {
      ctx.throw(404)
    }

    const {user} = ctx.state

    ctx.params.profile = await ctx.app.db('users')
      .select(
        ...getSelect('users', 'profile', userFields),
        'followers.id as profile_following'
      )
      .where({username})
      .leftJoin('followers', function () {
        this
          .on('users.id', '=', 'followers.user')
          .onIn('followers.follower', [user && user.id])
      })

    if (!ctx.params.profile || !ctx.params.profile.length) {
      ctx.throw(404)
    }

    ctx.params.profile = joinJs.mapOne(
      ctx.params.profile,
      relationsMaps,
      'userMap',
      'profile_'
    )

    await next()

    if (ctx.body.profile) {
      ctx.body.profile = _.omit(ctx.body.profile, 'id')
      ctx.body.profile.following = Boolean(ctx.body.profile.following)
    }
  },

  async get (ctx) {
    const {profile} = ctx.params
    ctx.body = {profile}
  },

  follow: {

    async post (ctx) {
      const {profile} = ctx.params
      const {user} = ctx.state

      if (profile.following) {
        ctx.body = {profile}
        return
      }

      if (user.username !== profile.username) {
        const follow = {
          id: uuid(),
          user: profile.id,
          follower: user.id
        }

        try {
          await ctx.app.db('followers').insert(follow)
        } catch (err) {
          if (Number(err.errno) !== 19 && Number(err.code) !== 23505) {
            throw err
          }
        }

        profile.following = true
      }

      ctx.body = {profile}
    },

    async del (ctx) {
      const {profile} = ctx.params
      const {user} = ctx.state

      if (!profile.following) {
        ctx.body = {profile}
        return
      }

      await ctx.app.db('followers')
        .where({user: profile.id, follower: user.id})
        .del()

      profile.following = false

      ctx.body = {profile}
    }

  }

}
