"""Tests for the pyramid_openapi3 integration."""

from sqlalchemy.orm.session import Session
from webtest import TestApp


def test_api_docs_served(testapp: TestApp) -> None:
    """Swagger's API Explorer should be served on /docs/."""
    res = testapp.get("/api", status=200)
    assert "<title>Swagger UI</title>" in res.text


def test_unexpected_errors_are_handled(testapp: TestApp, db: Session) -> None:
    """Test that a sane response is returned for unexpected errors."""
    original_root_factory = testapp.app.root_factory

    class BrokenRoot:
        """Raise an unexpected error when called."""

        def __init__(self, request):
            raise Exception("foo")

    testapp.app.root_factory = BrokenRoot

    res = testapp.get("/api/tags", status=422)
    assert res.json == {"errors": {"body": ["Internal Server Error"]}}

    # revert changes to app
    testapp.app.root_factory = original_root_factory
