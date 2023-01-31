package com.softwaremill.realworld

import utils.Exceptions
import sttp.model.StatusCode
import sttp.monad.MonadError
import sttp.tapir.server.interceptor.exception.{ExceptionContext, ExceptionHandler}
import sttp.tapir.server.model.ValuedEndpointOutput
import sttp.tapir.{statusCode, stringBody}
import zio.{Cause, ZIO}

class GlobalLoggingDefectHandler[F[_]] extends ExceptionHandler[F]:
  override def apply(ctx: ExceptionContext)(implicit monad: MonadError[F]): F[Option[ValuedEndpointOutput[_]]] =
    monad.unit({
      ZIO.logErrorCause(Cause.fail(ctx.e))
      val response = ctx.e match {
        case Exceptions.NotFound(msg) => (StatusCode.NotFound, msg)
        case _                        => (StatusCode.InternalServerError, "Internal server error")
      }
      Some(ValuedEndpointOutput(statusCode.and(stringBody), response))
    })
