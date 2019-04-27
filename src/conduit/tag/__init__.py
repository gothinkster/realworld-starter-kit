"""Content tagging."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.add_route("tags", "/api/tags")
