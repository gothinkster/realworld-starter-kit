"""Models related to auth."""

from __future__ import annotations
from pyramid_deferred_sqla import Base
from pyramid_deferred_sqla import Model
from pyramid_deferred_sqla import model_config
from sqlalchemy import Column
from sqlalchemy import String
from sqlalchemy import TypeDecorator
from sqlalchemy import Unicode
from sqlalchemy.dialects.postgresql.psycopg2 import PGDialect_psycopg2
from sqlalchemy.orm.session import Session

import typing as t

__all__ = ["User"]


class LowerCaseString(TypeDecorator):
    """Converts strings to lower case on the way in."""

    impl = String

    def process_bind_param(self, value: str, dialect: PGDialect_psycopg2):
        return value.lower()


@model_config(Base)
class User(Model):
    """A logged-in user."""

    __tablename__ = "users"

    email = Column(LowerCaseString(), nullable=False)
    username = Column(String(), nullable=False)
    password_hash = Column(String(), nullable=False)
    bio = Column(Unicode())
    image = Column(String())

    @classmethod
    def by_username(cls: t.Type[User], username: str, db: Session) -> t.Optional[User]:
        """Get User by username."""
        q = db.query(cls)
        q = q.filter(cls.username == username)
        return q.one_or_none()
