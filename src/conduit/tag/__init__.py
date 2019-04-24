"""Pyramid configuration related to Tags."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.add_route("tags", "/api/tags")
    config.scan(ignore=[".tests"])
