"""users.

Revision ID: 17de12da1127
Revises: 72a996e5a6ca
Create Date: 2019-04-26 19:03:11.540559

"""
from alembic import op
from sqlalchemy.dialects import postgresql

import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "17de12da1127"
down_revision = "72a996e5a6ca"
branch_labels = None
depends_on = None


def upgrade():  # noqa: D103
    op.create_table(
        "users",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            nullable=False,
        ),
        sa.Column("email", sa.String(), nullable=False),
        sa.Column("username", sa.String(), nullable=False),
        sa.Column("password_hash", sa.String(), nullable=False),
        sa.Column("bio", sa.Unicode()),
        sa.Column("image", sa.String()),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_users")),
    )


def downgrade():  # noqa: D103
    op.drop_table("users")
