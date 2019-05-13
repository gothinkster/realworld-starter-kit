"""Tests for serving frontend Elm app on root."""

from webtest import TestApp


def test_frontend_served(testapp: TestApp) -> None:
    """Frontend app should be served on /."""
    res = testapp.get("/", status=200)
    assert "<title>Conduit</title>" in res.text
