package com.softwaremill.realworld.articles.comments

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class CommentCreate(comment: CommentCreateData)

object CommentCreate:
  given commentCreateEncoder: JsonEncoder[CommentCreate] = DeriveJsonEncoder.gen
  given commentCreateDecoder: JsonDecoder[CommentCreate] = DeriveJsonDecoder.gen
