"""HTTP operations for auth."""

from conduit.auth.models import User
from conduit.openapi import object_or_404
from pydantic import BaseModel
from pyramid.request import Request
from pyramid.view import view_config

import typing as t


class ProfileResponse(BaseModel):
    """Python implementation of openapi.yaml's ProfileResponse schema."""

    profile: User
    following: bool

    class Config:
        """Enable support for User type."""

        arbitrary_types_allowed = True

    def __json__(
        self, request: Request
    ) -> t.Dict[str, t.Dict[str, t.Union[str, bool]]]:
        """JSON renderer support."""
        return {
            "profile": {
                "username": self.profile.username,
                "bio": self.profile.bio or "",
                "image": self.profile.image or "",
                "following": self.following,
            }
        }


@view_config(
    route_name="profile",
    renderer="json",
    request_method="GET",
    openapi=True,
    permission="authenticated",
)
def profile(request: Request) -> ProfileResponse:
    """Get a profile."""
    user = request.user
    profile = object_or_404(
        User.by_username(
            request.openapi_validated.parameters["path"]["username"], db=request.db
        )
    )
    following = profile in user.follows
    return ProfileResponse(profile=profile, following=following)


@view_config(
    route_name="profile.follow", renderer="json", request_method="POST", openapi=True
)
def follow(request: Request) -> ProfileResponse:
    """Follow a profile."""
    profile = object_or_404(
        User.by_username(
            request.openapi_validated.parameters["path"]["username"], db=request.db
        )
    )
    request.user.follow(profile)
    return ProfileResponse(profile=profile, following=True)


@view_config(
    route_name="profile.follow", renderer="json", request_method="DELETE", openapi=True
)
def unfollow(request: Request) -> ProfileResponse:
    """Unfollow a profile."""
    profile = object_or_404(
        User.by_username(
            request.openapi_validated.parameters["path"]["username"], db=request.db
        )
    )
    request.user.unfollow(profile)
    return ProfileResponse(profile=profile, following=False)
