package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfilesRepository
import sttp.tapir.PublicEndpoint
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Exit, ZIO, ZLayer}

object ArticlesEndpoints:

  given articleAuthorEncoder: zio.json.JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]
  given articleAuthorDecoder: zio.json.JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]
  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]

  private val deps = ZLayer.make[ArticlesService](ArticlesService.live, ArticlesRepository.live, ProfilesRepository.live)

  // TODO add filtering
  // TODO add pagination
  private val list: PublicEndpoint[Unit, String, List[Article], Any] = endpoint.get
    .in("api" / "articles")
    .out(jsonBody[List[Article]])
    .errorOut(stringBody)

  val listEndpoint: ZServerEndpoint[Any, Any] = list.serverLogic { _ =>
    ZIO
      .service[ArticlesService]
      .flatMap(as => as.list())
      .foldZIO(fail => ZIO.succeed(Left(fail)), success => ZIO.succeed(Right(success)))
      .provideLayer(deps)
  }

  private val get: PublicEndpoint[String, String, Article, Any] = endpoint.get
    .in("api" / "articles" / path[String]("slug"))
    .out(jsonBody[Article])
    .errorOut(stringBody)

  val getEndpoint: ZServerEndpoint[Any, Any] = get.serverLogic { slug =>
    ZIO
      .service[ArticlesService]
      .flatMap(as => as.find(slug))
      .foldZIO(fail => ZIO.succeed(Left(fail)), success => ZIO.succeed(Right(success)))
      .provideLayer(deps)
  }

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(listEndpoint, getEndpoint)
