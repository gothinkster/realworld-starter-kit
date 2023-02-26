package com.softwaremill.realworld.users

import io.getquill.*
import zio.{IO, RIO, UIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UserSessionRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*

  def getUserSession(token: String): IO[SQLException, Option[UserSession]] = run(for {
    usr <- querySchema[UserSessionRow](entity = "users_sessions") if usr.token == lift(token)
  } yield UserSession(usr.userId, usr.lastUsed))
    .map(_.headOption)
    .provide(dsLayer)

object UserSessionRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, UserSessionRepository] =
    ZLayer.fromFunction(new UserSessionRepository(_, _))
