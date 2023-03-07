package com.softwaremill.realworld.articles

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

object ArticlesSerialization:

  given articleAuthorEncoder: zio.json.JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]
  given articleAuthorDecoder: zio.json.JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]
  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]
