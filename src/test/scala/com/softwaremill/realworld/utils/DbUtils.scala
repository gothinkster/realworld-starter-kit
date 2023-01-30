package com.softwaremill.realworld.utils

import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import zio.test.TestRandom
import zio.{RIO, Random, Task, UIO, ZIO, ZLayer}

import java.nio.file.{Files, Path, Paths}
import java.sql.{Connection, Statement}
import scala.io.Source
import scala.util.{Try, Using}
import javax.sql.DataSource

object DbUtils:

  type TestDbLayer = DbConfig with DataSource with DbMigrator

  def withEmptyDb(): RIO[TestDbLayer, Any] = for {
    migrator <- ZIO.service[DbMigrator]
    _ <- migrator.migrate()
  } yield ()

  def withFixture(fixturePath: String): RIO[TestDbLayer, Any] = for {
    migrator <- ZIO.service[DbMigrator]
    _ <- migrator.migrate()
    _ <- loadFixture(fixturePath)
  } yield ()

  def clearDb: RIO[TestDbLayer, Any] = for {
    cfg <- ZIO.service[DbConfig]
  } yield {
    Files.deleteIfExists(Paths.get(cfg.dbPath))
  }

  private def loadFixture(fixturePath: String): RIO[DataSource, Unit] = for {
    ds <- ZIO.service[DataSource]
  } yield {
    val queries = Source
      .fromResource(fixturePath)
      .mkString
      .split(";")
      .map(_.strip())
      .filter(_.nonEmpty)
    Using.Manager { use =>
      val conn: Connection = use(ds.getConnection)
      val st: Statement = use(conn.createStatement())
      queries.foreach(st.execute)
    }
  }

  private def createTestDbConfig(): ZIO[Random, Nothing, DbConfig] = for {
    _ <- TestRandom.setSeed(System.nanoTime())
    r <- ZIO.random
    uuid <- r.nextUUID
  } yield DbConfig(s"/tmp/realworld-test-$uuid.sqlite")

  private val testDbConfigLive: ZLayer[Any, Nothing, DbConfig] = ZLayer.fromZIO(createTestDbConfig().provide(ZLayer.fromZIO(ZIO.random)))

  val testDbConfigLayer: ZLayer[Any, Nothing, TestDbLayer] =
    (testDbConfigLive >>> Db.dataSourceLive >>> DbMigrator.live)
      ++ (testDbConfigLive >>> Db.dataSourceLive)
      ++ testDbConfigLive
