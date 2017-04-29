const koaJwt = require('koa-jwt')
const {jwtSecret} = require('config')

module.exports = koaJwt({
  getToken (ctx, opts) {
    const {authorization} = ctx.header

    if (authorization && authorization.split(' ')[0] === 'Token') {
      return authorization.split(' ')[1]
    }

    return null
  },
  secret: jwtSecret,
  passthrough: true,
  key: 'jwt'
})
