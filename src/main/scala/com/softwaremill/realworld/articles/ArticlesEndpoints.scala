package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.*
import com.softwaremill.realworld.common.*
import com.softwaremill.realworld.db.{Db, DbConfig}
import io.getquill.SnakeCase
import sttp.model.StatusCode
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import sttp.tapir.{EndpointInput, PublicEndpoint, Validator}
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}
import zio.{Cause, Console, Exit, ZIO, ZLayer}

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
    .out(jsonBody[List[ArticleData]])
    .serverLogic(session =>
      (filters, pagination) =>
        articlesService
          .list(filters.flatten.toMap, pagination)
          .logError
          .mapError(_ => InternalServerError())
    )

  val get: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "articles" / path[String]("slug")) // TODO Input Validation
    .out(jsonBody[Article])
    .serverLogic(session =>
      slug =>
        articlesService
          .find(slug)
          .logError
          .mapError {
            case e: Exceptions.NotFound => NotFound(e.message)
            case _                      => InternalServerError()
          }
          .map(Article.apply)
    )

  val create: ZServerEndpoint[Any, Any] = base.secureEndpoint.post
    .in("api" / "articles")
    .in(jsonBody[ArticleCreate]) // TODO Input Validation
    .out(jsonBody[Article])
    .serverLogic(session =>
      data =>
        articlesService
          .create(data.article, session.email)
          .logError
          .mapError {
            case e: Exceptions.AlreadyInUse => Conflict(e.message)
            case e: Exceptions.NotFound     => NotFound(e.message)
            case _                          => InternalServerError()
          }
          .map(Article.apply)
    )

  val update: ZServerEndpoint[Any, Any] = base.secureEndpoint.put
    .in("api" / "articles" / path[String]("slug"))
    .in(jsonBody[ArticleUpdate]) // TODO Input Validation
    .out(jsonBody[Article])
    .serverLogic(session =>
      data =>
        articlesService
          .update(articleUpdateData = data._2.article, slug = data._1, email = session.email)
          .logError
          .mapError {
            case e: Exceptions.AlreadyInUse => Conflict(e.message)
            case e: Exceptions.NotFound     => NotFound(e.message)
            case _                          => InternalServerError()
          }
          .map(Article.apply)
    )

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(listArticles, get, update, create)

  private def filterParam(name: String, key: ArticlesFilters): EndpointInput.Query[Option[(ArticlesFilters, String)]] = {
    query[Option[String]](name)
      .validateOption(Validator.pattern("\\w+"))
      .validateOption(Validator.nonEmptyString)
      .validateOption(Validator.maxLength(100))
      .map(_.map(v => (key, v)))(_.map((_, v) => v))
  }

object ArticlesEndpoints:
  val live: ZLayer[ArticlesService with BaseEndpoints, Nothing, ArticlesEndpoints] = ZLayer.fromFunction(new ArticlesEndpoints(_, _))
