package com.softwaremill.realworld.articles.model

import com.softwaremill.realworld.articles.model.ArticleData
import com.softwaremill.realworld.articles.model.ArticleAuthor
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

import java.time.Instant

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
  given articleDataEncoder: JsonEncoder[ArticleData] = DeriveJsonEncoder.gen[ArticleData]
  given articleDataDecoder: JsonDecoder[ArticleData] = DeriveJsonDecoder.gen[ArticleData]
