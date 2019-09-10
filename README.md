
# ![RealWorld Hexagon Implementation](logo.png)

> Hexagon codebase containing real world examples (CRUD, auth, advanced patterns, etc) that
> adheres to the [RealWorld] spec and API.

### [Demo](https://github.com/gothinkster/realworld)
### [RealWorld]

This codebase was created to demonstrate a fully fledged fullstack application built with
**Hexagon** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Hexagon** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the
[RealWorld].

[RealWorld]: https://github.com/gothinkster/realworld

# How it works

The project has a Gradle multi-module layout. Deployment code is located at the `deploy` folder.
The goal is to code a full stack application providing a module for the back-end, the front-end
(TBD) and the Mobile application (TBD).

Docker Compose is used to build images for each module (if applies) and publish them to the Docker
Registry.

See:

* [backend readme](backend/README.md)
* [frontend readme](frontend/README.md) (TBD)
* [mobile readme](mobile/README.md) (TBD)

# Getting started

The source code has the bare minimum formatting rules inside the `.editorconfig` file.

Gradle is the tool used to automate build tasks locally.

For image creation, Docker builds binaries (using Gradle) in a first stage. The outcome of this
stage is used to create the application image (check `backend/Dockerfile` for more details).

Docker Compose is used to build all modules (from their `Dockerfile`) and run them inside
containers.

To be sure that everything works before pushing changes, you can link the `deploy/pre-push` file to
the `.git/hooks` directory:

    ln -s $(pwd)/deploy/pre-push .git/hooks/pre-push
    
However, you can use `git push --no-verify` to skip these checks.

Useful build commands:

* Build: `./gradlew installDist`. Generates:
  - Application directory: `backend/build/install/backend`
  - Packaged application: `backend/build/distributions`
  - Web application: `backend/build/libs/ROOT.war`
  - Single JAR with dependencies: `backend/build/libs/<module>-all-<version>.jar`
  - Application specifications: `backend/build/reports/cucumber`

* Rebuild: `./gradlew clean installDist`

* Documentation: `./gradlew doc`. Creates:
  - API documentation: `backend/build/dokka/backend`
  - Coverage report: `backend/build/reports/jacoco/test/html`
  
* Generate everything (binaries and documentation): `./gradlew all` 

* Run: `./gradlew run`

* Watch: `./gradlew --no-daemon --continuous runService`

* Build local container images: `docker-compose build`

* Start application inside containers: `docker-compose up -d`

# Testing

The `HTTPie` and `jq` tools are used for testing the application manually in some scripts.

Postman is also used to perform requests interactively: `backend/src/test/resources/postman/*`.

# Continuous Integration

The build pipeline is implemented using Travis CI, it takes care of checking the tests (including
Postman collection tests) and the following tasks:

## Release

Tagging of source code and container images should be done upon Pull Request merge on live branches.
This is still to be implemented by the CI/CD pipeline using Travis.

## Publish

Published artifacts are Docker images. They are published to a Docker registry. For Minikube and
Docker Compose, the local image store is used instead a registry.

Build repository container images: `registry="<repository>" docker-compose build` The `<repository>`
value *MUST* end with '/'. Ie: `registry="example.com/" docker-compose build`

## Deployment

Deploy the application services on a server upon `master` push. Check the
[deploy's readme file](deploy/README.md) for more information.

# TODO

* Add badges to readme
* Add npm to Travis CI cache
* Publish in Docker Registry
* Deploy on GCP
* Add requests' bodies validation returning as many errors as wrong fields
* Code stress tests using Gatling.io against local, container, or deployed service
* Generate a documentation site (use Orchid or JBake)
* Create native executable using GraalVM
* Document code (Dokka)
* Publish front end in GitHub pages
* Migrate readme.md API documentation to Swagger
* Add unit tests to cover all code (using mocks), this may shape the future `hexagon_test` module
