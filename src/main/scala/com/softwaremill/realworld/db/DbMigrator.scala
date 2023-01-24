package com.softwaremill.realworld.db

import org.flywaydb.core.Flyway
import org.flywaydb.core.api.output.{MigrateErrorResult, MigrateOutput, MigrateResult}
import zio.{Task, ZIO, ZLayer}

import scala.util.Try

class DbMigrator(cp: DbConnectionPool) {

  def migrate(): Task[Unit] = {
    ZIO.fromTry(Try(
      Flyway
        .configure()
        .dataSource(cp.getDataSource())
        .load()
        .migrate()))
      .flatMap(mr => mr match
        case r: MigrateErrorResult => ZIO.fail(DbMigrationFailed(r.error.message, r.error.stackTrace))
        case _ => ZIO.succeed(()))
      .onError(cause => ZIO.logErrorCause("Database migration has failed", cause))
  }

}

class DbMigrationFailed(msg: String, stackTrace: String) extends RuntimeException(s"$msg\n$stackTrace")

object DbMigrator {

  def live: ZLayer[DbConnectionPool, Nothing, DbMigrator] = ZLayer.fromFunction(DbMigrator(_))
}
