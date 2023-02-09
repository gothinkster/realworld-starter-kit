package com.softwaremill.realworld.auth

import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import zio.{RIO, UIO, ZLayer}

import javax.sql.DataSource
import io.getquill.*

class UserSessionRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill._
  def getUserSession(token: String): UIO[Option[UserSession]] = run(for {
    usr <- querySchema[UserSessionRow](entity = "users_sessions") if usr.token == lift(token)
  } yield UserSession(usr.userId, usr.lastUsed)).orDie
    .map(_.headOption)
    .provide(dsLayer)

object UserSessionRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, UserSessionRepository] =
    ZLayer.fromFunction(new UserSessionRepository(_, _))
