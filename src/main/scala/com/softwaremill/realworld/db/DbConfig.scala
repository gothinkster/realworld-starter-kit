package com.softwaremill.realworld.db

import com.softwaremill.realworld.articles.ArticlesRepository
import zio.ZLayer

class DbConfig(val dbPath: String):

  val jdbcUrl = s"jdbc:sqlite:$dbPath"

object DbConfig:

  val live: ZLayer[Any, Nothing, DbConfig] =
    ZLayer.succeed(DbConfig(sys.env.getOrElse("JDBC_URL", "realworld-prod.sqlite")))
