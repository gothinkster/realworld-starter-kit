package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesEndpoints.{*, given}
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{HttpError, ResponseException, UriContext, basicRequest}
import sttp.tapir.EndpointOutput.StatusCode
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.RIOMonadError
import zio.test.Assertion.*
import zio.test.{ZIOSpecDefault, assertZIO}

import java.time.{Instant, ZonedDateTime}

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
    },
    test("try getting not existing article") {
      val backendStub = TapirStubInterpreter(SttpBackendStub(new RIOMonadError[Any]))
        .whenServerEndpoint(ArticlesEndpoints.getEndpoint)
        .thenRunLogic()
        .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles/unknown-article")
        .response(asJson[Article])
        .send(backendStub)

      assertZIO(response.map(_.body))(isLeft(equalTo(HttpError("Not found.", sttp.model.StatusCode(400)))))
    },
    test("get existing article") {
      val backendStub = TapirStubInterpreter(SttpBackendStub(new RIOMonadError[Any]))
        .whenServerEndpoint(ArticlesEndpoints.getEndpoint)
        .thenRunLogic()
        .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles/dummy-article")
        .response(asJson[Article])
        .send(backendStub)

      assertZIO(response.map(_.body))(
        isRight(
          equalTo(
            Article(
              "dummy-article",
              "Dummy Title",
              "Represents a dummy article.",
              "Dummy body",
              List("dummy", "article"),
              Instant.parse("2016-02-18T03:22:56.637Z"),
              Instant.parse("2016-02-18T03:22:56.637Z"),
              false,
              0,
              ArticleAuthor("Dummy", "Dummy author", "", following = false)
            )
          )
        )
      )
    }
  )
