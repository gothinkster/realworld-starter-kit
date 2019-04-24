"""Tests for the pyramid_openapi3 integration."""

from webtest import TestApp


def test_api_docs_served(testapp: TestApp, democontent: None) -> None:
    """Swagger's API Explorer should be served on /docs/."""
    res = testapp.get("/api", status=200)
    assert "<title>Swagger UI</title>" in res.text
