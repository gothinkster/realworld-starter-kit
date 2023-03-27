package com.softwaremill.realworld.common

import com.auth0.jwt.JWT
import com.auth0.jwt.algorithms.Algorithm
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.TestUtils.TestDbLayer
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.{CustomDecodeFailureHandler, DefectHandler}
import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import sttp.client3.testing.SttpBackendStub
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.server.ziohttp.ZioHttpServerOptions
import sttp.tapir.ztapir.RIOMonadError
import zio.test.TestRandom
import zio.{RIO, Random, Task, UIO, ZIO, ZLayer}

import java.nio.file.{Files, Path, Paths}
import java.sql.{Connection, Statement}
import java.time.{Duration, Instant}
import java.util.UUID
import javax.sql.DataSource
import scala.io.Source
import scala.util.{Try, Using}

object TestUtils:

  def zioTapirStubInterpreter =
    TapirStubInterpreter(
      ZioHttpServerOptions.customiseInterceptors
        .exceptionHandler(new DefectHandler())
        .decodeFailureHandler(CustomDecodeFailureHandler.create()),
      SttpBackendStub(new RIOMonadError[Any])
    )

  type TestDbLayer = DbConfig with DataSource with DbMigrator with SqliteZioJdbcContext[SnakeCase]

  def validAuthorizationHeader(email: String = "admin@example.com"): Map[String, String] = {
    // start TODO [This is workaround. Need to replace below with service's function call]
    val now: Instant = Instant.now()
    val Issuer = "SoftwareMill"
    val ClaimName = "userEmail"
    val YouShouldNotKeepSecretsHardcoded = "#>!IEd!G-L70@OTr$t8E[4.#[A;zo2@{"
    val algorithm: Algorithm = Algorithm.HMAC256(YouShouldNotKeepSecretsHardcoded)
    val jwt: String = JWT
      .create()
      .withIssuer(Issuer)
      .withClaim(ClaimName, email)
      .withIssuedAt(now)
      .withExpiresAt(now.plus(Duration.ofHours(1)))
      .withJWTId(UUID.randomUUID().toString)
      .sign(algorithm)
    // end TODO
    Map("Authorization" -> ("Token " + jwt))
  }

  def withEmptyDb(): RIO[TestDbLayer, Any] = for {
    migrator <- ZIO.service[DbMigrator]
    _ <- migrator.migrate()
    _ <- loadFixture("fixtures/articles/admin.sql")
  } yield ()

  def withFixture(fixturePath: String): RIO[TestDbLayer, Any] = for {
    migrator <- ZIO.service[DbMigrator]
    _ <- migrator.migrate()
    _ <- loadFixture("fixtures/articles/admin.sql")
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
    (testDbConfigLive >+> Db.dataSourceLive >+> DbMigrator.live)
      ++ Db.quillLive
