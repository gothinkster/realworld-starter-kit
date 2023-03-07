package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesSerialization.{*, given}
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.users.UserSessionRepository
import com.softwaremill.realworld.utils.BaseEndpoints
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
    suite("with auth data only")(
      test("return empty list") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.listArticles)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles")
                .headers(Map("Authorization" -> "Token admin-user-token"))
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
            .map(_.getArticle)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles/unknown-article")
                .headers(Map("Authorization" -> "Token admin-user-token"))
                .response(asJson[Article])
                .send(backendStub)
                .map(_.body)
            }
        )(isLeft(equalTo(HttpError("{\"error\":\"Not found.\"}", sttp.model.StatusCode(404)))))
      }
    ) @@ TestAspect.before(withAuthData())
      @@ TestAspect.after(clearDb),
    suite("with populated db")(
      test("validation failed on filter") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.listArticles)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(
                  uri"http://test.com/api/articles?tag=invalid-tag"
                )
                .headers(Map("Authorization" -> "Token admin-user-token"))
                .response(asJson[List[Article]])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isLeft(
            equalTo(
              HttpError(
                """{"errors":{"tag":["Invalid value for: query parameter tag (expected value to match: \\w+, but got: \"invalid-tag\")"]}}""",
                sttp.model.StatusCode.UnprocessableEntity
              )
            )
          )
        )
      },
      test("validation failed on pagination") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.listArticles)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(
                  uri"http://test.com/api/articles?limit=invalid-limit&offset=invalid-offset"
                )
                .headers(Map("Authorization" -> "Token admin-user-token"))
                .response(asJson[List[Article]])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isLeft(
            equalTo(
              HttpError(
                "{\"errors\":{\"limit\":[\"Invalid value for: query parameter limit\"]}}",
                sttp.model.StatusCode.UnprocessableEntity
              )
            )
          )
        )
      },
      test("check pagination") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.listArticles)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles?limit=1&offset=1")
                .headers(Map("Authorization" -> "Token admin-user-token"))
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
                  List("dragons", "goats", "training"),
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
      test("check filters") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.listArticles)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles?author=jake&favorited=john&tag=goats")
                .headers(Map("Authorization" -> "Token admin-user-token"))
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
                  List("dragons", "goats", "training"),
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
            .map(_.listArticles)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles")
                .headers(Map("Authorization" -> "Token admin-user-token"))
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
                  List("dragons", "goats", "training"),
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
                  ArticleAuthor("john", "I no longer work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
                )
              )
          )
        )
      },
      test("get existing article") {
        assertZIO(
          ZIO
            .service[ArticlesEndpoints]
            .map(_.getArticle)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/articles/how-to-train-your-dragon-2")
                .headers(Map("Authorization" -> "Token admin-user-token"))
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
                List("dragons", "goats", "training"),
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
    ) @@ TestAspect.before(withAuthDataAndFixture("fixtures/articles/basic-data.sql"))
      @@ TestAspect.after(clearDb)
  ).provide(
    ArticlesRepository.live,
    ArticlesService.live,
    ArticlesEndpoints.live,
    BaseEndpoints.live,
    AuthService.live,
    UserSessionRepository.live,
    testDbConfigLayer
  )
