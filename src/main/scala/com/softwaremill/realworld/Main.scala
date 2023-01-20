package com.softwaremill.realworld

import com.softwaremill.realworld.articles.ArticlesEndpoints
import org.slf4j.LoggerFactory
import sttp.tapir.server.interceptor.log.DefaultServerLog
import sttp.tapir.server.ziohttp.{ZioHttpInterpreter, ZioHttpServerOptions}
import zio.http.{HttpApp, Server, ServerConfig}
import zio.{Console, ExitCode, Scope, Task, ZIO, ZIOAppArgs, ZIOAppDefault}

object Main extends ZIOAppDefault:
  private val log = LoggerFactory.getLogger(ZioHttpInterpreter.getClass.getName)

  override def run: ZIO[Any with ZIOAppArgs with Scope, Any, Any] =
    val serverOptions: ZioHttpServerOptions[Any] =
      ZioHttpServerOptions.customiseInterceptors
        .serverLog(
          DefaultServerLog[Task](
            doLogWhenReceived = msg => ZIO.succeed(log.debug(msg)),
            doLogWhenHandled = (msg, error) => ZIO.succeed(error.fold(log.debug(msg))(err => log.debug(msg, err))),
            doLogAllDecodeFailures = (msg, error) => ZIO.succeed(error.fold(log.debug(msg))(err => log.debug(msg, err))),
            doLogExceptions = (msg: String, ex: Throwable) => ZIO.succeed(log.debug(msg, ex)),
            noLog = ZIO.unit
          )
        )
        .options
    val app: HttpApp[Any, Throwable] = ZioHttpInterpreter(serverOptions).toHttp(ArticlesEndpoints.endpoints)

    val port = sys.env.get("HTTP_PORT").flatMap(_.toIntOption).getOrElse(8080)

    (
      for
        actualPort <- Server.install(app)
        _ <- Console.printLine(s"Server started at http://localhost:${actualPort}. Press ENTER key to exit.")
        _ <- Console.readLine
      yield ()
    ).provide(
      ServerConfig.live(ServerConfig.default.port(port)),
      Server.live
    ).exitCode
