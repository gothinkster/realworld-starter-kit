"""Article model."""

from __future__ import annotations
from conduit.profile.models import Profile
from conduit.tag.models import Tag
from datetime import datetime
from pyramid.request import Request
from pyramid_deferred_sqla import Base
from pyramid_deferred_sqla import Model
from pyramid_deferred_sqla import model_config
from sqlalchemy import Column
from sqlalchemy import DateTime
from sqlalchemy import ForeignKey
from sqlalchemy import String
from sqlalchemy import Table
from sqlalchemy import Unicode
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import backref
from sqlalchemy.orm import relationship
from sqlalchemy.orm.session import Session

import typing as t

__all__ = ["Article"]


article_tags = Table(
    "article_tags",
    Base.metadata,
    Column("article_id", UUID(as_uuid=True), ForeignKey("articles.id")),
    Column("tag_id", UUID(as_uuid=True), ForeignKey("tags.id")),
)


@model_config(Base)
class Article(Model):
    """A single Conduit post."""

    __tablename__ = "articles"

    def __json__(
        self, request: Request
    ) -> t.Dict[str, t.Union[int, bool, str, t.List[str], Profile]]:
        """JSON renderer support."""
        return {
            "slug": self.slug,
            "title": self.title,
            "description": self.description,
            "body": self.body,
            "createdAt": self.created,
            "updatedAt": self.updated,
            "tagList": [t.name for t in self.tags],
            "favorited": self.favorited(request),
            "favoritesCount": len(self.favored_by),
            "author": Profile(self.author),
        }

    author_id = Column(UUID(as_uuid=True), ForeignKey("users.id"), nullable=False)
    author = relationship(
        "User", backref=backref("articles", order_by="desc(Article.created)")
    )

    slug = Column(String(), nullable=False, unique=True)
    title = Column(Unicode(), nullable=False)
    description = Column(Unicode(), nullable=False)
    body = Column(Unicode(), nullable=False)
    created = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated = Column(DateTime, default=datetime.utcnow, nullable=False)

    tags = relationship(Tag, secondary=article_tags)

    @classmethod
    def by_slug(cls: t.Type[Article], slug: str, db: Session) -> t.Optional[Article]:
        """Get Article by slug."""
        q = db.query(cls)
        q = q.filter(cls.slug == slug)
        return q.one_or_none()

    @classmethod
    def by_id(cls: t.Type[Article], uuid: str, db: Session) -> t.Optional[Article]:
        """Get Article by id."""
        q = db.query(cls)
        q = q.filter(cls.id == uuid)
        return q.one_or_none()

    def favorited(self: Article, request: Request):
        """Return True if this article is favorited by a logged-in user."""
        if not request.user:
            return False

        if self in request.user.favorites:
            return True

        return False
