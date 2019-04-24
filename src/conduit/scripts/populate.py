"""Populate db with demo content."""

from conduit.tag.models import Tag
from pyramid.paster import bootstrap
from pyramid.paster import setup_logging
from sqlalchemy.orm.session import Session

import argparse
import structlog
import sys
import transaction
import typing as t

logger = structlog.getLogger("populate")

TAG_FOO_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee0"
TAG_BAR_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee1"


def add_tags(db: Session) -> None:
    """Add demo tags to db.

    It's good to use strange characters in demo/test content to test
    support for non-ascii inputs.
    """

    foo = Tag(id=TAG_FOO_ID, name="Foö")
    db.add(foo)
    logger.info("Tag added", name=foo.name)

    bar = Tag(id=TAG_BAR_ID, name="Bär")
    db.add(bar)
    logger.info("Tag added", name=bar.name)

    db.flush()


def main(argv: t.List[str] = sys.argv) -> None:
    """Run the script."""

    parser = argparse.ArgumentParser(
        usage="pipenv run python -m conduit.scripts.populate"
    )
    parser.add_argument(
        "-c",
        "--config",
        type=str,
        default="etc/development.ini",
        metavar="<config>",
        help="Pyramid application configuration file.",
    )

    env = bootstrap(parser.parse_args().config)
    setup_logging(parser.parse_args().config)

    with transaction.manager:
        add_tags(env["request"].db)

    logger.info("populate script finished")
    env["closer"]()


if __name__ == "__main__":
    main()
