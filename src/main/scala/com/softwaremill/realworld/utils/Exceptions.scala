package com.softwaremill.realworld.utils

object Exceptions:

  case class NotFound(message: String) extends RuntimeException(message)

  case class Conflict(message: String) extends RuntimeException(message)
