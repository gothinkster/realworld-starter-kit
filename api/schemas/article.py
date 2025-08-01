from datetime import datetime
from typing import List, Union

from ..models.article import ArticleModel
from ..models.user import UserModel
from .base import BaseSchema
from .user import ProfileSchema


class CreateArticleSchema(BaseSchema):
    title: str
    description: str
    body: str
    tagList: Union[List[str], None] = None


class UpdateArticleSchema(BaseSchema):
    title: Union[str, None] = None
    description: Union[str, None] = None
    body: Union[str, None] = None


class ArticleSchema(BaseSchema):
    slug: str
    title: str
    description: str
    body: str
    tagList: List[str]
    createdAt: datetime
    updatedAt: datetime
    favorited: bool = False
    favoritesCount: int = 0
    author: ProfileSchema

    @classmethod
    def from_article_instance(
        cls, article: ArticleModel, user: Union[UserModel, None] = None
    ) -> "ArticleSchema":
        if user is None:
            favorited = False
        else:
            favorited = user.id in article.favoritedUserIDs

        return cls(
            favorited=favorited,
            favoritesCount=len(article.favoritedUserIDs),
            **article.model_dump()
        )


class ArticleResponseSchema(BaseSchema):
    article: ArticleSchema

    @classmethod
    def from_article_instance(
        cls, article: ArticleModel, user: Union[UserModel, None] = None
    ) -> "ArticleResponseSchema":
        return cls(
            article=ArticleSchema.from_article_instance(article=article, user=user)
        )


class MultipleArticlesResponseSchema(BaseSchema):
    articles: List[ArticleSchema]
    articlesCount: int = 0

    @classmethod
    def from_article_instances(
        cls,
        articles: List[ArticleModel],
        total_count: int,
        user: Union[UserModel, None] = None,
    ) -> "MultipleArticlesResponseSchema":
        articles = [ArticleSchema.from_article_instance(a, user) for a in articles]
        return cls(articles=articles, articlesCount=total_count)
