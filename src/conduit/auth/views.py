"""HTTP operations for auth."""

from conduit.auth.models import User
from passlib.hash import argon2
from pydantic import BaseModel
from pyramid.httpexceptions import exception_response
from pyramid.request import Request
from pyramid.view import view_config

import typing as t


class UserResponse(BaseModel):
    """Python implementation of openapi.yaml's UserResponse schema."""

    user: User

    class Config:
        """Enable support for User type."""

        arbitrary_types_allowed = True

    def __json__(self, request: Request) -> t.Dict[str, t.Dict[str, str]]:
        """JSON renderer support."""
        return {
            "user": {
                "email": self.user.email,
                "token": request.create_jwt_token(str(self.user.id)),
                "username": self.user.username,
                "bio": self.user.bio or "",
                "image": self.user.image or "",
            }
        }


@view_config(
    route_name="user",
    renderer="json",
    request_method="GET",
    openapi=True,
    permission="authenticated",
)
def current_user(request: Request) -> UserResponse:
    """Get currently logged in user."""
    return UserResponse(user=User.by_id(request.authenticated_userid, db=request.db))


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
    user = User.by_id(request.authenticated_userid, db=request.db)

    for field in body.user.__dict__:
        setattr(user, field, getattr(body.user, field))

    return UserResponse(user=user)


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
    return UserResponse(user=user)


@view_config(
    route_name="users.login", renderer="json", request_method="POST", openapi=True
)
def login(request: Request) -> UserResponse:
    """User logs in."""
    body = request.openapi_validated.body

    user = User.by_email(body.user.email, db=request.db)
    if user and user.verify_password(body.user.password):
        return UserResponse(user=user)

    raise exception_response(401, json_body={})
