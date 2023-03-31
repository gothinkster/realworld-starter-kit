package com.softwaremill.realworld.common.model.auth

import com.softwaremill.realworld.articles.ArticlesEndpoints
import sttp.client3.{Request, UriContext, basicRequest}
import sttp.tapir.ztapir.ZServerEndpoint
import zio.ZIO

class ArticleAuthTestParameters(
    val endpoint: ZIO[ArticlesEndpoints, Nothing, ZServerEndpoint[Any, Any]],
    val request: Request[Either[String, String], Any],
    val headers: Map[String, String],
    val expectedError: String
) {
  def this(endpointParam: ArticleAuthEndpointParameters, headers: Map[String, String], expectedError: String) = {
    this(endpointParam.endpoint, endpointParam.request, headers, expectedError)
  }
}

case class ArticleAuthEndpointParameters(
    endpoint: ZIO[ArticlesEndpoints, Nothing, ZServerEndpoint[Any, Any]],
    request: Request[Either[String, String], Any]
)
object ArticleAuthEndpointParameters:
  def listArticles: ArticleAuthEndpointParameters = ArticleAuthEndpointParameters(
    endpoint = ZIO.service[ArticlesEndpoints].map(endpoints => endpoints.listArticles),
    request = basicRequest.get(uri"http://test.com/api/articles")
  )
  def get(slug: String): ArticleAuthEndpointParameters = ArticleAuthEndpointParameters(
    endpoint = ZIO.service[ArticlesEndpoints].map(endpoints => endpoints.get),
    request = basicRequest.get(uri"http://test.com/api/articles/$slug")
  )
  def create: ArticleAuthEndpointParameters = ArticleAuthEndpointParameters(
    endpoint = ZIO.service[ArticlesEndpoints].map(endpoints => endpoints.create),
    request = basicRequest.post(uri"http://test.com/api/articles")
  )
  def update(slug: String): ArticleAuthEndpointParameters = ArticleAuthEndpointParameters(
    endpoint = ZIO.service[ArticlesEndpoints].map(endpoints => endpoints.update),
    request = basicRequest.put(uri"http://test.com/api/articles/$slug")
  )
  def makeFavorite(slug: String): ArticleAuthEndpointParameters = ArticleAuthEndpointParameters(
    endpoint = ZIO.service[ArticlesEndpoints].map(endpoints => endpoints.makeFavorite),
    request = basicRequest.post(uri"http://test.com/api/articles/$slug/favorite")
  )
  def removeFavorite(slug: String): ArticleAuthEndpointParameters = ArticleAuthEndpointParameters(
    endpoint = ZIO.service[ArticlesEndpoints].map(endpoints => endpoints.removeFavorite),
    request = basicRequest.delete(uri"http://test.com/api/articles/$slug/favorite")
  )
