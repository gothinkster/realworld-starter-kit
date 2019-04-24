"""Test the populate.py script.

Since this script is used a lot in other test suites, we only need very
simple testing here.
"""

from conduit.scripts.populate import main
from conduit.tag.models import Tag
from sqlalchemy.orm.session import Session
from unittest import mock

import transaction


@mock.patch("conduit.scripts.populate.argparse")
def test_populate(argparse: mock.MagicMock, db: Session) -> None:
    """Test that db is populated with demo content."""

    argparse.ArgumentParser.return_value.parse_args.return_value.config = "etc/test.ini"
    main()
    assert db.query(Tag).count() == 2

    # manual test teardown is needed because main() does db.commit()
    with transaction.manager:
        db.query(Tag).delete()
        db.flush()
