"""Test def check_db_migrated function."""

from alembic import command
from alembic.config import Config
from pyramid.paster import bootstrap
from pyramid_deferred_sqla import check_db_migrated
from sqlalchemy.orm.session import Session
from unittest import mock

import pytest
import typing as t


@pytest.fixture(scope="function")
def old_db(db: Session, ini_path: str) -> t.Generator:
    """Render an old version of the database structure.

    This fixture is used in functional tests that operate on the function to
    check the database is migrated up to date.
    """
    alembic_cfg = Config("etc/alembic.ini")
    try:
        command.downgrade(alembic_cfg, "-1")
        yield db
    finally:
        command.upgrade(alembic_cfg, "head")


@mock.patch("pyramid_deferred_sqla.sys")
def test_database_outdated(sys: mock.MagicMock, ini_path: str, old_db: Session) -> None:
    """Database is outdated when head version doesn't match current version.

    This attempts to bootstrap the environment without skipping the version check, but
    the `old_db` fixture ensures that the current working environment has been downgraded
    by one version, so the check should fail and call sys.exit
    """
    with mock.patch("pyramid_deferred_sqla.check_db_migrated") as method_under_test:
        method_under_test.side_effect = check_db_migrated
        assert sys.exit.call_count == 0
        bootstrap(ini_path)
        assert method_under_test.call_count == 1
        assert sys.exit.call_count == 1
        assert "I found a more recent migration" in sys.exit.call_args[0][0]


@mock.patch("pyramid_deferred_sqla.sys")
def test_database_up_to_date(sys: mock.MagicMock, ini_path: str, db: Session) -> None:
    """Database has been fully migrated, so bootstrap should work.

    This is tested by invoking bootstrap, which calls check_db_migrated
    """
    with mock.patch("pyramid_deferred_sqla.check_db_migrated") as method_under_test:
        method_under_test.side_effect = check_db_migrated
        bootstrap(ini_path)
        assert method_under_test.call_count == 1
        assert sys.exit.call_count == 0
