package com.softwaremill.realworld.articles

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

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
object Article:
  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]

case class ArticleAuthor(
    username: String,
    bio: String,
    image: String,
    following: Boolean
)

object ArticleAuthor:
  given articleAuthorEncoder: zio.json.JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]
  given articleAuthorDecoder: zio.json.JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]

case class ArticleTagRow(
    tag: String,
    articleSlug: String
)

case class ArticleFavoriteRow(
    profileId: Int,
    articleSlug: String
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
