"""HTTP operations for auth."""

from conduit.auth.models import User
from passlib.hash import argon2
from pydantic import BaseModel
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


@view_config(route_name="users", renderer="json", request_method="POST", openapi=True)
def register(request: Request) -> UserResponse:
    """List all tags."""
    user = User(
        email=request.openapi_validated.body.user.email,
        username=request.openapi_validated.body.user.username,
        password_hash=argon2.hash(request.openapi_validated.body.user.password),
    )
    request.db.add(user)
    request.db.flush()  # so that user.id is set and JWT token can be generated
    request.response.status_code = 201
    return UserResponse(user=user)
