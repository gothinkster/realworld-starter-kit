package com.softwaremill.realworld.utils

import com.softwaremill.realworld.articles.{ArticlesEndpoints, ArticlesService}
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.db.{Db, DbConfig}
import com.softwaremill.realworld.users.UserSession
import com.softwaremill.realworld.utils.*
import com.softwaremill.realworld.utils.BaseEndpoints.{authHeader, defaultErrorOutputs}
import io.getquill.SnakeCase
import sttp.model.{HeaderNames, StatusCode}
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.{oneOfVariant, *}
import sttp.tapir.{Endpoint, EndpointIO, EndpointInput, EndpointOutput, PublicEndpoint, Validator}
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Exit, IO, ZIO, ZLayer}

class BaseEndpoints(authService: AuthService):

  val secureEndpoint: ZPartialServerEndpoint[Any, String, UserSession, Unit, ErrorInfo, Unit, Any] = endpoint
    .errorOut(defaultErrorOutputs)
    .securityIn(authHeader)
    .zServerSecurityLogic[Any, UserSession](handleAuth)

  val publicEndpoint: PublicEndpoint[Unit, ErrorInfo, Unit, Any] = endpoint
    .errorOut(defaultErrorOutputs)

  private def handleAuth(token: String): IO[ErrorInfo, UserSession] = {
    if (token.startsWith("Token ")) authService.getActiveUserSession(token.substring("Token ".length)).logError.mapError {
      case _: Exceptions.NotFound => Unauthorized()
      case _                      => InternalServerError()
    }
    else ZIO.fail(Unauthorized())
  }

object BaseEndpoints:

  val live: ZLayer[AuthService, Nothing, BaseEndpoints] = ZLayer.fromFunction(new BaseEndpoints(_))

  val defaultErrorOutputs: EndpointOutput.OneOf[ErrorInfo, ErrorInfo] = oneOf[ErrorInfo](
    oneOfVariant(statusCode(StatusCode.Forbidden).and(jsonBody[InternalServerError])),
    oneOfVariant(statusCode(StatusCode.NotFound).and(jsonBody[NotFound])),
    oneOfVariant(statusCode(StatusCode.Conflict).and(jsonBody[Conflict])),
    oneOfVariant(statusCode(StatusCode.Unauthorized).and(jsonBody[Unauthorized])),
    oneOfVariant(statusCode(StatusCode.UnprocessableEntity).and(jsonBody[ValidationFailed])),
    oneOfVariant(statusCode(StatusCode.InternalServerError).and(jsonBody[InternalServerError]))
  )

  val authHeader: EndpointIO.Header[String] = header[String](HeaderNames.Authorization)
