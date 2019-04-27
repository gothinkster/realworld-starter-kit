"""Integration with pyramid_openapi3."""

from pyramid.config import Configurator
from pyramid.httpexceptions import exception_response
from pyramid.request import Request
from pyramid.view import exception_view_config

import os
import structlog

logger = structlog.get_logger(__name__)


def includeme(config: Configurator) -> None:
    """Configure support for serving and handling OpenAPI requests."""

    config.include("pyramid_openapi3")
    config.pyramid_openapi3_spec(
        os.path.join(os.path.dirname(__file__), "openapi.yaml"), route="/openapi.yaml"
    )
    config.pyramid_openapi3_add_explorer(route="/api")


@exception_view_config(Exception)
def error_response(exc: Exception, request: Request):
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
    raise exception_response(
        422, json_body={"errors": {"body": ["Internal Server Error"]}}
    )
