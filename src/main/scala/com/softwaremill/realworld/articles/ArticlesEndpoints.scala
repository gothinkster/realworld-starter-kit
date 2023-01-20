package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfilesRepository
import sttp.tapir.*
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.ZServerEndpoint
import zio.{Exit, ZIO, ZLayer}
import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

object ArticlesEndpoints {

  given articleAuthorEncoder: zio.json.JsonEncoder[ArticleAuthor] = DeriveJsonEncoder.gen[ArticleAuthor]
  given articleAuthorDecoder: zio.json.JsonDecoder[ArticleAuthor] = DeriveJsonDecoder.gen[ArticleAuthor]
  given articleEncoder: zio.json.JsonEncoder[Article] = DeriveJsonEncoder.gen[Article]
  given articleDecoder: zio.json.JsonDecoder[Article] = DeriveJsonDecoder.gen[Article]

  // TODO add filtering
  // TODO add pagination
  private val list: PublicEndpoint[Unit, String, List[Article], Any] = endpoint.get
    .in("api" / "articles")
    .out(jsonBody[List[Article]])
    .errorOut(stringBody)

  val listEndpoint: ZServerEndpoint[Any, Any] = list.serverLogic { _ =>
    ZIO
      .service[ArticlesService]
      .map(as => as.list())
      .provideLayer(ZLayer.make[ArticlesService](ArticlesService.live, ArticlesRepository.live, ProfilesRepository.live))
  }

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(listEndpoint)
}
