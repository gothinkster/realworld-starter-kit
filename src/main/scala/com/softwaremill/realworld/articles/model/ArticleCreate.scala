package com.softwaremill.realworld.articles.model

import com.softwaremill.realworld.articles.model.ArticleCreate
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ArticleCreate(article: ArticleCreateData)

object ArticleCreate:
  given articleCreateEncoder: JsonEncoder[ArticleCreate] = DeriveJsonEncoder.gen[ArticleCreate]
  given articleCreateDecoder: JsonDecoder[ArticleCreate] = DeriveJsonDecoder.gen[ArticleCreate]
