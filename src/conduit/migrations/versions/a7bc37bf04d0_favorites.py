"""favorites.

Revision ID: a7bc37bf04d0
Revises: 54a3f0ecbe4e
Create Date: 2019-05-10 14:56:56.017811

"""
from alembic import op
from sqlalchemy.dialects import postgresql

import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "a7bc37bf04d0"
down_revision = "54a3f0ecbe4e"
branch_labels = None
depends_on = None


def upgrade():  # noqa: D103
    op.create_table(
        "favorites",
        sa.Column("user_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("article_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.ForeignKeyConstraint(
            ["article_id"],
            ["articles.id"],
            name=op.f("fk_favorites_article_id_articles"),
        ),
        sa.ForeignKeyConstraint(
            ["user_id"], ["users.id"], name=op.f("fk_favorites_user_id_users")
        ),
    )


def downgrade():  # noqa: D103
    op.drop_table("favorites")
