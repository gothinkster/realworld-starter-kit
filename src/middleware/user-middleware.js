const {has} = require('lodash')

module.exports = async (ctx, next) => {
  if (has(ctx, 'state.jwt.sub.id')) {
    [ctx.state.user] = await ctx.app.db('users')
      .where({id: ctx.state.jwt.sub.id})
      .select(
        'id',
        'email',
        'username',
        'image',
        'bio',
        'created_at',
        'updated_at'
      )
  }

  return next()
}
