package com.softwaremill.realworld.users

import com.softwaremill.realworld.common.*
import com.softwaremill.realworld.db.{Db, DbConfig}
import com.softwaremill.realworld.http.ErrorMapper.defaultErrorsMappings
import io.getquill.SnakeCase
import sttp.model.StatusCode
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import sttp.tapir.{EndpointInput, PublicEndpoint, Validator}
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Console, Exit, ZIO, ZLayer}

import javax.sql.DataSource
import scala.util.chaining.*

class UsersEndpoints(usersService: UsersService, base: BaseEndpoints):

  val getCurrentUser: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "user")
    .out(jsonBody[User])
    .serverLogic(session =>
      _ =>
        usersService
          .get(session.email)
          .logError
          .mapError {
            case e: Exceptions.NotFound => NotFound(e.message)
            case _                      => InternalServerError()
          }
          .map(User.apply)
    )

  val register: ZServerEndpoint[Any, Any] = base.publicEndpoint.post
    .in("api" / "users")
    .in(jsonBody[UserRegister])
    .out(jsonBody[User])
    .zServerLogic(data =>
      usersService
        .register(data.user)
        .logError
        .pipe(defaultErrorsMappings)
    )

  val update: ZServerEndpoint[Any, Any] = base.secureEndpoint.put
    .in("api" / "user")
    .in(jsonBody[UserUpdate])
    .out(jsonBody[User])
    .serverLogic(session =>
      data =>
        usersService
          .update(data.user, session.email)
          .logError
          .pipe(defaultErrorsMappings)
          .map(User.apply)
    )

  val login: ZServerEndpoint[Any, Any] = base.publicEndpoint.post
    .in("api" / "users" / "login")
    .in(jsonBody[UserLogin])
    .out(jsonBody[User])
    .zServerLogic(data =>
      usersService
        .login(data.user)
        .logError
        .pipe(defaultErrorsMappings)
        .map(User.apply)
    )

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(getCurrentUser, register, update, login)

object UsersEndpoints:
  val live: ZLayer[UsersService with BaseEndpoints, Nothing, UsersEndpoints] = ZLayer.fromFunction(new UsersEndpoints(_, _))
