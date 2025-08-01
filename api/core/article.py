from fastapi import HTTPException

from ..core.exceptions import ArticleNotFoundException
from ..models.article import ArticleModel


async def query_articles_by_slug(slug: str, db) -> ArticleModel:
    """Queries db for article instance by slug and returns article instance."""
    query = """
            SELECT article.*
            FROM article
            WHERE article.slug=$slug
            ORDER BY article.createdAt;
        """
    try:
        query_result = db.query(query, slug=slug)
        article_data = [r for r in query_result]
        if not article_data:
            raise ArticleNotFoundException()
        else:
            return ArticleModel(**article_data[0])
    except TimeoutError:
        raise HTTPException(status_code=408, detail="Request timeout")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Unexpected error: {e}")
