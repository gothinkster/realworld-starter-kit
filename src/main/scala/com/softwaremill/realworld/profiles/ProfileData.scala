package com.softwaremill.realworld.profiles

import com.softwaremill.realworld.common.NoneAsNullOptionEncoder.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class ProfileData(username: String, bio: Option[String], image: Option[String], following: Boolean)

object ProfileData:
  given profileDataEncoder: JsonEncoder[ProfileData] = DeriveJsonEncoder.gen[ProfileData]
  given profileDataDecoder: JsonDecoder[ProfileData] = DeriveJsonDecoder.gen[ProfileData]
