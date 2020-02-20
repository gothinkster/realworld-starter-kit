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
       src="https://img.shields.io/badge/python-3.8-2A79B8.svg">
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


### [Demo (app)](https://pyramid-realworld.herokuapp.com/)&nbsp;&nbsp;&nbsp;&nbsp;[Demo (api)](https://pyramid-realworld.herokuapp.com/api)


This codebase was created to demonstrate a fully fledged fullstack application built with **Pyramid** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Pyramid** community styleguides & best practices. You are encouraged to [use it as a scaffold/template](https://github.com/niteoweb/pyramid-realworld-example-app/generate) for your next Pyramid project.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

Pyramid using [pyramid_openapi3](https://github.com/pylons/pyramid_openapi3) for request/response validation and [pyramid_deferred_sqla](https://github.com/niteoweb/pyramid_deferred_sqla) for PostgreSQL integration. Deployed to [Heroku](https://pyramid-realworld.herokuapp.com/api).

Pyramid serves one of the [RealWorld.io frontends](https://github.com/gothinkster/realworld#frontends) (Elm) on root, so it is easier to understand how things fit together. The frontend is interchangeable, you can use any
RealWorld.io frontend.

# Getting started

You need to have [Docker](https://www.docker.com), [Nix](https://nixos.org/nix) and [direnv](https://direnv.net/) installed and configured on your system.


Docker should be running. Then you can run:

    $ make install
    $ make start-pgsql
    $ make devdb
    $ make run

Now point your browser to:
 * http://localhost:8080/ -> Conduit frontend app using the API
 * http://localhost:8080/api -> Swagger documentation for the API


To run unit tests, mypy typing checker and flake8 linter:

    $ make tests

To stop docker and clean container, you can run:

    $ make stop-pgsql
    $ make clean-pgsql
