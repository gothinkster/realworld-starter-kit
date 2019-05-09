"""Content tagging."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.add_route("feed", "/api/articles/feed")
    config.add_route("articles", "/api/articles")
    config.add_route("article", "/api/articles/{slug}")
