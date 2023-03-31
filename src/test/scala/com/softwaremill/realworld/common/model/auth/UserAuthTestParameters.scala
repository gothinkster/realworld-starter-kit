package com.softwaremill.realworld.common.model.auth

import com.softwaremill.realworld.users.UsersEndpoints
import sttp.client3.{Request, UriContext, basicRequest}
import sttp.model.Uri
import sttp.tapir.ztapir.ZServerEndpoint
import zio.ZIO

class UserAuthTestParameters(
    val endpoint: ZIO[UsersEndpoints, Nothing, ZServerEndpoint[Any, Any]],
    val request: Request[Either[String, String], Any],
    val headers: Map[String, String],
    val expectedError: String
):
  def this(endpointParam: UserAuthEndpointParameters, headers: Map[String, String], expectedError: String) = {
    this(endpointParam.endpoint, endpointParam.request, headers, expectedError)
  }

case class UserAuthEndpointParameters(
    endpoint: ZIO[UsersEndpoints, Nothing, ZServerEndpoint[Any, Any]],
    request: Request[Either[String, String], Any]
)
object UserAuthEndpointParameters:
  val getCurrentUser: UserAuthEndpointParameters = UserAuthEndpointParameters(
    endpoint = ZIO.service[UsersEndpoints].map(endpoints => endpoints.getCurrentUser),
    request = basicRequest.get(uri"http://test.com/api/user")
  )
  val update: UserAuthEndpointParameters = UserAuthEndpointParameters(
    endpoint = ZIO.service[UsersEndpoints].map(endpoints => endpoints.update),
    request = basicRequest.put(uri"http://test.com/api/user")
  )
