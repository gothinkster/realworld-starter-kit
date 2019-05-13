"""article.

Revision ID: 6781acfc7c14
Revises: eb70668a123c
Create Date: 2019-04-29 21:16:48.157964

"""
from alembic import op
from sqlalchemy.dialects import postgresql

import sqlalchemy as sa

# revision identifiers, used by Alembic.
revision = "6781acfc7c14"
down_revision = "eb70668a123c"
branch_labels = None
depends_on = None


def upgrade():  # noqa: D103
    op.create_table(
        "articles",
        sa.Column(
            "id",
            postgresql.UUID(as_uuid=True),
            server_default=sa.text("gen_random_uuid()"),
            nullable=False,
        ),
        sa.Column("author_id", postgresql.UUID(as_uuid=True), nullable=False),
        sa.Column("slug", sa.String, nullable=False),
        sa.Column("title", sa.Unicode, nullable=False),
        sa.Column("description", sa.Unicode, nullable=False),
        sa.Column("body", sa.Unicode, nullable=False),
        sa.Column("created", sa.DateTime, nullable=False),
        sa.Column("updated", sa.DateTime, nullable=False),
        sa.PrimaryKeyConstraint("id", name=op.f("pk_articles")),
        sa.ForeignKeyConstraint(
            ["author_id"], ["users.id"], name=op.f("fk_articles_author_id_users")
        ),
        sa.UniqueConstraint("slug", name=op.f("uq_articles_slug")),
    )


def downgrade():  # noqa: D103
    op.drop_table("articles")
