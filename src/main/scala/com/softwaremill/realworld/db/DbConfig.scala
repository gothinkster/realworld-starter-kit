package com.softwaremill.realworld.db

import com.softwaremill.realworld.articles.ArticlesRepository
import zio.ZLayer

class DbConfig(val jdbcUrl: String) {}

object DbConfig {

  val live: ZLayer[Any, Nothing, DbConfig] =
    ZLayer.succeed(DbConfig(sys.env.getOrElse("JDBC_URL", "jdbc:sqlite:realworld-prod.sqlite")))

}
