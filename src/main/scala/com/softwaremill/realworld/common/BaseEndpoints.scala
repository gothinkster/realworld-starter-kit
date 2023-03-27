package com.softwaremill.realworld.common

import com.softwaremill.realworld.articles.{ArticlesEndpoints, ArticlesService}
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.*
import com.softwaremill.realworld.common.BaseEndpoints.defaultErrorOutputs
import com.softwaremill.realworld.db.{Db, DbConfig}
import com.softwaremill.realworld.users.UserSession
import io.getquill.SnakeCase
import sttp.model.headers.WWWAuthenticateChallenge
import sttp.model.{HeaderNames, StatusCode}
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import sttp.tapir.{Endpoint, EndpointIO, EndpointInput, EndpointOutput, PublicEndpoint, Validator}
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Exit, IO, ZIO, ZLayer}

class BaseEndpoints(authService: AuthService):

  val secureEndpoint: ZPartialServerEndpoint[Any, String, UserSession, Unit, ErrorInfo, Unit, Any] = endpoint
    .errorOut(defaultErrorOutputs)
    .securityIn(auth.http[String]("Token", WWWAuthenticateChallenge("Token")))
    .zServerSecurityLogic[Any, UserSession](handleAuth)

  val publicEndpoint: PublicEndpoint[Unit, ErrorInfo, Unit, Any] = endpoint
    .errorOut(defaultErrorOutputs)

  private def handleAuth(token: String): IO[ErrorInfo, UserSession] = {
    (for {
      email <- authService.verifyJwt(token)
    } yield UserSession(email)).logError.mapError {
      case e: Exceptions.Unauthorized => Unauthorized(e.message)
      case _                          => InternalServerError()
    }
  }

object BaseEndpoints:

  val live: ZLayer[AuthService, Nothing, BaseEndpoints] = ZLayer.fromFunction(new BaseEndpoints(_))

  val defaultErrorOutputs: EndpointOutput.OneOf[ErrorInfo, ErrorInfo] = oneOf[ErrorInfo](
    oneOfVariant(statusCode(StatusCode.BadRequest).and(jsonBody[BadRequest])),
    oneOfVariant(statusCode(StatusCode.Forbidden).and(jsonBody[Forbidden])),
    oneOfVariant(statusCode(StatusCode.NotFound).and(jsonBody[NotFound])),
    oneOfVariant(statusCode(StatusCode.Conflict).and(jsonBody[Conflict])),
    oneOfVariant(statusCode(StatusCode.Unauthorized).and(jsonBody[Unauthorized])),
    oneOfVariant(statusCode(StatusCode.UnprocessableEntity).and(jsonBody[ValidationFailed])),
    oneOfVariant(statusCode(StatusCode.InternalServerError).and(jsonBody[InternalServerError]))
  )
