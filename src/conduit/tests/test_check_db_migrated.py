"""Test def check_db_migrated function."""

from alembic import command
from alembic.config import Config
from conduit import check_db_migrated
from conduit import main
from pyramid.config import Configurator
from pyramid.paster import bootstrap
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
    alembic_cfg = Config("alembic.ini")
    try:
        command.downgrade(alembic_cfg, "-1")
        yield db
    finally:
        command.upgrade(alembic_cfg, "head")


@mock.patch("conduit.alembic")
def test_skip_when_running_an_alembic_command(alembic: mock.MagicMock) -> None:
    """Pyramid env is bootstrapped when running alembic commands.

    We need to skip checking when this is the case, because then you cannot
    ever migrate the database.
    """
    alembic.context = mock.Mock(spec="config".split())
    config = Configurator()
    global_config: t.Dict = {}

    assert check_db_migrated(config, global_config) is None  # type: ignore


@mock.patch("conduit.sys")
def test_database_outdated(sys: mock.MagicMock, ini_path: str, old_db: Session) -> None:
    """Database is outdated when head version doesn't match current version.

    This attempts to bootstrap the environment without skipping the version check, but
    the `old_db` fixture ensures that the current working environment has been downgraded
    by one version, so the check should fail and call sys.exit
    """
    with mock.patch("conduit.check_db_migrated") as method_under_test:
        method_under_test.side_effect = check_db_migrated
        assert sys.exit.call_count == 0
        bootstrap(ini_path)
        assert method_under_test.call_count == 1
        assert sys.exit.call_count == 1
        assert "is not migrated to head" in sys.exit.call_args[0][0]


@mock.patch("conduit.sys")
def test_database_up_to_date(sys: mock.MagicMock, ini_path: str, db: Session) -> None:
    """Database has been fully migrated, so bootstrap should work.

    This is tested by invoking bootstrap, which calls check_db_migrated
    """
    with mock.patch("conduit.check_db_migrated") as method_under_test:
        method_under_test.side_effect = check_db_migrated
        bootstrap(ini_path)
        assert method_under_test.call_count == 1
        assert sys.exit.call_count == 0


@mock.patch("conduit.check_db_migrated")
@mock.patch("conduit.configure_logging")
@mock.patch("conduit.Configurator")
def test_SKIP_CHECK_DB_MIGRATED(
    Configurator: mock.MagicMock,
    configure_logging: mock.MagicMock,
    check_db_migrated: mock.MagicMock,
) -> None:
    """Support skipping the check with a config flag."""
    main(  # type: ignore
        {"__file__": "foofile", "SKIP_CHECK_DB_MIGRATED": "true"}, **{}
    )
    check_db_migrated.assert_not_called()


@mock.patch("conduit.check_db_migrated")
@mock.patch("conduit.configure_logging")
@mock.patch("conduit.Configurator")
def test_not_SKIP_CHECK_DB_MIGRATED(
    Configurator: mock.MagicMock,
    configure_logging: mock.MagicMock,
    check_db_migrated: mock.MagicMock,
) -> None:
    """Support skipping the check with a config flag."""
    main({"__file__": "foofile"}, **{})  # type: ignore
    check_db_migrated.assert_called_with(Configurator(), {"__file__": "foofile"})
