"""Integration with pyramid_openapi3."""

from pyramid.config import Configurator

import os


def includeme(config: Configurator) -> None:
    """Configure support for serving and handling OpenAPI requests."""

    config.include("pyramid_openapi3")
    config.pyramid_openapi3_spec(
        os.path.join(os.path.dirname(__file__), "openapi.yaml"), route="/openapi.yaml"
    )
    config.pyramid_openapi3_add_explorer(route="/api")
