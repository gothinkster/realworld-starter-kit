package com.softwaremill.realworld.articles
import com.softwaremill.realworld.common.NoneAsNullOptionEncoder.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ArticleAuthor(username: String, bio: Option[String], image: Option[String], following: Boolean)

object ArticleAuthor:
  given articleAuthorEncoder: JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]
  given articleAuthorDecoder: JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]
