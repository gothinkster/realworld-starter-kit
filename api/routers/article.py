from datetime import datetime
from typing import Union

from couchbase.exceptions import DocumentExistsException
from fastapi import APIRouter, Body, Depends, HTTPException, status
from fastapi.encoders import jsonable_encoder

from ..core.article import query_articles_by_slug
from ..core.exceptions import NotArticleAuthorException
from ..database import get_db
from ..models.article import ArticleModel, CommentModel
from ..models.user import UserModel
from ..schemas.article import (
    ArticleResponseSchema,
    CreateArticleSchema,
    MultipleArticlesResponseSchema,
    UpdateArticleSchema,
)
from ..utils.security import (
    get_current_user_instance,
    get_current_user_optional_instance,
    get_user_instance,
)

router = APIRouter(
    prefix="/api",
    tags=["articles"],
    responses={404: {"description": "Not found"}},
)
ARTICLE_COLLECTION = "article"
COMMENT_COLLECTION = "comment"


async def build_query(filter_type: str, limit: int, offset: int) -> str:
    """Builds SQL++ queries based on filter type and returns filter."""
    base_query = f"""SELECT article.*
        FROM article
        ORDER BY article.createdAt
        LIMIT {limit}
        OFFSET {offset};
    """
    if filter_type == "author":
        return f"""SELECT article.*
            FROM article
            WHERE article.author.username=$author
            ORDER BY article.createdAt
            LIMIT {limit}
            OFFSET {offset};
        """
    elif filter_type == "favorited":
        return f"""SELECT article.*
            FROM article
            WHERE $favoritedId IN article.favoritedUserIDs
            ORDER BY article.createdAt
            LIMIT {limit}
            OFFSET {offset};
        """
    elif filter_type == "tag":
        return f"""SELECT article.*
            FROM article
            WHERE $tag IN article.tagList
            ORDER BY article.createdAt
            LIMIT {limit}
            OFFSET {offset};
        """
    return base_query


async def get_article_filter_type(
    author: Union[str, None] = None,
    favorited: Union[str, None] = None,
    tag: Union[str, None] = None,
) -> str:
    """Queries db for article instances by author, favorited or tag with a limit and offset and returns multiple \
        articles schema."""
    if author:
        return "author"
    elif favorited:
        return "favorited"
    elif tag:
        return "tag"
    else:
        return "all"


async def get_favorited_id(db, favorited: Union[str, None] = None):
    favorited_user = await get_user_instance(db, username=favorited)
    return favorited_user.id if favorited_user else None


async def get_comments_by_ids(db, comment_ids):
    if not comment_ids:
        return []
    query = f"""
        SELECT comment.*
        FROM {COMMENT_COLLECTION} AS comment
        WHERE comment.id IN $comment_ids;
    """
    try:
        query_result = db.query(query, comment_ids=comment_ids)
        return [CommentModel(**r) for r in query_result]
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to retrieve comments: {e}",
        )


