package com.softwaremill.realworld.utils

import com.softwaremill.realworld.auth.{AuthService, UserSession}
import com.softwaremill.realworld.db.{Db, DbConfig}
import com.softwaremill.realworld.utils.*
import io.getquill.SnakeCase
import sttp.model.StatusCode
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import sttp.tapir.{EndpointInput, PublicEndpoint, Validator}
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Exit, ZIO, ZLayer}

abstract class AbstractEndpoints(authService: AuthService):

  val secureEndpoint: ZPartialServerEndpoint[Any, String, UserSession, Unit, ErrorInfo, Unit, Any] = endpoint.get
    .errorOut(
      oneOf[ErrorInfo](
        oneOfVariant(statusCode(StatusCode.NotFound).and(jsonBody[NotFound])),
        oneOfVariant(statusCode(StatusCode.Unauthorized).and(jsonBody[Unauthorized])),
        oneOfVariant(statusCode(StatusCode.UnprocessableEntity).and(jsonBody[ValidationFailed])),
        oneOfVariant(statusCode(StatusCode.InternalServerError).and(jsonBody[InternalServerError]))
      )
    )
    .securityIn(header[String]("Authorization"))
    .zServerSecurityLogic[Any, UserSession](token =>
      if (token.startsWith("Token ")) authService.getActiveUserSession(token.substring("Token ".length)).mapError(_ => Unauthorized())
      else ZIO.fail(Unauthorized())
    )
