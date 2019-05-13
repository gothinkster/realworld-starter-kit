"""A user's Profile."""

from __future__ import annotations
from conduit.auth.models import User
from pyramid.request import Request
from sqlalchemy.orm.session import Session

import typing as t

__all__ = ["Profile"]


class Profile:
    """A user's profile.

    Implemented as a light wrapper around the SQLAlchemy-based User model.
    """

    user: User

    def __init__(self, user: User):
        self.user = user

    def __json__(self, request: Request) -> t.Dict[str, t.Union[str, bool]]:
        """JSON renderer support."""
        return {
            "username": self.user.username,
            "bio": self.user.bio,
            "image": self.user.image,
            "following": (self.user in request.user.follows) if request.user else False,
        }

    @classmethod
    def by_username(
        cls: t.Type[Profile], username: str, db: Session
    ) -> t.Optional[Profile]:
        """Get Profile by username."""
        q = db.query(User)
        q = q.filter(User.username == username)
        user = q.one_or_none()
        if user:
            return Profile(user=user)
        return None
