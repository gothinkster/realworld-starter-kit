"""Tests for the Profile model."""

from conduit.auth.models import User
from conduit.openapi import json_renderer
from conduit.profile.models import Profile
from pyramid.testing import DummyRequest
from sqlalchemy.orm.session import Session

import json


def test_json_renderer(db: Session, democontent: None) -> None:
    """Test that Profile is correctly rendered for an OpenAPI JSON response."""
    user = User.by_username("one", db=db)
    request = DummyRequest()
    request.user = user

    profile = Profile(user=user)  # type: ignore

    renderer = json_renderer()
    output = renderer(None)(profile, {"request": request})

    assert json.loads(output) == {
        "username": "one",
        "following": False,
        "bio": None,
        "image": None,
    }


def test_by_shortcuts(db: Session, democontent: None) -> None:
    """Test that by_* shortcuts work."""
    assert Profile.by_username("one", db).user == User.by_username(  # type: ignore
        "one", db
    )
    assert Profile.by_username("foo", db) is None
