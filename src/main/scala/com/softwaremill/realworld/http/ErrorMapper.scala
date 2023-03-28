package com.softwaremill.realworld.http

import com.softwaremill.realworld.common.*
import zio.IO

object ErrorMapper:

  def defaultErrorsMappings[E <: Throwable, A](io: IO[E, A]): IO[ErrorInfo, A] = io.mapError {
    case e: Exceptions.AlreadyInUse => Conflict(e.message)
    case e: Exceptions.NotFound     => NotFound(e.message)
    case e: Exceptions.BadRequest   => BadRequest(e.message)
    case e: Exceptions.Unauthorized => Unauthorized(e.message)
    case _                          => InternalServerError()
  }
