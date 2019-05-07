"""Tests for the User model."""

from conduit.auth.models import User
from conduit.openapi import json_renderer
from conduit.scripts.populate import USER_ONE_ID
from pyramid.testing import DummyRequest
from sqlalchemy.orm.session import Session
from unittest import mock

import json


def test_json_renderer(dummy_request: DummyRequest) -> None:
    """Test that User is correctly rendered for an OpenAPI JSON response."""
    dummy_request.create_jwt_token = mock.Mock()
    dummy_request.create_jwt_token.return_value = "token"
    user = User(id=1, username="foö", email="foo@mail.com", bio="biö", image="imäge")

    renderer = json_renderer()
    output = renderer(None)(user, {"request": dummy_request})

    assert json.loads(output) == {
        "bio": "biö",
        "email": "foo@mail.com",
        "image": "imäge",
        "token": "token",
        "username": "foö",
    }


def test_by_shortcuts(db: Session, democontent: None) -> None:
    """Test that by_* shortcuts work."""
    assert User.by_username("one", db) == User.by_email("one@bar.com", db)
    assert User.by_username("one", db) == User.by_id(USER_ONE_ID, db)


def test_verify_password(db: Session, democontent: None) -> None:
    """Test verifying user's password."""
    user = User.by_username("one", db)
    assert user.verify_password("secret")  # type: ignore
    assert not user.verify_password("invalid")  # type: ignore


def test_follow(db: Session, democontent: None) -> None:
    """Test following a user."""
    one = User.by_username("one", db)
    two = User.by_username("two", db)

    assert two not in one.follows  # type: ignore

    one.follow(two)  # type: ignore
    assert two in one.follows  # type: ignore

    one.follow(two)  # type: ignore # again, to test idempotence
    assert two in one.follows  # type: ignore

    one.unfollow(two)  # type: ignore
    assert two not in one.follows  # type: ignore

    one.unfollow(two)  # type: ignore # again, to test idempotence
    assert two not in one.follows  # type: ignore
