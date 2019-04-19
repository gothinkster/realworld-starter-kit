"""Drop database content."""

from pyramid.paster import bootstrap
from pyramid.paster import setup_logging

import argparse
import structlog
import sys
import typing as t

logger = structlog.getLogger("db")


def main(argv: t.List[str] = sys.argv) -> None:
    """Run the script."""

    parser = argparse.ArgumentParser(
        usage="pipenv run python -m conduit.scripts.drop_tables"
    )
    parser.add_argument(
        "-c",
        "--config",
        type=str,
        default="etc/development.ini",
        metavar="<config>",
        help="Pyramid application configuration file.",
    )
    env = bootstrap(
        parser.parse_args().config, options={"SKIP_CHECK_DB_MIGRATED": "true"}
    )
    setup_logging(parser.parse_args().config)

    engine = env["registry"].settings["sqlalchemy.engine"]
    engine.execute("DROP OWNED BY current_user")

    logger.warn("db reset done for", url=str(engine.url))
    env["closer"]()


if __name__ == "__main__":
    main()
