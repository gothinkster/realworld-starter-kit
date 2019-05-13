"""Tests for the Comment model."""

from conduit.article.models import Article
from conduit.auth.models import User
from conduit.openapi import json_renderer
from pyramid.testing import DummyRequest
from sqlalchemy.orm.session import Session

import json


def test_json_renderer(db: Session, democontent: None) -> None:
    """Test that Comment is correctly rendered for an OpenAPI JSON response."""
    user = User.by_username("two", db=db)
    article = Article.by_slug("foo", db=db)
    comment = article.comments[0]  # type: ignore

    request = DummyRequest()
    request.user = user

    renderer = json_renderer()
    output = renderer(None)(comment, {"request": request})

    assert json.loads(output) == {
        "id": 99,
        "body": "I like this!",
        "createdAt": "2019-07-07T07:07:07.000007Z",
        "updatedAt": "2019-08-08T08:08:08.000008Z",
        "author": {"username": "two", "bio": "", "image": "", "following": False},
    }
