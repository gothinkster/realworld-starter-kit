# ![RealWorld Example App](logo.png)

> ### Example Node.Js (Koa.js + Knex) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

This repo is functionality complete — PRs and issues welcome!

This codebase was created to demonstrate a fully fledged fullstack application built with **Koa.js + Knex** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Koa.js + Knex** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# Getting started

## Installation
1. Instal [Node.JS](https://nodejs.org/en/download/package-manager/) latest version
2. Clone this repo
3. Install dependencies, just run in project folder: `npm i` or `yarn`

## Usage
1. run `npm start` to start server

## Testing
1. run `npm test` for tests

## Server Configuration (optional)

You can use `.env` file, to configure project like this:

```
NODE_ENV = development
PORT = 3000
SECRET = secret
JWT_SECRET = secret
DB_CLIENT = sqlite3
#DB_CONNECTION = postgres://user:password@localhost:5432/db_name
```

you can just copy `.example-env`

## Variables description

`NODE_ENV` - specify env: development/production/test. `development` by default

`NODE_PORT` - specify port: `3000` by default

`NODE_SECRET` - custom secret for generating passwords. `secret` by default

`JWT_SECRET` - custom secret for generating jwt tokens. `secret` secret by default

`DB_CLIENT` - database to use. `pg` - postgress or `sqlite3`. `sqlite3` by default

`DB_CONNECTION` - db connection string for `postgress` database.


## Fixtures (optional)

1. load fixtures: `npm run db:load` (it uses settings from `.env`). Don't forget to set `NODE_ENV`.

## Styleguide
[![Standard - JavaScript Style Guide](https://cdn.rawgit.com/feross/standard/master/badge.svg)](https://github.com/feross/standard)

# How it works

> Describe the general architecture of your app here
