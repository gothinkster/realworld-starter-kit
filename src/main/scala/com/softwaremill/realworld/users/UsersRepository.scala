package com.softwaremill.realworld.users

import com.softwaremill.realworld.utils.Exceptions
import io.getquill.*
import zio.{IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*

  def findById(id: Int): IO[Exception, Option[UserData]] = run(for {
    usr <- querySchema[UserSessionRow](entity = "users_sessions") if usr.userId == lift(id)
    ur <- querySchema[UserRow](entity = "users") if ur.userId == lift(id)
  } yield (ur, usr.token))
    .map(_.headOption)
    .map(_.map(user))
    .provide(dsLayer)

  def findByEmail(email: String): IO[Exception, Option[UserData]] = run(for {
    ur <- querySchema[UserRow](entity = "users") if ur.email == lift(email)
    usr <- querySchema[UserSessionRow](entity = "users_sessions") if usr.userId == ur.userId
  } yield (ur, usr.token))
    .map(_.headOption)
    .map(_.map(user))
    .provide(dsLayer)

  def add(user: UserRegisterData): IO[Exception, UserData] = run(
    quote(
      querySchema[UserRow](entity = "users")
        .insertValue(
          lift(
            UserRow(
              0,
              user.email,
              user.username,
              user.password,
              ""
            )
          )
        )
        .returningGenerated(_.userId)
    )
  )
    .flatMap(findById)
    .flatMap {
      case Some(user) => ZIO.succeed(user)
      case _          => ZIO.fail(Exceptions.Conflict(s"Could not create user account."))
    }
    .provide(dsLayer)

  private def user(tuple: (UserRow, String)): UserData = {
    val (ur, token) = tuple
    UserData(
      ur.email,
      token,
      ur.username,
      ur.bio,
      ur.image
    )
  }

object UsersRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource with UserSessionRepository, Nothing, UsersRepository] =
    ZLayer.fromFunction(new UsersRepository(_, _))
