package com.softwaremill.realworld.articles

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ArticleUpdate(article: ArticleUpdateData)

object ArticleUpdate:
  given articleUpdateEncoder: JsonEncoder[ArticleUpdate] = DeriveJsonEncoder.gen[ArticleUpdate]
  given articleUpdateDecoder: JsonDecoder[ArticleUpdate] = DeriveJsonDecoder.gen[ArticleUpdate]
