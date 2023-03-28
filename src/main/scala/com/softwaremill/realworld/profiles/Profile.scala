package com.softwaremill.realworld.profiles

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder, JsonDecoder, JsonEncoder}

case class Profile(profile: ProfileData)

object Profile:
  given profileEncoder: JsonEncoder[Profile] = DeriveJsonEncoder.gen[Profile]
  given profileDecoder: JsonDecoder[Profile] = DeriveJsonDecoder.gen[Profile]
