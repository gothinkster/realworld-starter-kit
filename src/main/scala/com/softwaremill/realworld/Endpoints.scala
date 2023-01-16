package com.softwaremill.realworld

import com.softwaremill.realworld.articles.ArticlesEndpoints
import sttp.tapir.*
import sttp.tapir.Codec.JsonCodec
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.*
import sttp.tapir.ztapir.ZServerEndpoint
import zio.ZIO
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

// TODO add authentication
// TODO format errors properly
object Endpoints:
  case class User(name: String) extends AnyVal

  private val helloEndpoint: PublicEndpoint[User, Unit, String, Any] = endpoint.get
    .in("hello")
    .in(query[User]("name"))
    .out(stringBody)
  val helloServerEndpoint: ZServerEndpoint[Any, Any] = helloEndpoint.serverLogicSuccess(user => ZIO.succeed(s"Hello ${user.name}"))

  val all: List[ZServerEndpoint[Any, Any]] = List(ArticlesEndpoints.endpoints, List(helloServerEndpoint)).flatten
