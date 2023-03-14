package com.softwaremill.realworld.common

import zio.config.magnolia.descriptor
import zio.config.{ReadError, read}
import zio.{Layer, ZLayer}

final case class RootConfig(
    config: AppConfig
)
final case class AppConfig(
    system: SystemConfig,
    db: DbConfig
)

final case class SystemConfig(
    jwtSecret: String
)

final case class DbConfig(
    url: String
)

object Configuration:
  import zio.config.syntax.*
  import zio.config.typesafe.*

  val live: ZLayer[Any, ReadError[String], AppConfig] =
    ZLayer.fromZIO(read(descriptor[RootConfig].from(TypesafeConfigSource.fromResourcePath)).map(_.config))
