"""Tests for the pyramid_openapi3 integration."""

from conduit.openapi import object_or_404
from pyramid.exceptions import HTTPForbidden
from pyramid.exceptions import HTTPNotFound
from pyramid.request import Request
from sqlalchemy.orm.session import Session
from webtest import TestApp

import pytest


def test_api_docs_served(testapp: TestApp) -> None:
    """Swagger's API Explorer should be served on /api/."""
    res = testapp.get("/api", status=200)
    assert "<title>Swagger UI</title>" in res.text


def test_unexpected_errors_are_handled(testapp: TestApp, db: Session) -> None:
    """Test that a sane response is returned for unexpected errors."""
    original_root_factory = testapp.app.root_factory

    class BrokenRoot:
        """Raise an unexpected error when called."""

        def __init__(self, request: Request):
            raise Exception("foo")

    testapp.app.root_factory = BrokenRoot

    res = testapp.get("/api/tags", status=422)
    assert res.json == {"errors": {"body": ["Internal Server Error"]}}

    # revert changes to app
    testapp.app.root_factory = original_root_factory


def test_authorization_errors_are_handled(testapp: TestApp, db: Session) -> None:
    """Test that a sane response is returned for authorization errors."""
    original_root_factory = testapp.app.root_factory

    class BrokenRoot:
        """Raise an unexpected error when called."""

        def __init__(self, request: Request):
            raise HTTPForbidden("foo")

    testapp.app.root_factory = BrokenRoot

    res = testapp.get("/api/tags", status=401)
    assert res.json == {"errors": {"body": ["Unauthorized"]}}

    # revert changes to app
    testapp.app.root_factory = original_root_factory


def test_notfound_errors_are_handled(testapp: TestApp, db: Session) -> None:
    """Test that a sane response is returned for not-found errors."""
    original_root_factory = testapp.app.root_factory

    class BrokenRoot:
        """Raise an unexpected error when called."""

        def __init__(self, request: Request):
            raise HTTPNotFound("foo")

    testapp.app.root_factory = BrokenRoot

    res = testapp.get("/api/tags", status=404)
    assert res.json == {"errors": {"body": ["Not Found"]}}

    # revert changes to app
    testapp.app.root_factory = original_root_factory


def test_object_or_404() -> None:
    """Test the help guard that stops view code execution."""
    with pytest.raises(HTTPNotFound):
        object_or_404(None)

    assert object_or_404("foo") == "foo"
