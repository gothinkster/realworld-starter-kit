package com.softwaremill.realworld.articles

import com.softwaremill.realworld.db.DbContext
import com.softwaremill.realworld.utils.Exceptions
import io.getquill.SnakeCase
import sttp.tapir.PublicEndpoint
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Exit, ZIO, ZLayer}

import javax.sql.DataSource

object ArticlesEndpoints:

  given articleAuthorEncoder: zio.json.JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]
  given articleAuthorDecoder: zio.json.JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]
  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]

  val articlesLayer: ZLayer[Any, Nothing, ArticlesService with DataSource] =
    (DbContext.live >>> ArticlesRepository.live >>> ArticlesService.live) ++ DbContext.dbLayer

  // TODO add filtering
  // TODO add pagination
  val list: ZServerEndpoint[DataSource with ArticlesService, Any] = endpoint.get
    .in("api" / "articles")
    .out(jsonBody[List[Article]])
    // TODO return proper status codes
    // TODO format errors as json
    .errorOut(stringBody)
    .zServerLogic { _ =>
      ZIO
        .service[ArticlesService]
        .flatMap(_.list())
        .logError
        .mapError(_ => "Internal error occurred.")
    }

  val get: ZServerEndpoint[DataSource with ArticlesService, Any] = endpoint.get
    .in("api" / "articles" / path[String]("slug"))
    .out(jsonBody[Article])
    // TODO return proper status codes
    // TODO format errors as json
    .errorOut(stringBody)
    .zServerLogic { slug =>
      ZIO
        .service[ArticlesService]
        .flatMap(_.find(slug))
        .logError
        .mapError {
          case Exceptions.NotFound(msg) => msg
          case _                        => "Internal error occurred."
        }
    }

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(list, get)
    .map(_.asInstanceOf[ZServerEndpoint[Any, Any]])
