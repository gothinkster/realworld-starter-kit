exports.up = function (knex) {
  return knex.schema

    .createTable('users', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('email').unique().notNullable()
      table.string('username').unique().notNullable()
      table.string('image').defaultTo('')
      table.string('bio').defaultTo('')
      table.string('password').notNullable()
      table.timestamps(true, true)
    })

    .createTable('articles', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('slug').unique().notNullable()
      table.string('title').notNullable()
      table.string('body').notNullable()
      table.string('description').notNullable()
      table.number('favorites_count').notNullable().defaultTo(0)
      table.string('author').notNullable().references('users.id')
      table.timestamps(true, true)
    })

    .createTable('comments', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('body').notNullable()
      table.string('author').notNullable().references('users.id')
      table.string('article').notNullable().references('articles.id')
      table.timestamps(true, true)
    })

    .createTable('favorites', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('user').notNullable().references('users.id')
      table.string('article').notNullable().references('articles.id')
      table.timestamps(true, true)
    })

    .createTable('followers', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('user').notNullable().references('users.id')
      table.string('follower').notNullable().references('users.id')
      table.unique(['user', 'follower'])
      table.timestamps(true, true)
    })

    .createTable('tags', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('name').unique().notNullable()
      table.timestamps(true, true)
    })

    .createTable('articles_tags', function (table) {
      table.uuid('id').unique().primary().notNullable()
      table.string('article').notNullable().references('articles.id')
      table.string('tag').notNullable().references('tags.id')
      table.unique(['tag', 'article'])
      table.timestamps(true, true)
    })
}

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('users')
    .dropTableIfExists('articles')
    .dropTableIfExists('comments')
    .dropTableIfExists('favorites')
    .dropTableIfExists('followers')
    .dropTableIfExists('tags')
    .dropTableIfExists('articles_tags')
}
