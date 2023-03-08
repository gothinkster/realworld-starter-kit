package com.softwaremill.realworld.users

import com.softwaremill.realworld.common.*
import com.softwaremill.realworld.db.{Db, DbConfig}
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

class UsersEndpoints(usersService: UsersService, base: BaseEndpoints):

  import UsersSerialization.given

  val getCurrentUser: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "user")
    .out(jsonBody[User])
    .serverLogic(session =>
      _ =>
        usersService
          .findById(session.id)
          .logError
          .mapError {
            case e: Exceptions.NotFound => NotFound(e.message)
            case _                      => InternalServerError()
          }
          .map(User.apply)
    )

  val userRegister: ZServerEndpoint[Any, Any] = base.publicEndpoint.post
    .in("api" / "users")
    .in(jsonBody[UserRegister])
    .out(jsonBody[User])
    .zServerLogic(data =>
      usersService
        .registerNewUser(data.user)
        .logError
        .mapError {
          case e: Exceptions.AlreadyInUse => Conflict(e.message)
          case e: Exceptions.BadRequest   => BadRequest(e.message)
          case _                          => InternalServerError()
        }
    )

  val userLogin: ZServerEndpoint[Any, Any] = base.publicEndpoint.post
    .in("api" / "users" / "login")
    .in(jsonBody[UserLogin])
    .out(jsonBody[User])
    .zServerLogic(data =>
      usersService
        .userLogin(data.user)
        .logError
        .mapError {
          case e: Exceptions.InvalidCredentials => Forbidden(e.message)
          case _                                => InternalServerError()
        }
        .map(User.apply)
    )

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(getCurrentUser, userRegister, userLogin)

object UsersEndpoints:
  val live: ZLayer[UsersService with BaseEndpoints, Nothing, UsersEndpoints] = ZLayer.fromFunction(new UsersEndpoints(_, _))
