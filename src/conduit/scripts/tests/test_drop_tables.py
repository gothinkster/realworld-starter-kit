"""Test the drop_tables.py script.

Since this script is used a lot in other test suites, we only need very
simple testing here.
"""

from alembic import command
from alembic.config import Config
from conduit.conftest import AppEnvType
from conduit.scripts.drop_tables import main
from pyramid.registry import Registry
from unittest import mock


@mock.patch("conduit.scripts.drop_tables.argparse")
def test_drop_tables(argparse: mock.MagicMock, app_env: AppEnvType) -> None:
    """Test that db is populated with demo content."""
    registry: Registry = app_env["registry"]
    engine = registry.settings["sqlalchemy.engine"]

    tables = engine.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    )

    assert sorted(tables) == sorted([("alembic_version",), ("tags",), ("users",)])

    argparse.ArgumentParser.return_value.parse_args.return_value.config = "etc/test.ini"
    main()

    tables = engine.execute(
        "SELECT table_name FROM information_schema.tables WHERE table_schema='public'"
    )
    assert list(tables) == []

    # re-create the dropped tables so that other tests work
    alembic_cfg = Config("etc/test.ini", "app:conduit")
    command.upgrade(alembic_cfg, "head")
