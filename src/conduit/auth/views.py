"""HTTP operations for auth."""

from conduit.auth.models import User
from mypy_extensions import TypedDict
from passlib.hash import argon2
from pyramid.httpexceptions import HTTPUnauthorized
from pyramid.request import Request
from pyramid.view import view_config

# Python representation of openapi.yaml's UserResponse schema
UserResponse = TypedDict("UserResponse", {"user": User})


@view_config(
    route_name="user",
    renderer="json",
    request_method="GET",
    openapi=True,
    permission="authenticated",
)
def current_user(request: Request) -> UserResponse:
    """Get currently logged in user."""
    return {"user": request.user}


@view_config(
    route_name="user",
    renderer="json",
    request_method="PUT",
    openapi=True,
    permission="authenticated",
)
def update(request: Request) -> UserResponse:
    """Update currently logged in user."""
    body = request.openapi_validated.body
    user = request.user

    for field in body.user.__dict__:
        setattr(user, field, getattr(body.user, field))

    return {"user": user}


@view_config(route_name="users", renderer="json", request_method="POST", openapi=True)
def register(request: Request) -> UserResponse:
    """User registers to Conduit app."""
    body = request.openapi_validated.body

    user = User(
        email=body.user.email,
        username=body.user.username,
        password_hash=argon2.hash(body.user.password),
    )
    request.db.add(user)
    request.db.flush()  # so that user.id is set and JWT token can be generated
    request.response.status_code = 201
    return {"user": user}


@view_config(
    route_name="users.login", renderer="json", request_method="POST", openapi=True
)
def login(request: Request) -> UserResponse:
    """User logs in."""
    body = request.openapi_validated.body

    user = User.by_email(body.user.email, db=request.db)
    if user and user.verify_password(body.user.password):
        return {"user": user}

    raise HTTPUnauthorized()
