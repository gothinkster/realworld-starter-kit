package com.softwaremill.realworld.users

import com.softwaremill.realworld.common.Exceptions
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

  def findUserWithPasswordByEmail(email: String): IO[Exception, Option[UserWithPassword]] = run(for {
    ur <- querySchema[UserRow](entity = "users") if ur.email == lift(email)
  } yield ur)
    .map(_.headOption)
    .map(_.map(userWithPassword))
    .provide(dsLayer)

  def addUser(user: UserRegisterData): IO[Exception, Unit] = run(
    quote(
      querySchema[UserRow](entity = "users")
        .insert(
          _.email -> lift(user.email),
          _.username -> lift(user.username),
          _.password -> lift(user.password)
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

  private def userWithPassword(userRow: UserRow): UserWithPassword = {
    UserWithPassword(
      UserData(
        userRow.email,
        "to be removed",
        userRow.username,
        None,
        None // TODO Some(null) returned by repository and app crashes
//        Some(userRow.bio),
//        Some(userRow.image)
      ),
      userRow.password
    )
  }

object UsersRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource with UserSessionRepository, Nothing, UsersRepository] =
    ZLayer.fromFunction(new UsersRepository(_, _))
