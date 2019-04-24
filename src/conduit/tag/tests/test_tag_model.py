"""Tests for the Tag model."""

from conduit.tag.models import Tag
from pyramid.testing import DummyRequest


def test_json_renderer(dummy_request: DummyRequest) -> None:
    """Test that Tag is correctly rendered for an OpenAPI JSON response."""
    tag = Tag(name="foö")
    assert tag.__json__(dummy_request) == "foö"
