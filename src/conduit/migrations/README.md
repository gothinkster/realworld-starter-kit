# Alembic migrations

This document describes how to create and run db migrations.

## Create a migration

Prerequisites:

- Postgres must be running (`make pgsql`)
- Database must be populated (`make devdb`)

Start by creating a migration recipe with:

```shell
pipenv run alembic -c etc/development.ini -n app:conduit revision --autogenerate -m "message"
```

The `message` should be descriptive to what recipe does to the db. Avoid short titles, abbreviations, etc:

Good:

- Add password field to the User model
- Remove modified column from Post model

Bad:

- Create user
- Update post


## Test a migration

Upgrading:

```shell
pipenv run alembic -c etc/development.ini -n app:conduit upgrade head
```

Downgrading:

```shell
pipenv run alembic -c etc/development.ini -n app:conduit downgrade head
```
