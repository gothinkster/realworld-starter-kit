package com.softwaremill.realworld.articles.comments

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class Comment(comment: CommentData)

object Comment:
  given commentEncoder: JsonEncoder[Comment] = DeriveJsonEncoder.gen
  given commentDecoder: JsonDecoder[Comment] = DeriveJsonDecoder.gen
