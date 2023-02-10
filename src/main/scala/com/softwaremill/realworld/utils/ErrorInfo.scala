package com.softwaremill.realworld.utils

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

sealed trait ErrorInfo
case class NotFound(error: String = "Not found.") extends ErrorInfo
case class Unauthorized(error: String = "Unauthorized.") extends ErrorInfo
case class ValidationFailed(errors: Map[String, List[String]]) extends ErrorInfo
case class InternalServerError(error: String = "Internal server error.") extends ErrorInfo

object ErrorInfo:
  given notFoundEncoder: zio.json.JsonEncoder[NotFound] = DeriveJsonEncoder.gen[NotFound]

  given notFoundDecoder: zio.json.JsonDecoder[NotFound] = DeriveJsonDecoder.gen[NotFound]

  given unauthorizedEncoder: zio.json.JsonEncoder[Unauthorized] = DeriveJsonEncoder.gen[Unauthorized]

  given unauthorizedDecoder: zio.json.JsonDecoder[Unauthorized] = DeriveJsonDecoder.gen[Unauthorized]

  given validationFailedEncoder: zio.json.JsonEncoder[ValidationFailed] = DeriveJsonEncoder.gen[ValidationFailed]

  given validationFailedDecoder: zio.json.JsonDecoder[ValidationFailed] = DeriveJsonDecoder.gen[ValidationFailed]

  given internalServerErrorEncoder: zio.json.JsonEncoder[InternalServerError] = DeriveJsonEncoder.gen[InternalServerError]

  given internalServerErrorDecoder: zio.json.JsonDecoder[InternalServerError] = DeriveJsonDecoder.gen[InternalServerError]
