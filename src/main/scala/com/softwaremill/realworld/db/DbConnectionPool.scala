package com.softwaremill.realworld.db

import com.zaxxer.hikari.{HikariConfig, HikariDataSource}
import zio.ZLayer

import java.sql.Connection
import javax.sql.DataSource
import scala.util.Try

object DbConnectionPool {

  private def create(dbConfig: DbConfig): HikariDataSource = {
    val poolConfig = new HikariConfig()
    poolConfig.setJdbcUrl(dbConfig.jdbcUrl)
    new HikariDataSource(poolConfig)
  }

  val live: ZLayer[DbConfig, Nothing, HikariDataSource] = ZLayer.fromFunction(create(_))

}
