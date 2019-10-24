"""Various py.test fixtures.

* Reading development.ini settings
* Setting up and tearing down database
* Creating a WSGI application to test
* Spinning up a WSGI server for functional test run
"""

from alembic import command
from alembic.config import Config
from conduit.scripts.populate import add_articles
from conduit.scripts.populate import add_users
from pyramid.paster import bootstrap
from pyramid.request import Request
from pyramid.router import Router
from pyramid.testing import DummyRequest
from pyramid_deferred_sqla import Base
from sqlalchemy.orm.session import Session
from sqlalchemy.pool import NullPool
from webtest import TestApp

import _pytest
import logging
import os
import pytest
import transaction
import typing as t

logger = logging.getLogger(__name__)
AppEnvType = t.Dict["str", Request]

# Make sure TestApp doesn't get collected by pytest
TestApp.__test__ = False


@pytest.fixture(scope="session")
def ini_path(request: _pytest.fixtures.SubRequest) -> str:
    """Get test INI file path from py.test command line."""
    return os.path.abspath(request.config.option.ini or "etc/test.ini")


@pytest.fixture(scope="session")
def app_env(ini_path: str) -> AppEnvType:
    """Initialize WSGI application from INI file given on the command line."""
    env = bootstrap(ini_path, options={"SKIP_CHECK_DB_MIGRATED": "true"})

    alembic_cfg = Config("etc/alembic.ini")
    command.upgrade(alembic_cfg, "head")
    return env


@pytest.fixture(scope="session")
def app(app_env: AppEnvType) -> Router:
    """Get the WSGI app."""
    return app_env["app"]


@pytest.fixture(scope="function")
def db(app_env: AppEnvType) -> t.Iterator[Session]:
    """Initialize WSGI application from INI file given on the command line."""
    engine = app_env["registry"].settings["sqlalchemy.engine"]
    engine.update_execution_options(use_threadlocal=True, poolclass=NullPool)
    db = app_env["request"].db
    try:
        yield db
    finally:
        db.flush()
        db.rollback()
        db.close()


@pytest.fixture(scope="function")
def dummy_request() -> DummyRequest:
    """Get DummyRequest with empty registry.settings.

    Old registry.settings dict is saved and restored. Because of that test
    can change it without breaking other tests.
    """

    request = DummyRequest()
    settings = {**request.registry.settings} if request.registry.settings else {}
    request.registry.settings = {}
    yield request
    request.registry.settings = settings


@pytest.fixture(scope="session")
def testapp(app: Router) -> TestApp:
    """Provide a webtest app for functional testing."""
    return TestApp(app)


@pytest.fixture(scope="function")
def democontent(app_env: AppEnvType, db: Session) -> t.Generator:
    """Pre-fill the testing database with democontent.

    Use helper methods from populate.py.

    This fixture is being used in functional tests that run in a separate
    thread so we have to commit to DB for tests to see the changes. Meaning
    we then also have to do manual cleanup of the DB in teardown.
    """
    with transaction.manager:
        add_users(db)
        add_articles(db)

    try:
        yield db
    finally:
        with transaction.manager:
            engine = app_env["registry"].settings["sqlalchemy.engine"]
            tables = ", ".join(Base.metadata.tables.keys())
            engine.execute("TRUNCATE {} CASCADE".format(tables))


def pytest_addoption(parser: _pytest.config.argparsing.Parser) -> None:
    """Add pytest option."""
    parser.addoption(
        "--ini",
        action="store",
        metavar="INI_FILE",
        help="use INI_FILE to configure env.",
    )
