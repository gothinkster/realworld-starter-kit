# ![RealWorld Example App](logo.png)

> ### Gleam + Elli + PGO codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with Gleam including CRUD operations, authentication, routing, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

> TODO

# Getting started

Compile:
```sh
rebar3 compile
```

Set up the database for development:
```
$ rebar3 shell --apps pgo
1> 'conduit@db_setup':reset_database(<<"conduit_dev"/utf8>>).
```

For tests, the test database will be automatically re-set
before running the tests.

Run tests:
```sh
rebar3 eunit
```

Run the app with access to the Erlang REPL:
```sh
rebar3 shell
```
