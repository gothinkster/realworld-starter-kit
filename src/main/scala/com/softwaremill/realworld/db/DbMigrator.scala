package com.softwaremill.realworld.db

import io.getquill.SnakeCase
import org.flywaydb.core.Flyway
import org.flywaydb.core.api.output.{MigrateErrorResult, MigrateOutput, MigrateResult}
import zio.{Task, ZIO, ZLayer}
import javax.sql.DataSource

import scala.util.Try

class DbMigrator(ds: DataSource) {

  def migrate(): Task[Unit] = {
    ZIO
      .fromTry(
        Try(
          Flyway
            .configure()
            .dataSource(ds)
            .load()
            .migrate()
        )
      )
      .flatMap(mr =>
        mr match
          case r: MigrateErrorResult => ZIO.fail(DbMigrationFailed(r.error.message, r.error.stackTrace))
          case _                     => ZIO.succeed(())
      )
      .onError(cause => ZIO.logErrorCause("Database migration has failed", cause))
  }

}

class DbMigrationFailed(msg: String, stackTrace: String) extends RuntimeException(s"$msg\n$stackTrace")

object DbMigrator {

  val migratorLayer = ZLayer.make[DbMigrator](DbMigrator.live, DbConnectionPool.live, DbConfig.live)
  def live: ZLayer[DataSource, Nothing, DbMigrator] = ZLayer.fromFunction(DbMigrator(_))
}
