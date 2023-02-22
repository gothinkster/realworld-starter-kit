package com.softwaremill.realworld.users

import com.softwaremill.realworld.auth.AuthService
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

import javax.sql.DataSource

class UsersEndpoints(usersService: UsersService, base: BaseEndpoints):

  import UsersEndpoints.given

  val get: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "user")
    .in(header[String]("Authorization"))
    .out(jsonBody[User])
    .serverLogic(session =>
      Authorization =>
        usersService.find(Authorization).logError.mapError {
          case _: Exceptions.NotFound => NotFound()
          case _                      => InternalServerError()
        }
    )

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(get)

object UsersEndpoints:

  given userEncoder: zio.json.JsonEncoder[User] = DeriveJsonEncoder.gen[User]

  given userDecoder: zio.json.JsonDecoder[User] = DeriveJsonDecoder.gen[User]

  val live: ZLayer[UsersService with BaseEndpoints, Nothing, UsersEndpoints] = ZLayer.fromFunction(new UsersEndpoints(_, _))
