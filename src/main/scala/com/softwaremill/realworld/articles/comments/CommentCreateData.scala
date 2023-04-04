package com.softwaremill.realworld.articles.comments

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class CommentCreateData(body: String)

object CommentCreateData:
  given commentCreateDataEncoder: JsonEncoder[CommentCreateData] = DeriveJsonEncoder.gen
  given commentCreateDataDecoder: JsonDecoder[CommentCreateData] = DeriveJsonDecoder.gen
