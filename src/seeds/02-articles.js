const faker = require('faker')
const _ = require('lodash')
const uuid = require('uuid')
const slug = require('slug')
const {subMonths} = require('date-fns')
const config = require('../config')
const {getUsers} = require('./01-users')

function getArticles (users) {
  return _.flatMap(users, function (user) {
    return Array.from({length: 105}, function () {
      const title = faker.lorem.sentence()
      const date = faker.date.between(subMonths(new Date(), 18), new Date())
        .toISOString()

      return {
        id: uuid(),
        author: user.id,
        title,
        slug: slug(title, {lower: true}),
        body: faker.lorem.sentences(10),
        description: faker.lorem.sentences(2),
        created_at: date,
        updated_at: date
      }
    })
  })
}

exports.getArticles = getArticles

exports.seed = async function (knex) {
  const users = getUsers()

  if (config.env.isProd) {
    await knex('articles').whereIn('author', users.map(u => u.id)).del()
  } else {
    await knex('articles').del()
  }

  return Promise.all(getArticles(users).map(a => knex('articles').insert(a)))
}
