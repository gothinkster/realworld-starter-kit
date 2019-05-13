"""HTTP operations on Comment resource."""

from conduit.article.models import Article
from conduit.comment.models import Comment
from conduit.openapi import object_or_404
from mypy_extensions import TypedDict
from pyramid.request import Request
from pyramid.view import view_config

import typing as t

# Python implementation of openapi.yaml's MultipleCommentsResponse schema
MultipleCommentsResponse = TypedDict(
    "MultipleCommentsResponse", {"comments": t.List[Comment]}
)

# Python implementation of openapi.yaml's SingleCommentResponse schema
SingleCommentResponse = TypedDict("SingleCommentResponse", {"comment": Comment})


@view_config(route_name="comments", renderer="json", request_method="GET", openapi=True)
def comments(request: Request) -> MultipleCommentsResponse:
    """Get recent comments on the given article."""
    article = object_or_404(
        Article.by_slug(
            request.openapi_validated.parameters["path"]["slug"], db=request.db
        )
    )
    return {"comments": article.comments}


@view_config(
    route_name="comments", renderer="json", request_method="POST", openapi=True
)
def create(request: Request) -> SingleCommentResponse:
    """Get an article."""
    article = object_or_404(
        Article.by_slug(
            request.openapi_validated.parameters["path"]["slug"], db=request.db
        )
    )

    body = request.openapi_validated.body
    comment = Comment(body=body.comment.body, article=article, author=request.user)
    article.comments.append(comment)
    return {"comment": comment}
