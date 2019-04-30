"""HTTP operations on Tag resource."""

from conduit.tag.models import Tag
from mypy_extensions import TypedDict
from pyramid.request import Request
from pyramid.view import view_config

import typing as t

# Python representation of openapi.yaml's TagsResponse schema
TagsResponse = TypedDict("TagsResponse", {"tags": t.List[str]})


@view_config(route_name="tags", renderer="json", request_method="GET", openapi=True)
def tags(request: Request) -> TagsResponse:
    """List all tags."""
    return {"tags": request.db.query(Tag).all()}
