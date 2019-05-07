"""Tests for the Tag model."""

from conduit.openapi import json_renderer
from conduit.tag.models import Tag
from pyramid.testing import DummyRequest

import json


def test_json_renderer(dummy_request: DummyRequest) -> None:
    """Test that Tag is correctly rendered for an OpenAPI JSON response."""
    tag = Tag(name="foö")

    renderer = json_renderer()
    output = renderer(None)(tag, {})

    assert json.loads(output) == "foö"
