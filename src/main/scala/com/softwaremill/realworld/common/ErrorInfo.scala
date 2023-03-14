package com.softwaremill.realworld.common

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

sealed trait ErrorInfo
case class BadRequest(error: String = "Bad request.") extends ErrorInfo
case class Unauthorized(error: String = "Unauthorized.") extends ErrorInfo
case class Forbidden(error: String = "Forbidden.") extends ErrorInfo
case class NotFound(error: String = "Not found.") extends ErrorInfo
case class Conflict(error: String = "Conflict.") extends ErrorInfo
case class ValidationFailed(errors: Map[String, List[String]]) extends ErrorInfo
case class InternalServerError(error: String = "Internal server error.") extends ErrorInfo

object ErrorInfo:

  given badRequestEncoder: zio.json.JsonEncoder[BadRequest] = DeriveJsonEncoder.gen[BadRequest]
  given badRequestDecoder: zio.json.JsonDecoder[BadRequest] = DeriveJsonDecoder.gen[BadRequest]
  given forbiddenEncoder: zio.json.JsonEncoder[Forbidden] = DeriveJsonEncoder.gen[Forbidden]
  given forbiddenDecoder: zio.json.JsonDecoder[Forbidden] = DeriveJsonDecoder.gen[Forbidden]
  given notFoundEncoder: zio.json.JsonEncoder[NotFound] = DeriveJsonEncoder.gen[NotFound]
  given notFoundDecoder: zio.json.JsonDecoder[NotFound] = DeriveJsonDecoder.gen[NotFound]
  given conflictEncoder: zio.json.JsonEncoder[Conflict] = DeriveJsonEncoder.gen[Conflict]
  given conflictDecoder: zio.json.JsonDecoder[Conflict] = DeriveJsonDecoder.gen[Conflict]
  given unauthorizedEncoder: zio.json.JsonEncoder[Unauthorized] = DeriveJsonEncoder.gen[Unauthorized]
  given unauthorizedDecoder: zio.json.JsonDecoder[Unauthorized] = DeriveJsonDecoder.gen[Unauthorized]
  given validationFailedEncoder: zio.json.JsonEncoder[ValidationFailed] = DeriveJsonEncoder.gen[ValidationFailed]
  given validationFailedDecoder: zio.json.JsonDecoder[ValidationFailed] = DeriveJsonDecoder.gen[ValidationFailed]
  given internalServerErrorEncoder: zio.json.JsonEncoder[InternalServerError] = DeriveJsonEncoder.gen[InternalServerError]
  given internalServerErrorDecoder: zio.json.JsonDecoder[InternalServerError] = DeriveJsonDecoder.gen[InternalServerError]
