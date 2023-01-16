package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesEndpoints.{*, given}
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{UriContext, basicRequest}
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.RIOMonadError
import zio.test.Assertion.*
import zio.test.{ZIOSpecDefault, assertZIO}

object ArticlesEndpointsSpec extends ZIOSpecDefault:
  def spec = suite("ArticlesEndpoints spec")(
    test("list available articles") {
      val backendStub = TapirStubInterpreter(SttpBackendStub(new RIOMonadError[Any]))
        .whenServerEndpoint(ArticlesEndpoints.listEndpoint)
        .thenRunLogic()
        .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles")
        .response(asJson[List[Article]])
        .send(backendStub)

      assertZIO(response.map(_.body))(isRight(hasSize(equalTo(2))))
    }
  )
