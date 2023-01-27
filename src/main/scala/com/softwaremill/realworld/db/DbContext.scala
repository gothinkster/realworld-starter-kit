package com.softwaremill.realworld.db

import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import zio.{Trace, ZLayer}
import zio.ZLayer.FunctionConstructor

import javax.sql.DataSource

object DbContext:

  val dbLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.make[DataSource](DbDataSource.live, DbConfig.live)

  def live: ZLayer[Any, Nothing, SqliteZioJdbcContext[SnakeCase]] = ZLayer.succeed(new SqliteZioJdbcContext[SnakeCase](SnakeCase))
