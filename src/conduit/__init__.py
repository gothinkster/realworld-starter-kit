"""Package initializer."""

from alembic.command import EnvironmentContext
from alembic.config import Config
from alembic.migration import MigrationContext
from alembic.script import ScriptDirectory
from pyramid.config import Configurator
from pyramid.router import Router
from pyramid_heroku import expandvars_dict

import alembic
import structlog
import sys
import typing as t

logger = structlog.getLogger("init")


def configure_logging() -> None:
    """Configure structlog logging.

    Whenever structlog is imported it only creates a proxy. Calling this
    method turns the proxy into an actual logger.
    """
    structlog.configure(
        processors=[
            structlog.stdlib.filter_by_level,
            structlog.stdlib.add_log_level,
            structlog.stdlib.add_logger_name,
            structlog.processors.format_exc_info,
            structlog.processors.KeyValueRenderer(
                key_order=("level", "logger", "event"), sort_keys=True
            ),
        ],
        logger_factory=structlog.stdlib.LoggerFactory(),
        cache_logger_on_first_use=True,
    )


def check_db_migrated(config: Configurator, global_config: t.Dict[str, str]) -> None:
    """Check if db is migrated to the latest alembic step.

    Do it by comparing the alembic revision in db to the alembic revision on
    the filesystem.
    """

    # skip if we are bootstrapping from alembic env, meaning when running
    # an alembic command in the terminal
    if getattr(alembic.context, "config", None):
        return

    # get latest migration file
    alembic_config = Config(global_config["__file__"], "app:conduit")
    script = ScriptDirectory.from_config(alembic_config)
    head = EnvironmentContext(alembic_config, script).get_head_revision()

    # get latest version from db
    with config.registry.settings["sqlalchemy.engine"].connect() as conn:
        curr = MigrationContext.configure(conn).get_current_revision()

    if curr != head:
        sys.exit(f"ERROR: DB ({curr}) is not migrated to head ({head}). Shutting down.")


def configure(config: Configurator) -> None:
    """Configure Pyramid to serve the Conduit API."""

    # Configure DB
    config.include("pyramid_deferred_sqla")
    config.sqlalchemy_engine(pool_size=5, max_overflow=1, pool_timeout=5)

    # TODO: pyramid_deferred_sqla docs say this is needed, but apparently it
    # is not?
    # config.alembic_config("conduit:migrations")

    # Configure pyramid_openapi3 integration
    config.include(".openapi")

    # Configure authentication & authorization
    config.include(".auth")

    # Configure tags
    config.include(".tag")

    # Configure profiles
    config.include(".profile")

    # Find and configure all decorated objects
    config.scan(
        ignore=[
            "conduit.conftest",
            "conduit.auth.tests",
            "conduit.profile.tests",
            "conduit.scripts.tests",
            "conduit.tag.tests",
            "conduit.tests",
        ]
    )


def main(global_config: t.Dict[str, str], **settings: t.Dict[str, str]) -> Router:
    """Return a Pyramid WSGI application."""
    # Expand environment variables in .ini files
    settings = expandvars_dict(settings)

    # Configure Pyramid
    # TODO: can we configure root_factory in auth.py?
    # config.set_root_factory(root_factory) maybe?
    config = Configurator(settings=settings, root_factory="conduit.auth.RootFactory")
    configure(config)

    # Verify that DB schema is migrated to latest version
    # TODO: If this check is removed, the app breaks. The culprit is somewhere
    # in pyramid_deferred_sql: the request wrapper that sets the `read_only`
    # request property gets correctly called and then when the connections is
    # set to be marked as read_only, sqla fails with
    # `set_session cannot be used inside a transaction`
    # Using check_db_migrated, database transaction is already started, and
    # setting the session to read_only is skipped, which masks the bug
    if not global_config.get("SKIP_CHECK_DB_MIGRATED"):
        check_db_migrated(config, global_config)

    # Up, Up and Away!
    return config.make_wsgi_app()
