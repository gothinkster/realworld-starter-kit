# ![RealWorld Example App](logo.png)

<p align="center">
  <a href="https://circleci.com/gh/niteoweb/pyramid-realworld-example-app">
    <img alt="CircleCI for pyramid-realworld-example-app (master branch)"
         src="https://circleci.com/gh/niteoweb/pyramid-realworld-example-app.svg?style=shield">
  </a>
  <img alt="Test coverage (master branch)"
       src="https://img.shields.io/badge/tests_coverage-100%25-brightgreen.svg">
  <img alt="Type Hints coverage (master branch)"
       src="https://img.shields.io/badge/types_coverage-100%25-brightgreen.svg">
  <img alt="Supported Python versions"
       src="https://img.shields.io/badge/python-3.7-2A79B8.svg">
  <a href="https://github.com/niteoweb/pyramid-realworld-example-app/blob/master/LICENSE">
    <img alt="License: MIT"
         src="https://img.shields.io/badge/License-MIT-yellow.svg">
  </a>
  <a href="https://github.com/niteoweb/pyramid-realworld-example-app/graphs/contributors">
    <img alt="Built by these great folks!"
         src="https://img.shields.io/github/contributors/niteoweb/pyramid-realworld-example-app.svg">
  </a>
  <a href="https://webchat.freenode.net/?channels=pyramid">
    <img alt="Talk to us in #pyramid on Freenode IRC"
         src="https://img.shields.io/badge/irc-freenode-blue.svg">
  </a>
</p>

> ### Pyramid codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Pyramid** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Pyramid** community styleguides & best practices.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

Pyramid using [pyramid_openapi3](https://github.com/niteoweb/pyramid_openapi3) for request/response validation and [pyramid_deferred_sqla](https://github.com/niteoweb/pyramid_deferred_sqla) for PostgreSQL integration. Deployed to Heroku.

# Getting started

You need to have docker, [pipenv](https://pipenv.readthedocs.io/) and Python 3.7 installed on your machine.
Docker should be running. Then you can run:

    $ make install
    $ make start-pgsql
    $ make devdb
    $ make run

Now point your browser to:
 * http://localhost:8080/ -> Conduit frontend using the API
 * http://localhost:8080/api -> Swagger documentation for the API


To run unit tests, mypy typing checker and flake8 linter:
    $ make tests

To stop docker and clean container, you can run:
    $ make stop-pgsql
    $ make clean-pgsql

# TODO

* [x] Figure out how to run postgres on CircleCI.
* [x] Add badges.
* [x] Run Postman tests in CircleCI.
* [x] Implement all endpoints:
*   [x] `/users/login`
*   [x] `/users`
*   [x] `/profiles/{username}`
*   [x] `/profiles/{username}/follow`
*   [x] `/articles/feed`
*   [x] `/articles`
*   [x] `/articles/{slug}`
*   [x] `/articles/{slug}/comments`
*   [x] `/articles/{slug}/comments/{id}`
*   [x] `/articles/{slug}/favorite`
*   [x] `/tags`
* [x] Serve one of the frontends on root.
* [ ] Heroku deployment.
