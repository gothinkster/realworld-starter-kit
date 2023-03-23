package com.softwaremill.realworld.profiles

import com.softwaremill.realworld.common.NoneAsNullOptionEncoder.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class Profile(profile: ProfileData)

object Profile:
  given profileEncoder: JsonEncoder[Profile] = DeriveJsonEncoder.gen[Profile]
  given profileDecoder: JsonDecoder[Profile] = DeriveJsonDecoder.gen[Profile]

case class ProfileData(username: String, bio: Option[String], image: Option[String], following: Boolean)

object ProfileData:
  given profileDataEncoder: JsonEncoder[ProfileData] = DeriveJsonEncoder.gen[ProfileData]
  given profileDataDecoder: JsonDecoder[ProfileData] = DeriveJsonDecoder.gen[ProfileData]

case class Followers(userId: Int, followerId: Int)
