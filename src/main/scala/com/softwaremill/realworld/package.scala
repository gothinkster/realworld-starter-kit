package com.softwaremill

import com.softwaremill.realworld.articles.ArticlesEndpoints
import sttp.tapir.swagger.bundle.SwaggerInterpreter
import sttp.tapir.ztapir.ZServerEndpoint
import zio.Task

package object realworld {

  private val apiEndpoints: List[ZServerEndpoint[Any, Any]] = ArticlesEndpoints.endpoints

  private val docEndpoints: List[ZServerEndpoint[Any, Any]] = SwaggerInterpreter()
    .fromServerEndpoints[Task](apiEndpoints, "realworld-tapir-zio", "0.1.0")

  val endpoints: List[ZServerEndpoint[Any, Any]] = apiEndpoints ++ docEndpoints
}
