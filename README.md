# ![RealWorld Example App using Java 11 and Dropwizard](logo.png)

> ### Dropwizard + JDBI3 codebase that tries to adhere to the [RealWorld](https://github.com/gothinkster/realworld-example-apps) spec and API.

This codebase was created to demonstrate a fully fledged fullstack application built with [Dropwizard](https://www.dropwizard.io) including CRUD operations, authentication, pagination, and more.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.

# How it works

The application uses Dropwizard.

And the code organize as this:

1. `api` contains the data transfer objects used in the REST services API
2. `resources` contains the REST resource classes
3. `core` contains the business logic implemented as service classes
4. `db` contains the persistence layer (data access objects)
5. `security` contains all the security related functionality (JWT)

# Security

Simple JWT filter integrated in Dropwizard auth mechanism based on [JJWT](https://github.com/jwtk/jjwt) library.

The JWT secret key can be configured in `config.yml` file.

# Database

The application uses PostgreSQL database.

# Getting started

You need Java 11 or greater installed.

How to start the RealWorld application
---

1. Run `mvn clean install` to build the application
1. Start PostgreSQL database `docker-compose -f docker-compose up db`
1. Migrate application database schema to latest version `java -jar target/dropwizard-realworld-example-app-1.0-SNAPSHOT.jar db migrate config.yml`
1. Start application with `java -jar target/dropwizard-realworld-example-app-1.0-SNAPSHOT.jar server config.yml`
1. To check that your application is running enter url `http://localhost:8080`

or use docker 

1. Run `mvn clean install` to build your application
2. Start containers `docker-compose -f docker-compose.yml up`

Health Check
---

To see your applications health enter url `http://localhost:8081/healthcheck`

How to run Sonar code quality check
---

Sonar can be used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f sonar.yml up -d
```

Wait for Sonar to start (check http://localhost:9001), then run a Sonar analysis:

```
 mvn clean install sonar:sonar -Dsonar.host.url=http://localhost:9001
```