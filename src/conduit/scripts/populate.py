"""Populate db with demo content.

It's good practice to use strange characters in demo/test content to
verify support for non-ascii inputs.
"""

from conduit.article.models import Article
from conduit.auth.models import User
from conduit.comment.models import Comment
from conduit.tag.models import Tag
from datetime import datetime
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
USER_ONE_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee1"
USER_TWO_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee2"
USER_JOHNJACOB_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee3"
ARTICLE_FOO_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee1"
ARTICLE_BAR_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee2"
ARTICLE_JOHNJACOB_ID = "aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee3"

# "secret", hashed
SECRET = "$argon2i$v=19$m=512,t=2,p=2$mRMCwLg3Rgih1JqTUooxxg$/bBw6iXly9rfryTkaoPX/Q"


def add_users(db: Session) -> None:
    """Add demo users to db."""

    one = User(
        id=USER_ONE_ID, email="one@bar.com", username="one", password_hash=SECRET
    )
    db.add(one)
    logger.info("User added", username=one.username)

    two = User(
        id=USER_TWO_ID, email="two@bar.com", username="two", password_hash=SECRET
    )
    db.add(two)
    two.follows.append(one)
    logger.info("User added", username=two.username)

    # Postman tests expect this user to be present
    johnjacob = User(
        id=USER_JOHNJACOB_ID,
        email="johnjacob@bar.com",
        username="johnjacob",
        password_hash=SECRET,
    )
    db.add(johnjacob)
    johnjacob.follows.append(one)
    logger.info("User added", username=johnjacob.username)

    db.flush()


def add_articles(db: Session) -> None:
    """Add demo articles to db."""

    foo = Article(
        id=ARTICLE_FOO_ID,
        slug="foo",
        title="Foö",
        description="Foö desc",
        body="Foö body",
        author=User.by_username("one", db=db),
        created=datetime(2019, 1, 1, 1, 1, 1, 1),
        updated=datetime(2019, 2, 2, 2, 2, 2, 2),
        tags=[Tag(name="dogs"), Tag(name="cats")],
        comments=[
            Comment(
                id=99,
                body="I like this!",
                author=User.by_username("two", db=db),
                created=datetime(2019, 7, 7, 7, 7, 7, 7),
                updated=datetime(2019, 8, 8, 8, 8, 8, 8),
            )
        ],
    )

    db.add(foo)
    logger.info("Article added", slug=foo.slug)

    bar = Article(
        id=ARTICLE_BAR_ID,
        slug="bar",
        title="Bär",
        description="Bär desc",
        body="Bär body",
        author=User.by_username("one", db=db),
        created=datetime(2019, 3, 3, 3, 3, 3, 3),
        updated=datetime(2019, 4, 4, 4, 4, 4, 4),
    )
    db.add(bar)
    logger.info("Article added", slug=bar.slug)

    # Postman tests require this user to have at least one article
    johnjacob = Article(
        id=ARTICLE_JOHNJACOB_ID,
        slug="i-am-johnjacob",
        title="I am John Jacob",
        description="johnjacob desc",
        body="johnjacob body",
        author=User.by_username("johnjacob", db=db),
        created=datetime(2019, 5, 5, 5, 5, 5, 5),
        updated=datetime(2019, 6, 6, 6, 6, 6, 6),
    )
    db.add(johnjacob)
    logger.info("Article added", slug=johnjacob.slug)

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
        add_users(env["request"].db)
        add_articles(env["request"].db)

    logger.info("populate script finished")
    env["closer"]()


if __name__ == "__main__":
    main()
