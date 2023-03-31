package com.softwaremill.realworld.articles.model

import com.softwaremill.realworld.articles.model.ArticleUpdateData
import com.softwaremill.realworld.common.NoneAsNullOptionEncoder.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ArticleUpdateData(
    slug: Option[String], // TODO add additional class without slug
    title: Option[String],
    description: Option[String],
    body: Option[String]
)

object ArticleUpdateData:
  given articleUpdateDataEncoder: JsonEncoder[ArticleUpdateData] = DeriveJsonEncoder.gen[ArticleUpdateData]
  given articleUpdateDataDecoder: JsonDecoder[ArticleUpdateData] = DeriveJsonDecoder.gen[ArticleUpdateData]
