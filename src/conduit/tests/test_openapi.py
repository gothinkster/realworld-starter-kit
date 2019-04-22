"""Tests for the pyramid_openapi3 integration."""


def test_api_docs_served(testapp, democontent):
    """Swagger's API Explorer should be served on /docs/."""
    res = testapp.get("/api/v1", status=200)
    assert "<title>Swagger UI</title>" in res.text
