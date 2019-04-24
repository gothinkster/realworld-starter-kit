"""HTTP operations on Tag resource."""

from conduit.tag.models import Tag
from pyramid.request import Request
from pyramid.view import view_config

import typing as t


@view_config(route_name="tags", renderer="json", request_method="GET", openapi=True)
def tags(request: Request) -> t.Dict[str, t.List[Tag]]:
    """List all tags."""
    return {"tags": request.db.query(Tag).all()}