@router.get("/articles", response_model=MultipleArticlesResponseSchema)
async def get_articles(
    author: Union[str, None] = None,
    favorited: Union[str, None] = None,
    tag: Union[str, None] = None,
    limit: int = 20,
    offset: int = 0,
    user_instance: Union[UserModel, None] = Depends(get_current_user_optional_instance),
    db=Depends(get_db),
):
    """Queries db for article instances by author, favorited or tag with a limit and offset and returns multiple \
        articles schema."""
    favorited_id = await get_favorited_id(db, favorited)
    filter_type = await get_article_filter_type(author, favorited, tag)
    query = await build_query(filter_type, limit, offset)
    if query is None:
        return MultipleArticlesResponseSchema(articles=[], articles_count=0)
    try:
        queryResult = db.query(
            query,
            author=author,
            favoritedId=favorited_id,
            tag=tag,
            limit=limit,
            offset=offset,
        )
        article_list = [ArticleModel(**r) for r in queryResult]
        return MultipleArticlesResponseSchema.from_article_instances(
            article_list, len(article_list), user_instance
        )
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.get("/articles/feed", response_model=MultipleArticlesResponseSchema)
async def get_feed_articles(
    limit: int = 20,
    offset: int = 0,
    user_instance: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Query db for article instances by author (that current user follows) and returns multiple articles schema."""
    query = """
            SELECT article.*
            FROM article
            WHERE article.author.id IN $users_followed
            ORDER BY article.createdAt
            LIMIT $limit
            OFFSET $offset;
        """
    try:
        queryResult = db.query(
            query,
            users_followed=user_instance.following_ids,
            limit=limit,
            offset=offset,
        )
        article_list = [ArticleModel(**article) for article in queryResult]
        return MultipleArticlesResponseSchema(
            articles=article_list, articlesCount=len(article_list)
        )
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.post("/articles", response_model=ArticleResponseSchema)
async def create_article(
    article: CreateArticleSchema = Body(..., embed=True),
    user_instance: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Create article instance from create schema, inserts instance to db then returns article schema."""
    response_article = ArticleModel(author=user_instance, **article.model_dump())
    response_article.tagList.sort()
    try:
        db.insert_document(
            ARTICLE_COLLECTION,
            response_article.slug,
            jsonable_encoder(response_article),
        )
        return ArticleResponseSchema.from_article_instance(
            response_article, user_instance
        )
    except DocumentExistsException:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT, detail="Article already exists"
        )
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.get("/articles/{slug}", response_model=ArticleResponseSchema)
async def get_single_article(
    slug: str,
    user_instance: Union[UserModel, None] = Depends(get_current_user_optional_instance),
    db=Depends(get_db),
):
    """Queries db for article instance by slug and returns article schema."""
    article_model = await query_articles_by_slug(slug, db)
    return ArticleResponseSchema.from_article_instance(article_model, user_instance)


@router.put("/articles/{slug}", response_model=ArticleResponseSchema)
async def update_article(
    slug: str,
    article: UpdateArticleSchema = Body(..., embed=True),
    current_user: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Queries db for article instance by slug, updates instance with update schema, upserts article to db and \
        returns article schema."""
    article_instance = await query_articles_by_slug(slug, db)
    if current_user != article_instance.author:
        raise NotArticleAuthorException()
    patch_dict = article.model_dump(exclude_none=True)
    for name, value in patch_dict.items():
        setattr(article_instance, name, value)
    article_instance.updatedAt = datetime.utcnow()
    try:
        db.upsert_document(
            ARTICLE_COLLECTION,
            article_instance.slug,
            jsonable_encoder((article_instance)),
        )
        return ArticleResponseSchema.from_article_instance(
            article_instance, current_user
        )
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.post("/articles/{slug}/favorite", response_model=ArticleResponseSchema)
async def favorite_article(
    slug: str,
    current_user: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Queries db for article instance by slug, adds user ID to favoritedUserIDs, upserts instance to db and returns \
        article schema."""
    article = await query_articles_by_slug(slug, db)
    favorited_set = {*article.favoritedUserIDs, current_user.id}
    article.favoritedUserIDs = tuple(favorited_set)
    try:
        db.upsert_document(ARTICLE_COLLECTION, article.slug, jsonable_encoder(article))
        return ArticleResponseSchema.from_article_instance(article, current_user)
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.delete("/articles/{slug}/favorite", response_model=ArticleResponseSchema)
async def unfavorite_article(
    slug: str,
    current_user: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Queries db for article instance by slug, removes user ID from favoritedUserIDs, upserts instance to db and \
        returns article schema."""
    article = await query_articles_by_slug(slug, db)
    favorited_set = {*article.favoritedUserIDs} - {current_user.id}
    article.favoritedUserIDs = tuple(favorited_set)
    try:
        db.upsert_document(ARTICLE_COLLECTION, article.slug, jsonable_encoder(article))
        return ArticleResponseSchema.from_article_instance(article, current_user)
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )


@router.delete("/articles/{slug}")
async def delete_article(
    slug: str,
    current_user: UserModel = Depends(get_current_user_instance),
    db=Depends(get_db),
):
    """Queries db for article instance by slug and deletes instance from db."""
    article = await query_articles_by_slug(slug, db)
    if current_user.id != article.author.id:
        raise NotArticleAuthorException()
    try:
        db.delete_document(ARTICLE_COLLECTION, article.slug)
    except TimeoutError:
        raise HTTPException(
            status_code=status.HTTP_408_REQUEST_TIMEOUT, detail="Request timeout"
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Unexpected error: {e}",
        )
