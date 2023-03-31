package com.softwaremill.realworld.articles.model

import com.softwaremill.realworld.articles.model.Article
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class Article(article: ArticleData)

object Article:
  given articleEncoder: JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]
