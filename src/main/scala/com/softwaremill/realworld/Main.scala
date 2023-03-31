package com.softwaremill.realworld

import com.softwaremill.realworld.articles.{ArticlesEndpoints, ArticlesRepository, ArticlesService}
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.{AppConfig, BaseEndpoints, Configuration, Exceptions}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.profiles.{ProfilesEndpoints, ProfilesService, ProfilesRepository}
import com.softwaremill.realworld.users.{UsersEndpoints, UsersRepository, UsersService}
import sttp.model.StatusCode
import sttp.tapir.DecodeResult
import sttp.tapir.server.interceptor.decodefailure.DefaultDecodeFailureHandler
import sttp.tapir.server.interceptor.exception.ExceptionHandler
import sttp.tapir.server.interceptor.log.DefaultServerLog
import sttp.tapir.server.ziohttp
import sttp.tapir.server.ziohttp.{ZioHttpInterpreter, ZioHttpServerOptions}
import zio.*
import zio.Cause.Die
import zio.http.*
import zio.http.Server.ErrorCallback
import zio.http.logging.Logger
import zio.http.netty.server.NettyDriver
import zio.http.service.Logging
import zio.logging.LogFormat
import zio.logging.backend.SLF4J

object Main extends ZIOAppDefault:

  override val bootstrap: ZLayer[ZIOAppArgs, Any, Any] = SLF4J.slf4j(LogFormat.colored)

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =

    val port = sys.env.get("HTTP_PORT").flatMap(_.toIntOption).getOrElse(8080)
    val options: ZioHttpServerOptions[Any] = ZioHttpServerOptions.customiseInterceptors
      .exceptionHandler(new DefectHandler())
      .decodeFailureHandler(CustomDecodeFailureHandler.create())
      .options

    (for
      migrator <- ZIO.service[DbMigrator]
      _ <- migrator.migrate()
      endpoints <- ZIO.service[Endpoints]
      actualPort <- Server.install(ZioHttpInterpreter(options).toApp(endpoints.endpoints))
      _ <- Console.printLine(s"Application realworld-tapir-zio started")
      _ <- Console.printLine(s"Go to http://localhost:$actualPort/docs to open SwaggerUI")
      _ <- ZIO.never
    yield ())
      .provide(
        Configuration.live,
        DbConfig.live,
        Db.dataSourceLive,
        Db.quillLive,
        DbMigrator.live,
        Endpoints.live,
        AuthService.live,
        UsersEndpoints.live,
        UsersService.live,
        UsersRepository.live,
        ArticlesEndpoints.live,
        ArticlesService.live,
        ArticlesRepository.live,
        BaseEndpoints.live,
        ProfilesEndpoints.live,
        ProfilesService.live,
        ProfilesRepository.live,
        ServerConfig.live(ServerConfig.default.port(port)),
        Server.live
      )
      .exitCode
