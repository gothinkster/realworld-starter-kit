package com.softwaremill.realworld.users

import com.softwaremill.realworld.common.Exceptions
import io.getquill.*
import zio.{Console, IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*

  def findByEmail(email: String): IO[Exception, Option[UserData]] = run(for {
    ur <- querySchema[UserRow](entity = "users") if ur.email == lift(email)
  } yield ur)
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

  private def userWithPassword(userRow: UserRow): UserWithPassword = {
    UserWithPassword(
      user(userRow),
      userRow.password
    )
  }

  private def user(userRow: UserRow): UserData = {
    UserData(
      userRow.email,
      None,
      userRow.username,
      Option(userRow.bio),
      Option(userRow.image)
    )
  }

object UsersRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, UsersRepository] =
    ZLayer.fromFunction(new UsersRepository(_, _))
