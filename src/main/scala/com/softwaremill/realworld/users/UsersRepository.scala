package com.softwaremill.realworld.users

import com.softwaremill.realworld.utils.Exceptions
import io.getquill.*
import zio.{IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*

  def findById(id: Int): IO[Exception, Option[User]] = run(for {
    usr <- querySchema[UserSessionRow](entity = "users_sessions") if usr.userId == lift(id)
    ur <- querySchema[UserRow](entity = "users") if ur.userId == lift(id)
  } yield (ur, usr.token))
    .map(_.headOption)
    .map(_.map(user))
    .provide(dsLayer)

  private def user(tuple: (UserRow, String)): User = {
    val (ur, token) = tuple
    User(
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
