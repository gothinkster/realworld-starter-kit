package com.softwaremill.realworld.articles.model

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ArticlesList(
    articles: List[ArticleData],
    articlesCount: Int
)

object ArticlesList:
  given articleDataEncoder: JsonEncoder[ArticlesList] = DeriveJsonEncoder.gen[ArticlesList]
  given articleDataDecoder: JsonDecoder[ArticlesList] = DeriveJsonDecoder.gen[ArticlesList]
