"""Authentication & Authorization."""

from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator


def includeme(config: Configurator):
    """Pyramid knob."""

    # Pyramid requires an authorization policy to be active.
    config.set_authorization_policy(ACLAuthorizationPolicy())
    # Enable JWT authentication.
    config.include("pyramid_jwt")
    config.set_jwt_authentication_policy(config.registry.settings["jwt.secret"])

    # Add API routes for auth
    config.add_route("users", "/api/users")
    config.add_route("users.login", "/api/users/login")
