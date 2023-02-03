package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesEndpoints.{*, given}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.utils.TestUtils.*
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{HttpError, Response, ResponseException, UriContext, basicRequest}
import sttp.tapir.EndpointOutput.StatusCode
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.{RIOMonadError, ZServerEndpoint}
import zio.test.Assertion.*
import zio.test.{TestAspect, TestRandom, ZIOSpecDefault, assertZIO}
import zio.{RIO, Random, ZIO, ZLayer}

import java.time.{Instant, ZonedDateTime}
import javax.sql.DataSource

object ArticlesEndpointsSpec extends ZIOSpecDefault:

  def spec = suite("Check articles list and get")(
    suite("with empty db")(
      test("return empty list") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.list)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles")
                .response(asJson[List[Article]])
                .send(backendStub)
                .map(_.body)
            }
        )(isRight(isEmpty))
      },
      test("return error on get") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.get)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles/unknown-article")
                .response(asJson[Article])
                .send(backendStub)
                .map(_.body)
            }
        )(isLeft(equalTo(HttpError("Not found", sttp.model.StatusCode(404)))))
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb),
    suite("with populated db")(
      test("check pagination") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.list)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles?limit=1&offset=1")
                .response(asJson[List[Article]])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            hasSize(equalTo(1))
              && contains(
                Article(
                  "how-to-train-your-dragon-2",
                  "How to train your dragon 2",
                  "So toothless",
                  "Its a dragon",
                  List("dragons", "training"),
                  Instant.ofEpochMilli(1455765776637L),
                  Instant.ofEpochMilli(1455767315824L),
                  false,
                  1,
                  ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
                )
              )
          )
        )
      },
      test("list available articles") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.list)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles")
                .response(asJson[List[Article]])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            hasSize(equalTo(3))
              && contains(
                Article(
                  "how-to-train-your-dragon",
                  "How to train your dragon",
                  "Ever wonder how?",
                  "It takes a Jacobian",
                  List("dragons", "training"),
                  Instant.ofEpochMilli(1455765776637L),
                  Instant.ofEpochMilli(1455767315824L),
                  false,
                  2,
                  ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
                )
              )
              && contains(
                Article(
                  "how-to-train-your-dragon-2",
                  "How to train your dragon 2",
                  "So toothless",
                  "Its a dragon",
                  List("dragons", "training"),
                  Instant.ofEpochMilli(1455765776637L),
                  Instant.ofEpochMilli(1455767315824L),
                  false,
                  1,
                  ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
                )
              )
              && contains(
                Article(
                  "how-to-train-your-dragon-3",
                  "How to train your dragon 3",
                  "The tagless one",
                  "Its not a dragon",
                  List(),
                  Instant.ofEpochMilli(1455765776637L),
                  Instant.ofEpochMilli(1455767315824L),
                  false,
                  0,
                  ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
                )
              )
          )
        )
      },
      test("get existing article") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.get)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles/how-to-train-your-dragon-2")
                .response(asJson[Article])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            equalTo(
              Article(
                "how-to-train-your-dragon-2",
                "How to train your dragon 2",
                "So toothless",
                "Its a dragon",
                List("dragons", "training"),
                Instant.ofEpochMilli(1455765776637L),
                Instant.ofEpochMilli(1455767315824L),
                false,
                1,
                ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
              )
            )
          )
        )
      }
    ) @@ TestAspect.before(withFixture("fixtures/articles/basic-data.sql"))
      @@ TestAspect.after(clearDb)
  ).provide(
    ArticlesRepository.live,
    ArticlesService.live,
    ArticlesEndpoints.live,
    testDbConfigLayer
  )
