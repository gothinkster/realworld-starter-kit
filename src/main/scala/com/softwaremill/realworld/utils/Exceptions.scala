package com.softwaremill.realworld.utils

object Exceptions:

  case class NotFound(message: String) extends RuntimeException(message)

  case class DbMigrationFailed(msg: String, stackTrace: String) extends RuntimeException(s"$msg\n$stackTrace")
