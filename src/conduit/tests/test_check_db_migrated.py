"""Test def check_db_migrated function."""

from conduit import check_db_migrated
from conduit import main
from pyramid.config import Configurator
from unittest import mock

import typing as t


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


@mock.patch("conduit.alembic")
@mock.patch("conduit.EnvironmentContext")
@mock.patch("conduit.ScriptDirectory")
@mock.patch("conduit.MigrationContext")
@mock.patch("conduit.sys")
def test_database_outdated(
    sys: mock.MagicMock,
    MigrationContext: mock.MagicMock,
    ScriptDirectory: mock.MagicMock,
    EnvironmentContext: mock.MagicMock,
    alembic: mock.MagicMock,
) -> None:
    """Database is outdated when head version doesn't match current version.

    TODO: I don't like how many mocks are needed to test this. Might make more
    sense to do an integration test against a real database connection.
    """

    alembic.context = None
    config = mock.Mock(spec="registry".split())
    config.registry.settings = {"sqlalchemy.engine": mock.Mock(spec="connect".split())}
    config.registry.settings[
        "sqlalchemy.engine"
    ].connect.return_value.__enter__ = mock.Mock(return_value=(mock.Mock(), None))
    config.registry.settings[
        "sqlalchemy.engine"
    ].connect.return_value.__exit__ = mock.Mock(return_value=None)
    global_config = {"__file__": "foofile"}

    EnvironmentContext.return_value.get_head_revision.return_value = "foo"
    MigrationContext.configure.return_value.get_current_revision.return_value = "bar"

    check_db_migrated(config, global_config)
    sys.exit.assert_called_with(
        "ERROR: DB (bar) is not migrated to head (foo). Shutting down."
    )


@mock.patch("conduit.alembic")
@mock.patch("conduit.EnvironmentContext")
@mock.patch("conduit.ScriptDirectory")
@mock.patch("conduit.MigrationContext")
@mock.patch("conduit.sys")
def test_database_up_to_date(
    sys: mock.MagicMock,
    MigrationContext: mock.MagicMock,
    ScriptDirectory: mock.MagicMock,
    EnvironmentContext: mock.MagicMock,
    alembic: mock.MagicMock,
) -> None:
    """Database is up-to-date when head version matches current version."""

    alembic.context = None
    config = mock.Mock(spec="registry".split())
    config.registry.settings = {"sqlalchemy.engine": mock.Mock(spec="connect".split())}
    config.registry.settings[
        "sqlalchemy.engine"
    ].connect.return_value.__enter__ = mock.Mock(return_value=(mock.Mock(), None))
    config.registry.settings[
        "sqlalchemy.engine"
    ].connect.return_value.__exit__ = mock.Mock(return_value=None)
    global_config = {"__file__": "foofile"}

    EnvironmentContext.return_value.get_head_revision.return_value = "foo"
    MigrationContext.configure.return_value.get_current_revision.return_value = "foo"

    assert check_db_migrated(config, global_config) is None  # type: ignore


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
