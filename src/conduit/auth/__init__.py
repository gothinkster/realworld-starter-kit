"""Authentication & Authorization."""

from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator
from pyramid.request import Request
from pyramid.security import Allow
from pyramid.security import Authenticated


def includeme(config: Configurator):
    """Pyramid knob."""

    # Pyramid requires an authorization policy to be active.
    config.set_authorization_policy(ACLAuthorizationPolicy())
    # Enable JWT authentication.
    config.include("pyramid_jwt")
    config.set_jwt_authentication_policy(
        config.registry.settings["jwt.secret"], auth_type="Token"
    )

    # Add API routes for auth
    config.add_route("user", "/api/user")
    config.add_route("users", "/api/users")
    config.add_route("users.login", "/api/users/login")


class RootFactory:
    """Give all Authenticated users the "authenticated" permission."""

    __acl__ = [(Allow, Authenticated, "authenticated")]

    def __init__(self, request: Request):
        pass
