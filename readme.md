# ![RealWorld Example App](logo.png)

> ### Pyramid codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://github.com/gothinkster/realworld)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Pyramid** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Pyramid** community styleguides & best practices.

For more information on how this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

Pyramid using pyramid_openapi3 for request/response validation and pyramid_deferred_sqla for PostgreSQL integration. Deployed to Heroku

# Getting started

You need to have pipenv and Python 3.7 installed on your machine. Then you can run:

    $ make install
    $ make run
    $ make tests

# TODO

* [ ] Figure out how to run postgres on CircleCI.
* [ ] Add badges.
* [ ] Run Postman tests in CircleCI.
* [ ] Serve one of the frontends on root.
