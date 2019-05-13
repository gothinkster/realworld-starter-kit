"""Serve frontend on root to be able to play around."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.commit()
    config.add_static_view(name="", path="conduit:frontend")
