package com.softwaremill.realworld

import com.softwaremill.realworld.articles.{ArticlesEndpoints, ArticlesRepository, ArticlesService}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.utils.Exceptions
import sttp.model.StatusCode
import sttp.tapir.server.interceptor.exception.ExceptionHandler
import sttp.tapir.server.interceptor.log.DefaultServerLog
import sttp.tapir.server.ziohttp
import sttp.tapir.server.ziohttp.{ZioHttpInterpreter, ZioHttpServerOptions}
import zio.Cause.Die
import zio.http.Server.ErrorCallback
import zio.http.logging.Logger
import zio.http.netty.server.NettyDriver
import zio.http.service.Logging
import zio.http.{ClientConfig, ClientDriver, Driver, HttpApp, Server, ServerConfig}
import zio.logging.LogFormat
import zio.logging.backend.SLF4J
import zio.*

object Main extends ZIOAppDefault:

  override val bootstrap: ZLayer[ZIOAppArgs, Any, Any] = SLF4J.slf4j(LogFormat.colored)

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =

    val port = sys.env.get("HTTP_PORT").flatMap(_.toIntOption).getOrElse(8080)
    val options: ZioHttpServerOptions[Any] = ZioHttpServerOptions.customiseInterceptors
      .exceptionHandler(new GlobalDefectHandler())
      .options

    (for
      migrator <- ZIO.service[DbMigrator]
      _ <- migrator.migrate()
      endpoints <- ZIO.service[Endpoints]
      actualPort <- Server.install(ZioHttpInterpreter(options).toApp(endpoints.endpoints))
      _ <- Console.printLine(s"Go to http://localhost:$actualPort/docs to open SwaggerUI. Press ENTER key to exit.")
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
