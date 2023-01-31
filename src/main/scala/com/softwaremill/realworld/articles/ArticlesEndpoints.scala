package com.softwaremill.realworld.articles

import com.softwaremill.realworld.db.{Db, DbConfig}
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

class ArticlesEndpoints(articlesService: ArticlesService):

  import ArticlesEndpoints.given

  // TODO add filtering
  // TODO add pagination
  val list: ZServerEndpoint[Any, Any] = endpoint.get
    .in("api" / "articles")
    .out(jsonBody[List[Article]])
    // TODO format errors as json
    .errorOut(stringBody)
    .zServerLogic(_ => articlesService.list())

  val get: ZServerEndpoint[Any, Any] = endpoint.get
    .in("api" / "articles" / path[String]("slug"))
    .out(jsonBody[Article])
    // TODO format errors as json
    .errorOut(stringBody)
    .zServerLogic(articlesService.find)

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(list, get)

object ArticlesEndpoints:

  given articleAuthorEncoder: zio.json.JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]

  given articleAuthorDecoder: zio.json.JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]

  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]

  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]

  val live: ZLayer[ArticlesService, Nothing, ArticlesEndpoints] = ZLayer.fromFunction(new ArticlesEndpoints(_))
