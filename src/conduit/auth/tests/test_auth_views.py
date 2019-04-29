"""Tests for auth views."""

from conduit.auth.models import User
from conduit.scripts.populate import USER_ONE_ID
from freezegun import freeze_time
from sqlalchemy.orm.session import Session
from webtest import TestApp

import copy
import jwt


@freeze_time("2019-01-01")
def test_register(testapp: TestApp, db: Session) -> None:
    """Test POST /api/users."""
    res = testapp.post_json(
        "/api/users",
        {"user": {"email": "foo@bar.com", "password": "secret", "username": "foo"}},
        status=201,
    )

    response = copy.deepcopy(res.json)
    response["user"]["token"] = jwt.decode(
        res.json["user"]["token"], "secret", algorithms=["HS512"]
    )
    user = User.by_username("foo", db=db)
    assert response == {
        "user": {
            "email": "foo@bar.com",
            "token": {"sub": str(user.id), "iat": 1546300800},  # type: ignore
            "username": "foo",
            "bio": "",
            "image": "",
        }
    }


@freeze_time("2019-01-01")
def test_login(testapp: TestApp, democontent: None) -> None:
    """Test POST /api/users."""
    res = testapp.post_json(
        "/api/users/login",
        {"user": {"email": "one@bar.com", "password": "secret"}},
        status=200,
    )

    response = copy.deepcopy(res.json)
    response["user"]["token"] = jwt.decode(
        res.json["user"]["token"], "secret", algorithms=["HS512"]
    )
    assert response == {
        "user": {
            "email": "one@bar.com",
            "token": {"sub": USER_ONE_ID, "iat": 1546300800},
            "username": "one",
            "bio": "",
            "image": "",
        }
    }


def test_login_failed(testapp: TestApp, democontent: None) -> None:
    """Test POST /api/users with bad credentials."""
    res = testapp.post_json(
        "/api/users/login",
        {"user": {"email": "one@bar.com", "password": "noidea"}},
        status=401,
    )
    assert res.json == {}
