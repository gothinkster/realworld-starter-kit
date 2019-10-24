"""Comment model."""

from __future__ import annotations
from conduit.profile.models import Profile
from datetime import datetime
from pyramid.request import Request
from pyramid_deferred_sqla import Base
from pyramid_deferred_sqla import Model
from pyramid_deferred_sqla import model_config
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import Integer
from sqlalchemy import Unicode
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import backref
from sqlalchemy.orm import relationship

import typing as t

if t.TYPE_CHECKING:  # pragma: no cover
    from conduit.article.models import Article  # noqa: F401
    from conduit.auth.models import User  # noqa: F401

__all__ = ["Comment"]


@model_config(Base)
class Comment(Model):
    """A single aricle comment."""

    __tablename__ = "comments"

    def __json__(
        self, request: Request
    ) -> t.Dict[str, t.Union[int, bool, str, datetime, t.List[str], Profile]]:
        """JSON renderer support."""
        return {
            "id": self.id,
            "body": self.body,
            "createdAt": self.created,
            "updatedAt": self.updated,
            "author": Profile(self.author),
        }

    # override pyramid_deferred_sqla's UUID-based id column because
    # the RealWorld.io spec expects an Integer
    id = Column(Integer, primary_key=True, nullable=False)  # type: ignore  # noqa: A003

    article_id = Column(UUID(as_uuid=True), ForeignKey("articles.id"), nullable=False)
    article = t.cast(
        "Article",
        relationship(
            "Article",
            backref=backref(
                "comments",
                order_by="desc(Comment.created)",
                cascade="save-update, merge, delete",
            ),
        ),
    )

    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    author = t.cast(
        "User",
        relationship(
            "User",
            backref=backref(
                "comments",
                order_by="desc(Comment.created)",
                cascade="save-update, merge, delete",
            ),
        ),
    )

    body = Column(Unicode, nullable=False)
    created = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(DateTime, default=datetime.utcnow, nullable=False)
