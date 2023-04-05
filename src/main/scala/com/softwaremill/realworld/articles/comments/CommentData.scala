package com.softwaremill.realworld.articles.comments

import com.softwaremill.realworld.profiles.ProfileData
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

import java.time.Instant

case class CommentData(id: Int, createdAt: Instant, updatedAt: Instant, body: String, author: ProfileData)

object CommentData:
  given commentDataEncoder: JsonEncoder[CommentData] = DeriveJsonEncoder.gen
  given commentDataDecoder: JsonDecoder[CommentData] = DeriveJsonDecoder.gen
