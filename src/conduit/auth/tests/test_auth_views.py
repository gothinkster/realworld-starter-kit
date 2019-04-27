"""Tests for auth views."""

from conduit.auth.models import User
from freezegun import freeze_time
from sqlalchemy.orm.session import Session
from webtest import TestApp

import copy
import jwt


@freeze_time("2019-01-01")
def test_register_user(testapp: TestApp, db: Session) -> None:
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
