"""Tests for Comment related views."""

from conduit.auth.tests.test_auth_views import USER_ONE_JWT
from webtest import TestApp


def test_GET_comments(testapp: TestApp, democontent: None) -> None:
    """Test GET /api/articles/{slug}/comments."""
    res = testapp.get("/api/articles/foo/comments", status=200)

    assert res.json == {
        "comments": [
            {
                "id": 99,
                "body": "I like this!",
                "createdAt": "2019-07-07T07:07:07.000007Z",
                "updatedAt": "2019-08-08T08:08:08.000008Z",
                "author": {
                    "username": "two",
                    "bio": "",
                    "image": "",
                    "following": False,
                },
            }
        ]
    }


def test_POST_comment(testapp: TestApp, democontent: None) -> None:
    """Test POST /api/articles/{slug}/comments."""
    res = testapp.post_json(
        "/api/articles/foo/comments",
        {"comment": {"body": "foo comment"}},
        headers={"Authorization": f"Token {USER_ONE_JWT}"},
        status=200,
    )

    assert res.json["comment"]["body"] == "foo comment"
    assert res.json["comment"]["author"]["username"] == "one"

    # TODO: can we mock createdAt and updatedAt and assert entire JSON output?
