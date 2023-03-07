package com.softwaremill.realworld.users

import com.softwaremill.realworld.utils.Exceptions
import io.getquill.*
import zio.{Console, IO, UIO, ZIO, ZLayer}

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
    usr <- querySchema[UserSessionRow](entity = "users_sessions").leftJoin(_.userId == ur.userId)
  } yield (ur, usr.map(_.token).getOrElse(""))) // TODO token will be removed
    .map(_.headOption)
    .map(_.map(user))
    .provide(dsLayer)

  def add(user: UserRegisterData): IO[Exception, Unit] = run(
    quote(
      querySchema[UserRow](entity = "users")
        .insert(
          _.email -> lift(user.email),
          _.username -> lift(user.username),
          _.bio -> lift(user.password) // TODO it must be changed from bio which is just an example to the encoded password column later
        )
    )
  ).unit
    .provide(dsLayer)

  private def user(tuple: (UserRow, String)): UserData = {
    val (ur, token) = tuple
    UserData(
      ur.email,
      token,
      ur.username,
      Some(ur.bio),
      Some(ur.image)
    )
  }

object UsersRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource with UserSessionRepository, Nothing, UsersRepository] =
    ZLayer.fromFunction(new UsersRepository(_, _))
