package com.softwaremill.realworld.articles

import com.softwaremill.realworld.common.*
import com.softwaremill.realworld.db.{Db, DbConfig}
import io.getquill.SnakeCase
import sttp.model.StatusCode
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import sttp.tapir.{EndpointInput, PublicEndpoint, Validator}
import zio.{Cause, Exit, ZIO, ZLayer}

import javax.sql.DataSource

class ArticlesEndpoints(articlesService: ArticlesService, base: BaseEndpoints):

  val listArticles: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "articles")
    .in(
      filterParam("tag", ArticlesFilters.Tag)
        .and(filterParam("author", ArticlesFilters.Author))
        .and(filterParam("favorited", ArticlesFilters.Favorited))
        .map((tf, af, ff) => List(tf, af, ff))(m => (m(0), m(1), m(2)))
    )
    .in(
      query[Int]("limit")
        .default(20)
        .validate(Validator.positive)
        .and(
          query[Int]("offset")
            .default(0)
            .validate(Validator.positiveOrZero)
        )
        .mapTo[Pagination]
    )
    .out(jsonBody[List[Article]])
    .serverLogic(session =>
      (filters, pagination) =>
        articlesService
          .list(filters.flatten.toMap, pagination)
          .logError
          .mapError(_ => InternalServerError())
    )

  val getArticle: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "articles" / path[String]("slug"))
    .out(jsonBody[Article])
    .serverLogic(session =>
      slug =>
        articlesService.find(slug).logError.mapError {
          case e: Exceptions.NotFound => NotFound(e.message)
          case _                      => InternalServerError()
        }
    )

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(listArticles, getArticle)

  private def filterParam(name: String, key: ArticlesFilters): EndpointInput.Query[Option[(ArticlesFilters, String)]] = {
    query[Option[String]](name)
      .validateOption(Validator.pattern("\\w+"))
      .validateOption(Validator.nonEmptyString)
      .validateOption(Validator.maxLength(100))
      .map(_.map(v => (key, v)))(_.map((_, v) => v))
  }

object ArticlesEndpoints:

  val live: ZLayer[ArticlesService with BaseEndpoints, Nothing, ArticlesEndpoints] = ZLayer.fromFunction(new ArticlesEndpoints(_, _))
