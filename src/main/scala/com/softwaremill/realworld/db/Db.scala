package com.softwaremill.realworld.db

import com.zaxxer.hikari.{HikariConfig, HikariDataSource}
import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import zio.{ZIO, ZLayer}

import java.io.Closeable
import javax.sql.DataSource

object Db:

  private def create(dbConfig: DbConfig): HikariDataSource = {
    val poolConfig = new HikariConfig()
    poolConfig.setJdbcUrl(dbConfig.jdbcUrl)
    poolConfig.setConnectionInitSql(dbConfig.connectionInitSql)
    new HikariDataSource(poolConfig)
  }

  // Used for migration and executing queries.
  val dataSourceLive: ZLayer[DbConfig, Nothing, DataSource] =
    ZLayer
      .service[DbConfig]
      .flatMap { env =>
        val dbConfig = env.get
        ZLayer.scoped {
          ZIO.fromAutoCloseable(ZIO.succeed(create(dbConfig)))
        }
      }

  // Quill framework object used for specifying sql queries.
  def quillLive: ZLayer[Any, Nothing, SqliteZioJdbcContext[SnakeCase]] = ZLayer.succeed(new SqliteZioJdbcContext[SnakeCase](SnakeCase))
