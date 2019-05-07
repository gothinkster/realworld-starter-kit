"""Content tagging."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.add_route("article", "/api/articles/{slug}")
    config.add_route("articles", "/api/articles")
