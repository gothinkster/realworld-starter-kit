const config = require('config')
const http = require('http')
const Koa = require('koa')

const app = new Koa()

app.keys = [config.secret]

require('schemas')(app)

const responseTime = require('koa-response-time')
const helmet = require('koa-helmet')
const logger = require('koa-logger')
const camelizeMiddleware = require('middleware/camelize-middleware')
const error = require('middleware/error-middleware')
const db = require('middleware/db-middleware')
const cors = require('kcors')
const jwt = require('middleware/jwt-middleware')
const bodyParser = require('koa-bodyparser')
const pagerMiddleware = require('middleware/pager-middleware')
const userMiddleware = require('middleware/user-middleware')
const routes = require('routes')

if (!config.env.isTest) {
  app.use(responseTime())
  app.use(helmet())
}

app.use(logger())

app.use(camelizeMiddleware)

app.use(error)
app.use(db(app))
app.use(cors(config.cors))
app.use(jwt)
app.use(bodyParser(config.bodyParser))

app.use(userMiddleware)
app.use(pagerMiddleware)

app.use(routes)

const server = require('http-shutdown')(http.createServer(app.callback()))
app.server = server

module.exports = app
