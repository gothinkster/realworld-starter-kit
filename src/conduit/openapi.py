"""Integration with pyramid_openapi3."""

from pyramid.config import Configurator
from pyramid.httpexceptions import exception_response
from pyramid.httpexceptions import HTTPNotFound
from pyramid.httpexceptions import HTTPUnauthorized
from pyramid.httpexceptions import HTTPUnprocessableEntity
from pyramid.request import Request
from pyramid.view import exception_view_config
from pyramid.view import forbidden_view_config
from pyramid.view import notfound_view_config

import os
import structlog
import typing as t

logger = structlog.get_logger(__name__)


def includeme(config: Configurator) -> None:
    """Configure support for serving and handling OpenAPI requests."""

    config.include("pyramid_openapi3")
    config.pyramid_openapi3_spec(
        os.path.join(os.path.dirname(__file__), "openapi.yaml"), route="/openapi.yaml"
    )
    config.pyramid_openapi3_add_explorer(route="/api")


def object_or_404(obj: t.Any) -> t.Any:
    """Use this to stop view code execution if object is not found.

    If obj is None, return response with 404 status code.
    Otherwise, continue with view code.

    Example usage:

    user = object_or_404(User.by_username("foo", db=request.db))
    ... # code here knows that user exists and does not need to do any checks
    """
    if obj is None:
        raise HTTPNotFound
    else:
        return obj


@exception_view_config(Exception)
def unknown_error(exc: Exception, request: Request) -> HTTPUnprocessableEntity:
    """Catch any uncaught errors and respond with a nice JSON error.

    Without this, Exceptions that get to WSGI level return HTML that says
    Internal Server Error.

    Note that, in an ideal world, this view would return 500 instead of 422,
    as an unexpected error means something is wrong with the server, hence
    500 Internal Server Error makes more sense. Alas, this is a RealWorld.io
    example implementation, and the specs say it should be 422:
    https://github.com/gothinkster/realworld/blob/master/api/swagger.json
    """
    logger.exception("Uncaught error", exc_info=exc)
    return exception_response(
        422, json_body={"errors": {"body": ["Internal Server Error"]}}
    )


@forbidden_view_config()
def unauthorized(request: Request) -> HTTPUnauthorized:
    """Catch permission errors and respond with a nice JSON error.

    Without this, permission errors that get to WSGI level return HTML that says
    403 Forbidden.
    """
    return exception_response(401, json_body={"errors": {"body": ["Unauthorized"]}})


@notfound_view_config()
def notfound(request: Request) -> HTTPNotFound:
    """Catch url traversal and db lookup errors and respond with a nice JSON error.

    Without this, not-found errors that get to WSGI level return HTML that says
    404 Not Found.
    """
    return exception_response(404, json_body={"errors": {"body": ["Not Found"]}})
