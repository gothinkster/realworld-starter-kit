package com.softwaremill.realworld.db

import com.zaxxer.hikari.{HikariConfig, HikariDataSource}
import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import zio.ZLayer

import javax.sql.DataSource

object Db:

  private def create(dbConfig: DbConfig): DataSource = {
    val poolConfig = new HikariConfig()
    poolConfig.setJdbcUrl(dbConfig.jdbcUrl)
    poolConfig.setConnectionInitSql(dbConfig.connectionInitSql)
    new HikariDataSource(poolConfig)
  }

  // Used for migration and executing queries.
  val dataSourceLive: ZLayer[DbConfig, Nothing, DataSource] = ZLayer.fromFunction(create(_))

  // Quill framework object used for specifying sql queries.
  def quillLive: ZLayer[Any, Nothing, SqliteZioJdbcContext[SnakeCase]] = ZLayer.succeed(new SqliteZioJdbcContext[SnakeCase](SnakeCase))
