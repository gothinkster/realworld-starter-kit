package com.softwaremill.realworld

import utils.Exceptions
import sttp.model.StatusCode
import sttp.monad.MonadError
import sttp.tapir.server.interceptor.exception.{ExceptionContext, ExceptionHandler}
import sttp.tapir.server.model.ValuedEndpointOutput
import sttp.tapir.ztapir.RIOMonadError
import sttp.tapir.{statusCode, stringBody}
import zio.{Cause, RIO, Task, ZIO}

class GlobalDefectHandler extends ExceptionHandler[Task]:

  override def apply(ctx: ExceptionContext)(implicit monad: MonadError[Task]): Task[Option[ValuedEndpointOutput[_]]] =
    monad.unit({
      val response = ctx.e match {
        case Exceptions.NotFound(_) => (StatusCode.NotFound, "Not found")
        case _                      => (StatusCode.InternalServerError, "Internal server error")
      }
      Some(ValuedEndpointOutput(statusCode.and(stringBody), response))
    })
