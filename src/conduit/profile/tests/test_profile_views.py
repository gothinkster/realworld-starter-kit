"""Tests for profile views."""

from conduit.auth.models import User
from conduit.auth.tests.test_auth_views import USER_ONE_JWT
from sqlalchemy.orm.session import Session
from webtest import TestApp


def test_get_profile(testapp: TestApp, democontent: None) -> None:
    """Test POST /api/profiles/{username}."""
    res = testapp.get(
        "/api/profiles/two",
        headers={"Authorization": f"Token {USER_ONE_JWT}"},
        status=200,
    )

    assert res.json == {
        "profile": {"username": "two", "bio": "", "image": "", "following": False}
    }


def test_follow_unfollow_profile(
    testapp: TestApp, db: Session, democontent: None
) -> None:
    """Test POST /api/profiles/{username}/follow."""
    one = User.by_username("one", db=db)
    two = User.by_username("two", db=db)
    assert one.follows == []  # type: ignore

    res = testapp.post_json(
        "/api/profiles/two/follow",
        headers={"Authorization": f"Token {USER_ONE_JWT}"},
        status=200,
    )
    assert res.json == {
        "profile": {"username": "two", "bio": "", "image": "", "following": True}
    }
    one = User.by_username("one", db=db)  # refetch db values
    assert [u.username for u in one.follows] == [  # type: ignore  # pragma: no branch
        u.username for u in [two]  # type: ignore
    ]

    res = testapp.delete(
        "/api/profiles/two/follow",
        headers={"Authorization": f"Token {USER_ONE_JWT}"},
        status=200,
    )
    assert res.json == {
        "profile": {"username": "two", "bio": "", "image": "", "following": False}
    }
    one = User.by_username("one", db=db)  # refetch db values
    assert one.follows == []  # type: ignore
