package com.softwaremill.realworld.articles

import java.time.Instant

case class Article(
    slug: String,
    title: String,
    description: String,
    body: String,
    tagList: List[String],
    createdAt: Instant,
    updatedAt: Instant,
    favorited: Boolean,
    favoritesCount: Int,
    author: ArticleAuthor
)

case class ArticleRow(
    slug: String,
    title: String,
    description: String,
    body: String,
    createdAt: Instant,
    updatedAt: Instant,
    authorId: Int
)

case class ArticleTagRow(
    tag: String,
    articleSlug: String
)

case class ArticleFavoriteRow(
    profileId: Int,
    articleSlug: String
)

case class ArticleAuthor(
    username: String,
    bio: String,
    image: String,
    following: Boolean
)
