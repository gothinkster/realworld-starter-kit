# ![RealWorld Example App](logo.png)

> ### [Dart](https://dart.dev) codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://demo.realworld.io/)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **[Dart](https://github.com/dart-lang/shelf)** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **[Dart](https://dart.dev/community)** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

> Describe the general architecture of your app here

# Getting started

Install the [Dart SDK](https://dart.dev/get-dart).

## Running the App

### Create the database

This app uses [PostgreSQL](https://www.postgresql.org/). Check the [documentation](https://www.postgresql.org/docs/current/app-createdb.html) 
on how to create a database.

### Define the environment variables

Create a `.env` file according to the [template](.env.template) and run 
[dotenv](https://github.com/mockturtl/dotenv).

### Run the database migrations

```bash
$ dart run bin/migrations/migrate.dart up
```

### Running with the Dart SDK

You can run the example with the [Dart SDK](https://dart.dev/get-dart)
like this:

```
$ dart run bin/server.dart
Server listening on port 8080
```

### Running with Docker

If you have [Docker Desktop](https://www.docker.com/get-started) installed, you
can build and run with the `docker` command:

```
$ docker build . -t myserver
$ docker run -it -p 8080:8080 myserver
Server listening on port 8080
```

## Running the tests

### Create the database

See above.

### Define the environment variables

Copy the [`.env.test`](./.env.test) file contents to the `.env` file.

### Run the test script

```
$ ./test.sh
```
