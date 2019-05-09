"""Tests for Tag related views."""

from webtest import TestApp


def test_GET_tags(testapp: TestApp, democontent: None) -> None:
    """Test GET /api/tags."""
    res = testapp.get("/api/tags", status=200)
    assert res.json == {"tags": ["dogs", "cats"]}
