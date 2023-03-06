package com.softwaremill.realworld.users

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
import zio.{Cause, Console, Exit, ZIO, ZLayer}

import javax.sql.DataSource

class UsersEndpoints(usersService: UsersService, base: BaseEndpoints):

  import UsersEndpoints.given

  val get: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "user")
    .out(jsonBody[User])
    .serverLogic(session =>
      _ =>
        usersService
          .findById(session.id)
          .logError
          .mapError {
            case _: Exceptions.NotFound => NotFound()
            case _                      => InternalServerError()
          }
          .map(User.apply)
    )

  val post: ZServerEndpoint[Any, Any] = base.publicEndpoint.post
    .in("api" / "users")
    .in(jsonBody[UserRegister])
    .out(jsonBody[User])
    .zServerLogic(data =>
      usersService
        .registerNewUser(data.user)
        .logError
        .mapError {
          case _: Exceptions.Conflict => Conflict()
          case _                      => InternalServerError()
        }
    )

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(get, post)

object UsersEndpoints:

  given userEncoder: zio.json.JsonEncoder[User] = DeriveJsonEncoder.gen[User]

  given userDecoder: zio.json.JsonDecoder[User] = DeriveJsonDecoder.gen[User]

  given userDataEncoder: zio.json.JsonEncoder[UserData] = DeriveJsonEncoder.gen[UserData]

  given userDataDecoder: zio.json.JsonDecoder[UserData] = DeriveJsonDecoder.gen[UserData]

  given userRegisterRequestBodyEncoder: zio.json.JsonEncoder[UserRegister] = DeriveJsonEncoder.gen[UserRegister]

  given userRegisterRequestBodyDecoder: zio.json.JsonDecoder[UserRegister] = DeriveJsonDecoder.gen[UserRegister]

  given userRegisterDataEncoder: zio.json.JsonEncoder[UserRegisterData] = DeriveJsonEncoder.gen[UserRegisterData]

  given userRegisterDataDecoder: zio.json.JsonDecoder[UserRegisterData] = DeriveJsonDecoder.gen[UserRegisterData]

  val live: ZLayer[UsersService with BaseEndpoints, Nothing, UsersEndpoints] = ZLayer.fromFunction(new UsersEndpoints(_, _))
