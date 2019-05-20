"""Environment in which Alembic migrations run."""

from alembic import context
from pyramid.paster import bootstrap
from pyramid_deferred_sqla import Base
from sqlalchemy import engine_from_config
from sqlalchemy import pool

# this is the Alembic Config object, which provides
# access to the values within the .ini file in use.
config = context.config

# avoid running pyramid bootstrap twice
if len(Base.metadata.tables) == 0:
    # Call pyramid to collect all models
    arguments = context.get_x_argument(as_dictionary=True)
    ini = arguments.get("ini", config.config_file_name)
    bootstrap(ini)

target_metadata = Base.metadata


def run_migrations_offline():
    """Run migrations in 'offline' mode.

    This configures the context with just a URL
    and not an Engine, though an Engine is acceptable
    here as well.  By skipping the Engine creation
    we don't even need a DBAPI to be available.
    Calls to context.execute() here emit the given string to the
    script output.
    """
    url = config.get_main_option("sqlalchemy.url")
    context.configure(url=url, target_metadata=target_metadata, literal_binds=True)

    with context.begin_transaction():
        context.run_migrations()


def run_migrations_online():
    """Run migrations in 'online' mode.

    In this scenario we need to create an Engine
    and associate a connection with the context.
    """
    connectable = engine_from_config(
        {"sqlalchemy.url": Base.metadata.bind.url},
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    with connectable.connect() as connection:
        context.configure(connection=connection, target_metadata=target_metadata)

        with context.begin_transaction():
            context.run_migrations()


if context.is_offline_mode():
    run_migrations_offline()
else:
    run_migrations_online()
