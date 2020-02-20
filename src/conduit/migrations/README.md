# Alembic migrations

This document describes how to create and run db migrations.

## Create a migration

Prerequisites:

- Postgres must be running (`make pgsql`)
- Database must be populated (`make devdb`)

Start by creating a migration recipe with:

```shell
poetry run alembic -c etc/alembic.ini -x ini=etc/development.ini revision --autogenerate -m "message"
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
poetry run alembic -c etc/alembic.ini -x ini=etc/development.ini upgrade head
```

Downgrading:

```shell
poetry run alembic -c etc/alembic.ini -x ini=etc/development.ini downgrade -1
```

## Can I use my models in my migration scripts?

Sadly, no. You need to use the [Expression API](https://docs.sqlalchemy.org/en/13/core/expression_api.html) or raw SQL. The former is preferable.

Here is the reason why:

1. You add an `email` column to `User` model.
2. Users enter lower case, upper case emails, something in between.
3. You use ORM and alembic to lower all strings. When you use ORM current model is used to create PYObjects.
4. Months later, you add another column "is_admin".
5. Migration you created in step 3. uses `SELECT` to fetch all values and expects `is_admin` to be present in db with current model, not historic one. In a sense your migration traveled into future, which is sadly not possible.
6. BOOM, now your old migration is using a model which is not the same as it was at the time of the creation of model.
7. You need to rewrite all migrations ... ::sad_face::

## Further reading

- [Manipulating JSOB](https://haselt.com/working-with-postgresql-jsonb/)
