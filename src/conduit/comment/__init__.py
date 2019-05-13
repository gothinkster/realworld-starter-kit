"""Comments on Articles."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.add_route("comments", "/api/articles/{slug}/comments")
