"""Tests for the Article model."""

from conduit.article.models import Article
from conduit.auth.models import User
from conduit.openapi import json_renderer
from conduit.scripts.populate import ARTICLE_FOO_ID
from pyramid.testing import DummyRequest
from sqlalchemy.orm.session import Session

import json


def test_by_shortcuts(db: Session, democontent: None) -> None:
    """Test that by_* shortcuts work."""
    assert Article.by_slug("foo", db) == Article.by_id(ARTICLE_FOO_ID, db)


def test_json_renderer(db: Session, democontent: None) -> None:
    """Test that Article is correctly rendered for an OpenAPI JSON response."""
    user = User.by_username("two", db=db)
    article = Article.by_slug("foo", db=db)

    request = DummyRequest()
    request.user = user

    renderer = json_renderer()
    output = renderer(None)(article, {"request": request})

    assert json.loads(output) == {
        "author": {"bio": "", "following": True, "image": "", "username": "one"},
        "body": "Foö body",
        "createdAt": "2019-01-01T01:01:01.000001Z",
        "description": "Foö desc",
        "favorited": False,
        "favoritesCount": 0,
        "slug": "foo",
        "tagList": ["dogs", "cats"],
        "title": "Foö",
        "updatedAt": "2019-02-02T02:02:02.000002Z",
    }
