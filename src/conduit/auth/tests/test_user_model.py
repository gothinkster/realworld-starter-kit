"""Tests for the Tag model."""

from conduit.auth.models import User
from sqlalchemy.orm.session import Session


def test_by_shortcuts(db: Session, democontent: None) -> None:
    """Test that by_* shortcuts work."""
    assert User.by_username("one", db) == User.by_email("one@bar.com", db)


def test_verify_password(db: Session, democontent: None) -> None:
    """Test verifying user's password."""
    user = User.by_username("one", db)
    assert user.verify_password("secret")  # type: ignore
    assert not user.verify_password("invalid")  # type: ignore


def test_follow(db: Session, democontent: None) -> None:
    """Test following a user."""
    one = User.by_username("one", db)
    two = User.by_username("one", db)

    assert two not in one.follows  # type: ignore

    one.follow(two)  # type: ignore
    assert two in one.follows  # type: ignore

    one.follow(two)  # type: ignore # again, to test idempotence
    assert two in one.follows  # type: ignore

    one.unfollow(two)  # type: ignore
    assert two not in one.follows  # type: ignore

    one.unfollow(two)  # type: ignore # again, to test idempotence
    assert two not in one.follows  # type: ignore
