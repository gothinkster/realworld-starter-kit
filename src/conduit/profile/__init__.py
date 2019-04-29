"""User profiles."""

from pyramid.config import Configurator


def includeme(config: Configurator) -> None:
    """Pyramid knob."""
    config.add_route("profile", "/api/profiles/{username}")
    config.add_route("profile.follow", "/api/profiles/{username}/follow")
