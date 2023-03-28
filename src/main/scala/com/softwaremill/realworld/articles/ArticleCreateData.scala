package com.softwaremill.realworld.articles
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ArticleCreateData(
    title: String,
    description: String,
    body: String,
    tagList: List[String] // TODO tagList is currently mandatory...
)

object ArticleCreateData:
  given articleCreateDataEncoder: JsonEncoder[ArticleCreateData] = DeriveJsonEncoder.gen[ArticleCreateData]
  given articleCreateDataDecoder: JsonDecoder[ArticleCreateData] = DeriveJsonDecoder.gen[ArticleCreateData]
