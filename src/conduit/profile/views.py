"""HTTP operations for auth."""

from conduit.openapi import object_or_404
from conduit.profile.models import Profile
from mypy_extensions import TypedDict
from pyramid.request import Request
from pyramid.view import view_config

# Python representation of openapi.yaml's ProfileResponse schema
ProfileResponse = TypedDict("ProfileResponse", {"profile": Profile})


@view_config(
    route_name="profile",
    renderer="json",
    request_method="GET",
    openapi=True,
    permission="authenticated",
)
def profile(request: Request) -> ProfileResponse:
    """Get a profile."""
    profile = object_or_404(
        Profile.by_username(
            request.openapi_validated.parameters["path"]["username"], db=request.db
        )
    )
    return {"profile": profile}


@view_config(
    route_name="profile.follow", renderer="json", request_method="POST", openapi=True
)
def follow(request: Request) -> ProfileResponse:
    """Follow a profile."""
    profile = object_or_404(
        Profile.by_username(
            request.openapi_validated.parameters["path"]["username"], db=request.db
        )
    )
    request.user.follow(profile.user)
    return {"profile": profile}


@view_config(
    route_name="profile.follow", renderer="json", request_method="DELETE", openapi=True
)
def unfollow(request: Request) -> ProfileResponse:
    """Unfollow a profile."""
    profile = object_or_404(
        Profile.by_username(
            request.openapi_validated.parameters["path"]["username"], db=request.db
        )
    )
    request.user.unfollow(profile.user)
    return {"profile": profile}
