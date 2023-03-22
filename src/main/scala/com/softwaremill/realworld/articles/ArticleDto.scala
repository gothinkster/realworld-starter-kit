package com.softwaremill.realworld.articles

import com.softwaremill.realworld.common.NoneAsNullOptionEncoder.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

import java.time.Instant

case class Article(
    article: ArticleData
)
object Article:
  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]

case class ArticleCreate(
    article: ArticleCreateData
)
object ArticleCreate:
  given articleCreateEncoder: zio.json.JsonEncoder[ArticleCreate] = DeriveJsonEncoder.gen[ArticleCreate]
  given articleCreateDecoder: zio.json.JsonDecoder[ArticleCreate] = DeriveJsonDecoder.gen[ArticleCreate]

case class ArticleUpdate(
    article: ArticleUpdateData
)
object ArticleUpdate:
  given articleUpdateEncoder: zio.json.JsonEncoder[ArticleUpdate] = DeriveJsonEncoder.gen[ArticleUpdate]
  given articleUpdateDecoder: zio.json.JsonDecoder[ArticleUpdate] = DeriveJsonDecoder.gen[ArticleUpdate]

case class ArticleData(
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
object ArticleData:
  given articleDataEncoder: zio.json.JsonEncoder[ArticleData] = DeriveJsonEncoder.gen[ArticleData]
  given articleDataDecoder: zio.json.JsonDecoder[ArticleData] = DeriveJsonDecoder.gen[ArticleData]

case class ArticleCreateData(
    title: String,
    description: String,
    body: String,
    tagList: List[String] // TODO tagList is currently mandatory...
)

object ArticleCreateData:
  given articleCreateDataEncoder: zio.json.JsonEncoder[ArticleCreateData] = DeriveJsonEncoder.gen[ArticleCreateData]
  given articleCreateDataDecoder: zio.json.JsonDecoder[ArticleCreateData] = DeriveJsonDecoder.gen[ArticleCreateData]

case class ArticleUpdateData(
    slug: Option[String], // TODO add additional class without slug
    title: Option[String],
    description: Option[String],
    body: Option[String]
)
object ArticleUpdateData:
  given articleUpdateDataEncoder: zio.json.JsonEncoder[ArticleUpdateData] = DeriveJsonEncoder.gen[ArticleUpdateData]
  given articleUpdateDataDecoder: zio.json.JsonDecoder[ArticleUpdateData] = DeriveJsonDecoder.gen[ArticleUpdateData]

case class ArticleAuthor(
    username: String,
    bio: Option[String],
    image: Option[String],
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
