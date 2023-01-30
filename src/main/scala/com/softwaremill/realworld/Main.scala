package com.softwaremill.realworld

import com.softwaremill.realworld.articles.{ArticlesEndpoints, ArticlesRepository, ArticlesService}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import sttp.tapir.server.interceptor.log.DefaultServerLog
import sttp.tapir.server.ziohttp.{ZioHttpInterpreter, ZioHttpServerOptions}
import zio.Cause.Die
import zio.http.logging.Logger
import zio.http.service.Logging
import zio.http.{HttpApp, Server, ServerConfig}
import zio.logging.LogFormat
import zio.logging.backend.SLF4J
import zio.{Cause, Console, ExitCode, LogLevel, Runtime, Scope, StackTrace, Task, ZIO, ZIOAppArgs, ZIOAppDefault, ZLayer}

object Main extends ZIOAppDefault:

  override val bootstrap: ZLayer[ZIOAppArgs, Any, Any] = SLF4J.slf4j(LogFormat.colored)

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    val port = sys.env.get("HTTP_PORT").flatMap(_.toIntOption).getOrElse(8080)

    (for
      migrator <- ZIO.service[DbMigrator]
      _ <- migrator.migrate()
      endpoints <- ZIO.service[Endpoints]
      actualPort <- Server.install(ZioHttpInterpreter().toHttp(endpoints.endpoints))
      _ <- Console.printLine(s"Go to http://localhost:${actualPort}/docs to open SwaggerUI. Press ENTER key to exit.")
      _ <- Console.readLine
    yield ())
      .provide(
        DbConfig.live,
        Db.dataSourceLive,
        Db.quillLive,
        DbMigrator.live,
        Endpoints.live,
        ArticlesEndpoints.live,
        ArticlesService.live,
        ArticlesRepository.live,
        ServerConfig.live(ServerConfig.default.port(port)),
        Server.live
      )
      .exitCode
