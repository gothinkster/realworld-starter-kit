"""Tag model."""

from pyramid.request import Request
from pyramid_deferred_sqla import Base
from pyramid_deferred_sqla import Model
from pyramid_deferred_sqla import model_config
from sqlalchemy import Column
from sqlalchemy import Unicode

__all__ = ["Tag"]


@model_config(Base)
class Tag(Model):
    """Tag of an article."""

    __tablename__ = "tags"

    def __json__(self, request: Request) -> str:
        """JSON renderer support."""
        return self.name

    name = Column(Unicode(length=50), nullable=False)
