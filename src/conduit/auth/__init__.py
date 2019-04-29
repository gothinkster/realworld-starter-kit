"""Authentication & Authorization."""

from conduit.auth.models import User
from pyramid.authorization import ACLAuthorizationPolicy
from pyramid.config import Configurator
from pyramid.request import Request
from pyramid.security import Allow

import typing as t


def includeme(config: Configurator) -> None:
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

    # Add request.user shorthand
    config.add_request_method(get_user, "user", reify=True)


def get_user(request: Request) -> t.Optional[User]:
    """Never to be called directly, exposes request.user."""
    return User.by_id(request.authenticated_userid, db=request.db)


class RootFactory:
    """Give all Authenticated users the "authenticated" permission."""

    user: t.Optional[User] = None

    @property
    def __acl__(self) -> t.List[t.Tuple]:
        """If JWT is correctly decoded and user exists, grant them permissions."""
        if self.user:
            return [(Allow, str(self.user.id), "authenticated")]
        return []

    def __init__(self, request: Request) -> None:
        if request.authenticated_userid:
            self.user = request.user
