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
    ZLayer.scoped {
      ZIO.fromAutoCloseable {
        for {
          dbConfig <- ZIO.service[DbConfig]
          dataSource <- ZIO.succeed(create(dbConfig))
        } yield dataSource
      }
    }

  // Quill framework object used for specifying sql queries.
  val quillLive: ZLayer[Any, Nothing, SqliteZioJdbcContext[SnakeCase]] =
    ZLayer.scoped {
      ZIO.fromAutoCloseable {
        ZIO.succeed(new SqliteZioJdbcContext(SnakeCase))
      }
    }
