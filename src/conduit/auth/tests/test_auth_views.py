"""Tests for auth views."""

from conduit.auth.models import User
from conduit.scripts.populate import USER_ONE_ID
from freezegun import freeze_time
from sqlalchemy.orm.session import Session
from webtest import TestApp

import copy
import jwt

# JWT encoded:
# {'sub': 'aaaaaaaa-bbbb-4ccc-aaaa-eeeeeeeeeee1', 'iat': 1546300800}
USER_ONE_JWT = (
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJhYWFhYWFh"
    "YS1iYmJiLTRjY2MtYWFhYS1lZWVlZWVlZWVlZTEiLCJpYXQiOjE1NDYzM"
    "DA4MDB9.OygJRuk6rNakGz3VUr6aul5Lq-2lB5IP7BTWY1RLDV6d3CEeJ"
    "zKQFGZVGp-J-3oFpChArB6JB-McYR9lMtQ4PA"
)


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
    testapp.post_json(
        "/api/users/login",
        {"user": {"email": "one@bar.com", "password": "noidea"}},
        status=401,
    )


@freeze_time("2019-01-01")
def test_get_current_user(testapp: TestApp, democontent: None) -> None:
    """Test POST /api/user."""
    res = testapp.get(
        "/api/user", headers={"Authorization": f"Token {USER_ONE_JWT}"}, status=200
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


@freeze_time("2019-01-01")
def test_update_current_user(testapp: TestApp, democontent: None) -> None:
    """Test PUT /api/user."""
    res = testapp.put_json(
        "/api/user",
        {
            "user": {
                "email": "bar@bar.com",
                "username": "bar",
                "bio": "bio",
                "image": "image",
            }
        },
        headers={"Authorization": f"Token {USER_ONE_JWT}"},
        status=200,
    )

    response = copy.deepcopy(res.json)
    response["user"]["token"] = jwt.decode(
        res.json["user"]["token"], "secret", algorithms=["HS512"]
    )
    assert response == {
        "user": {
            "email": "bar@bar.com",
            "token": {"sub": USER_ONE_ID, "iat": 1546300800},
            "username": "bar",
            "bio": "bio",
            "image": "image",
        }
    }


@freeze_time("2019-01-01")
def test_invalid_token(testapp: TestApp) -> None:
    """Test GET /api/user with invalid token, because user one is not in db."""
    testapp.get(
        "/api/user", headers={"Authorization": f"Token {USER_ONE_JWT}"}, status=401
    )
