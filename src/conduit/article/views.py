"""HTTP operations on Article resource."""

from conduit.article.models import Article
from conduit.auth.models import User
from conduit.openapi import object_or_404
from conduit.tag.models import Tag
from mypy_extensions import TypedDict
from pyramid.request import Request
from pyramid.view import view_config
from slugify import slugify
from sqlalchemy import desc
from sqlalchemy.orm.query import Query

import typing as t

# Python implementation of openapi.yaml's MultipleArticlesResponse schema
MultipleArticlesResponse = TypedDict(
    "MultipleArticlesResponse", {"articles": t.List[Article], "articlesCount": int}
)

# Python implementation of openapi.yaml's SingleArticleResponse schema
SingleArticleResponse = TypedDict("SingleArticleResponse", {"article": Article})


def paginate(query: Query, request: Request) -> Query:
    """Paginate query results."""
    q = query
    q = q.limit(request.openapi_validated.parameters["query"].get("limit", 20))
    q = q.offset(request.openapi_validated.parameters["query"].get("offset", 0))
    return q


@view_config(route_name="feed", renderer="json", request_method="GET", openapi=True)
def feed(request: Request) -> MultipleArticlesResponse:
    """Get your article feed."""
    q = request.db.query(Article)
    q = q.filter(Article.author_id.in_([user.id for user in request.user.follows]))

    q = q.order_by(desc("created"))
    q = paginate(q, request)

    articles = q.all()
    count = q.count()
    return {"articles": articles, "articlesCount": count}


@view_config(route_name="articles", renderer="json", request_method="GET", openapi=True)
def articles(request: Request) -> MultipleArticlesResponse:
    """Get recent articles globally."""

    q = request.db.query(Article)

    if request.openapi_validated.parameters["query"].get("author"):
        author = User.by_username(
            request.openapi_validated.parameters["query"]["author"], db=request.db
        )
        q = q.filter(Article.author == author)

    if request.openapi_validated.parameters["query"].get("tag"):
        q = q.filter(
            Article.tags.any(
                Tag.name == request.openapi_validated.parameters["query"]["tag"]
            )
        )

    q = q.order_by(desc("created"))
    q = paginate(q, request)

    articles = q.all()
    count = q.count()
    return {"articles": articles, "articlesCount": count}


@view_config(route_name="article", renderer="json", request_method="GET", openapi=True)
def article(request: Request) -> SingleArticleResponse:
    """Get an article."""
    article = object_or_404(
        Article.by_slug(
            request.openapi_validated.parameters["path"]["slug"], db=request.db
        )
    )
    return {"article": article}


@view_config(
    route_name="articles", renderer="json", request_method="POST", openapi=True
)
def create(request: Request) -> SingleArticleResponse:
    """Get an article."""
    body = request.openapi_validated.body
    article = Article(
        slug=slugify(body.article.title),
        title=body.article.title,
        description=body.article.description,
        body=body.article.body,
        author=request.user,
        tags=[Tag(name=t) for t in getattr(body.article, "tagList", [])],
    )
    request.db.add(article)
    request.db.flush()
    request.response.status_code = 201
    return {"article": article}


@view_config(route_name="article", renderer="json", request_method="PUT", openapi=True)
def update(request: Request) -> SingleArticleResponse:
    """Update an article."""
    body = request.openapi_validated.body
    article = object_or_404(
        Article.by_slug(
            request.openapi_validated.parameters["path"]["slug"], db=request.db
        )
    )

    if getattr(body.article, "title", None):
        article.title = body.article.title
    if getattr(body.article, "description", None):
        article.description = body.article.description
    if getattr(body.article, "body", None):
        article.body = body.article.body

    return {"article": article}


@view_config(
    route_name="article", renderer="json", request_method="DELETE", openapi=True
)
def delete(request: Request) -> None:
    """Delete an article."""
    article = object_or_404(
        Article.by_slug(
            request.openapi_validated.parameters["path"]["slug"], db=request.db
        )
    )
    request.db.delete(article)
    return None
