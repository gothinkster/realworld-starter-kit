require('dotenv').config()
const path = require('path')
const _ = require('lodash')
const knexfile = require('./knexfile')

const ROOT = path.resolve(__dirname, '../')
const NODE_ENV = _.defaultTo(process.env.NODE_ENV, 'development')

const isProd = NODE_ENV === 'production'
const isTest = NODE_ENV === 'test'
const isDev = NODE_ENV === 'development'

module.exports = {
  server: {
    port: _.defaultTo(process.env.PORT, 3000),
    host: _.defaultTo(process.env.HOST, 'localhost'),
    root: ROOT,
    data: path.join(ROOT, '../', '/data')
  },

  env: {
    isDev,
    isProd,
    isTest
  },

  cors: {
    origin: '*',
    exposeHeaders: ['Authorization'],
    credentials: true,
    allowMethods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowHeaders: ['Authorization', 'Content-Type'],
    keepHeadersOnError: true
  },

  bodyParser: {
    enableTypes: ['json']
  },

  db: knexfile[NODE_ENV],

  secret: _.defaultTo(process.env.SECRET, 'secret'),

  jwtSecret: _.defaultTo(process.env.JWT_SECRET, 'secret'),

  jwtOptions: {
    expiresIn: '7d'
  }
}
