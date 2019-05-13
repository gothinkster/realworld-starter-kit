"""Add tags table.

Revision ID: 72a996e5a6ca
Revises:
Create Date: 2019-04-24 08:24:08.291595

"""
from alembic import op
from sqlalchemy.dialects import postgresql

import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "72a996e5a6ca"
down_revision = None
branch_labels = None
depends_on = None


def upgrade():  # noqa: D103
    op.create_table(
        "tags",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            nullable=False,
        ),
        sa.Column("name", sa.Unicode, nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_tags")),
    )


def downgrade():  # noqa: D103
    op.drop_table("tags")
