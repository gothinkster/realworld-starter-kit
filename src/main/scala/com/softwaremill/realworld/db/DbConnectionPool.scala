package com.softwaremill.realworld.db

import com.zaxxer.hikari.{HikariConfig, HikariDataSource}
import zio.ZLayer

import java.sql.Connection
import javax.sql.DataSource
import scala.util.Try

class DbConnectionPool(ds: HikariDataSource) {

  def getConnection(): Try[Connection] = Try(ds.getConnection)

  private[db] def getDataSource(): DataSource = ds
}

object DbConnectionPool {

  private def create(dbConfig: DbConfig): DbConnectionPool = {
    val poolConfig = new HikariConfig()
    poolConfig.setJdbcUrl(dbConfig.jdbcUrl)
    new DbConnectionPool(new HikariDataSource(poolConfig))
  }

  val live: ZLayer[DbConfig, Nothing, DbConnectionPool] = ZLayer.fromFunction(create(_))
}
