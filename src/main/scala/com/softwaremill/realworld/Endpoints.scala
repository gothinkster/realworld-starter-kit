package com.softwaremill.realworld

import com.softwaremill.realworld.articles.ArticlesEndpoints
import com.softwaremill.realworld.db.DbConfig
import sttp.tapir.swagger.bundle.SwaggerInterpreter
import sttp.tapir.ztapir.ZServerEndpoint
import zio.{Task, ZIO, ZLayer}

class Endpoints(articlesEndpoints: ArticlesEndpoints):

  val endpoints: List[ZServerEndpoint[Any, Any]] = {
    val api = articlesEndpoints.endpoints
    val docs = docsEndpoints(api)
    api ++ docs
  }

  private def docsEndpoints(apiEndpoints: List[ZServerEndpoint[Any, Any]]): List[ZServerEndpoint[Any, Any]] = SwaggerInterpreter()
    .fromServerEndpoints[Task](apiEndpoints, "realworld-tapir-zio", "0.1.0")

object Endpoints:

  private def create(articlesEndpoints: ArticlesEndpoints): Endpoints = new Endpoints(articlesEndpoints)

  val live: ZLayer[ArticlesEndpoints, Nothing, Endpoints] = ZLayer.fromFunction(new Endpoints(_))
