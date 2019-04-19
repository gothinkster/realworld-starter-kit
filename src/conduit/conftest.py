"""Various py.test fixtures.

* Reading development.ini settings
* Setting up and tearing down database
* Creating a WSGI application to test
* Spinning up a WSGI server for functional test run
"""

from _pytest.fixtures import SubRequest
from alembic import command
from alembic.config import Config
from pyramid.paster import bootstrap
from pyramid.request import Request
from pyramid.router import Router
from pyramid.testing import DummyRequest
from sqlalchemy.orm.session import Session
from sqlalchemy.pool import NullPool
from webtest import TestApp

import logging
import os
import pytest
import transaction
import typing as t

logger = logging.getLogger(__name__)


@pytest.fixture(scope="session")
def ini_path(request: SubRequest) -> str:
    """Get test INI file path from py.test command line."""
    return os.path.abspath(request.config.option.ini or "etc/test.ini")


@pytest.fixture(scope="session")
def app_env(ini_path: str) -> t.Dict["str", object]:
    """Initialize WSGI application from INI file given on the command line."""

    env = bootstrap(ini_path, options={"SKIP_CHECK_DB_MIGRATED": "true"})

    # build schema
    alembic_cfg = Config("etc/test.ini", "app:conduit")
    command.upgrade(alembic_cfg, "head")
    return env


@pytest.fixture(scope="session")
def app(app_env: t.Dict["str", object]) -> Router:
    """Get the WSGI app."""
    return app_env["app"]


@pytest.fixture(scope="function")
def db(app_env: t.Dict["str", Request]) -> Session:
    """Initialize WSGI application from INI file given on the command line."""
    engine = app_env["registry"].settings["sqlalchemy.engine"]
    engine.update_execution_options(use_threadlocal=True, poolclass=NullPool)
    db = app_env["request"].db
    yield db
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
def democontent(db):
    """Pre-fill the testing database with democontent.

    Use helper methods from populate.py.

    This fixture is being used in functional tests that run in a separate
    thread so we have to commit to DB for tests to see the changes. Meaning
    we then also have to do manual cleanup of the DB in teardown.
    """
    with transaction.manager:
        # add_users(db)
        pass

    yield

    with transaction.manager:
        # db.query(User).delete()
        pass


@pytest.fixture(scope="function")
def users(db):
    """Populate testing db with demo users."""
    # add_users(db)
    pass


def pytest_addoption(parser):
    """Add pytest option."""
    parser.addoption(
        "--ini",
        action="store",
        metavar="INI_FILE",
        help="use INI_FILE to configure env.",
    )
