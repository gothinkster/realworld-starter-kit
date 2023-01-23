package com.softwaremill.realworld

import com.softwaremill.realworld.articles.ArticlesEndpoints
import sttp.tapir.server.interceptor.log.DefaultServerLog
import sttp.tapir.server.ziohttp.{ZioHttpInterpreter, ZioHttpServerOptions}
import zio.Cause.Die
import zio.http.{HttpApp, Server, ServerConfig}
import zio.{Cause, Console, ExitCode, Scope, StackTrace, Task, ZIO, ZIOAppArgs, ZIOAppDefault}

object Main extends ZIOAppDefault:
  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    val serverOptions: ZioHttpServerOptions[Any] =
      ZioHttpServerOptions.customiseInterceptors
        .serverLog(
          DefaultServerLog[Task](
            doLogWhenReceived = msg => ZIO.debug(msg),
            doLogWhenHandled = (msg, error) => error.fold(ZIO.debug(msg))(err => ZIO.logErrorCause(msg, Die(err, StackTrace.none))),
            doLogAllDecodeFailures = (msg, error) => error.fold(ZIO.debug(msg))(err => ZIO.logErrorCause(msg, Die(err, StackTrace.none))),
            doLogExceptions = (msg: String, ex: Throwable) => ZIO.logErrorCause(msg, Die(ex, StackTrace.none)),
            noLog = ZIO.unit
          )
        )
        .options
    val app: HttpApp[Any, Throwable] = ZioHttpInterpreter(serverOptions).toHttp(Endpoints.endpoints)

    val port = sys.env.get("HTTP_PORT").flatMap(_.toIntOption).getOrElse(8080)

    (
      for
        actualPort <- Server.install(app)
        _ <- Console.printLine(s"Go to http://localhost:${actualPort}/docs to open SwaggerUI. Press ENTER key to exit.")
        _ <- Console.readLine
      yield ()
    ).provide(
      ServerConfig.live(ServerConfig.default.port(port)),
      Server.live
    ).exitCode
