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

case class StoredArticle(
    id: Int,
    slug: String,
    title: String,
    description: String,
    body: String,
    tagList: List[String],
    createdAt: Instant,
    updatedAt: Instant,
    authorId: Int
)

case class ArticleAuthor(username: String, bio: String, image: String, following: Boolean)
