package com.softwaremill.realworld.db

import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import zio.{Trace, ZLayer}
import zio.ZLayer.FunctionConstructor

import javax.sql.DataSource

object DbContext {
  def live: ZLayer[Any, Nothing, SqliteZioJdbcContext[SnakeCase]] = ZLayer.succeed(new SqliteZioJdbcContext[SnakeCase](SnakeCase))
}
