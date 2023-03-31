package com.softwaremill.realworld.articles

import com.softwaremill.diffx.{Diff, compare}
import com.softwaremill.realworld.articles.model.*
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.Exceptions.AlreadyInUse
import com.softwaremill.realworld.common.{BaseEndpoints, Configuration}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.users.UsersRepository
import com.softwaremill.realworld.utils.TestUtils.*
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{HttpError, Response, ResponseException, UriContext, basicRequest}
import sttp.tapir.EndpointOutput.StatusCode
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.{RIOMonadError, ZServerEndpoint}
import zio.test.Assertion.*
import zio.test.{TestAspect, TestRandom, ZIOSpecDefault, assertTrue, assertZIO}
import zio.{Cause, RIO, Random, ZIO, ZLayer}

import java.time.{Instant, ZonedDateTime}
import javax.sql.DataSource

object ArticlesEndpointsSpec extends ZIOSpecDefault:

  def spec = suite("check articles endpoints")(
    suite("check articles list and get")(
      suite("with auth data only")(
        test("return empty list") {
          assertZIO(
            ZIO
              .service[ArticlesEndpoints]
              .map(_.listArticles)
              .flatMap { endpoint =>
                basicRequest
                  .get(uri"http://test.com/api/articles")
                  .headers(validAuthorizationHeader())
                  .response(asJson[List[ArticleData]])
                  .send(backendStub(endpoint))
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
                basicRequest
                  .get(uri"http://test.com/api/articles/unknown-article")
                  .headers(validAuthorizationHeader())
                  .response(asJson[ArticleData])
                  .send(backendStub(endpoint))
                  .map(_.body)
              }
          )(isLeft(equalTo(HttpError("{\"error\":\"Article with slug unknown-article doesn't exist.\"}", sttp.model.StatusCode(404)))))
        }
      ) @@ TestAspect.before(withEmptyDb())
        @@ TestAspect.after(clearDb),
      suite("with populated db")(
        test("validation failed on filter") {
          assertZIO(
            ZIO
              .service[ArticlesEndpoints]
              .map(_.listArticles)
              .flatMap { endpoint =>
                basicRequest
                  .get(
                    uri"http://test.com/api/articles?tag=invalid-tag"
                  )
                  .headers(validAuthorizationHeader())
                  .response(asJson[List[ArticleData]])
                  .send(backendStub(endpoint))
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
                basicRequest
                  .get(
                    uri"http://test.com/api/articles?limit=invalid-limit&offset=invalid-offset"
                  )
                  .headers(validAuthorizationHeader())
                  .response(asJson[List[ArticleData]])
                  .send(backendStub(endpoint))
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
                basicRequest
                  .get(uri"http://test.com/api/articles?limit=1&offset=1")
                  .headers(validAuthorizationHeader())
                  .response(asJson[List[ArticleData]])
                  .send(backendStub(endpoint))
                  .map(_.body)
              }
          )(
            isRight(
              hasSize(equalTo(1))
                && contains(
                  ArticleData(
                    "how-to-train-your-dragon-2",
                    "How to train your dragon 2",
                    "So toothless",
                    "Its a dragon",
                    List("dragons", "goats", "training"),
                    Instant.ofEpochMilli(1455765776637L),
                    Instant.ofEpochMilli(1455767315824L),
                    false,
                    1,
                    ArticleAuthor("jake", Some("I work at statefarm"), Some("https://i.stack.imgur.com/xHWG8.jpg"), following = false)
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
                basicRequest
                  .get(uri"http://test.com/api/articles?author=jake&favorited=john&tag=goats")
                  .headers(validAuthorizationHeader())
                  .response(asJson[List[ArticleData]])
                  .send(backendStub(endpoint))
                  .map(_.body)
              }
          )(
            isRight(
              hasSize(equalTo(1))
                && contains(
                  ArticleData(
                    "how-to-train-your-dragon-2",
                    "How to train your dragon 2",
                    "So toothless",
                    "Its a dragon",
                    List("dragons", "goats", "training"),
                    Instant.ofEpochMilli(1455765776637L),
                    Instant.ofEpochMilli(1455767315824L),
                    false,
                    1,
                    ArticleAuthor("jake", Some("I work at statefarm"), Some("https://i.stack.imgur.com/xHWG8.jpg"), following = false)
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
                basicRequest
                  .get(uri"http://test.com/api/articles")
                  .headers(validAuthorizationHeader())
                  .response(asJson[List[ArticleData]])
                  .send(backendStub(endpoint))
                  .map(_.body)
              }
          )(
            isRight(
              hasSize(equalTo(3))
                && contains(
                  ArticleData(
                    "how-to-train-your-dragon",
                    "How to train your dragon",
                    "Ever wonder how?",
                    "It takes a Jacobian",
                    List("dragons", "training"),
                    Instant.ofEpochMilli(1455765776637L),
                    Instant.ofEpochMilli(1455767315824L),
                    false,
                    2,
                    ArticleAuthor("jake", Some("I work at statefarm"), Some("https://i.stack.imgur.com/xHWG8.jpg"), following = false)
                  )
                )
                && contains(
                  ArticleData(
                    "how-to-train-your-dragon-2",
                    "How to train your dragon 2",
                    "So toothless",
                    "Its a dragon",
                    List("dragons", "goats", "training"),
                    Instant.ofEpochMilli(1455765776637L),
                    Instant.ofEpochMilli(1455767315824L),
                    false,
                    1,
                    ArticleAuthor("jake", Some("I work at statefarm"), Some("https://i.stack.imgur.com/xHWG8.jpg"), following = false)
                  )
                )
                && contains(
                  ArticleData(
                    "how-to-train-your-dragon-3",
                    "How to train your dragon 3",
                    "The tagless one",
                    "Its not a dragon",
                    List(),
                    Instant.ofEpochMilli(1455765776637L),
                    Instant.ofEpochMilli(1455767315824L),
                    false,
                    0,
                    ArticleAuthor(
                      "john",
                      Some("I no longer work at statefarm"),
                      Some("https://i.stack.imgur.com/xHWG8.jpg"),
                      following = false
                    )
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
                basicRequest
                  .get(uri"http://test.com/api/articles/how-to-train-your-dragon-2")
                  .headers(validAuthorizationHeader())
                  .response(asJson[Article])
                  .send(backendStub(endpoint))
                  .map(_.body)
              }
          )(
            isRight(
              equalTo(
                Article(
                  ArticleData(
                    "how-to-train-your-dragon-2",
                    "How to train your dragon 2",
                    "So toothless",
                    "Its a dragon",
                    List("dragons", "goats", "training"),
                    Instant.ofEpochMilli(1455765776637L),
                    Instant.ofEpochMilli(1455767315824L),
                    false,
                    1,
                    ArticleAuthor("jake", Some("I work at statefarm"), Some("https://i.stack.imgur.com/xHWG8.jpg"), following = false)
                  )
                )
              )
            )
          )
        }
      ) @@ TestAspect.before(withFixture("fixtures/articles/basic-data.sql"))
        @@ TestAspect.after(clearDb)
    ),
    suite("create article")(
      test("positive article creation") {
        for {
          result <- ZIO
            .service[ArticlesEndpoints]
            .map(_.create)
            .flatMap { endpoint =>
              basicRequest
                .post(uri"http://test.com/api/articles")
                .body(
                  ArticleCreate(
                    ArticleCreateData(
                      title = "How to train your dragon 2",
                      description = "So toothless",
                      body = "Its a dragon",
                      tagList = List("drogon", "fly")
                    )
                  )
                )
                .headers(validAuthorizationHeader())
                .response(asJson[Article])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        } yield assertTrue {
          // TODO there must be better way to implement this...
          import com.softwaremill.realworld.common.model.ArticleDiff.{*, given}
          compare(
            result.toOption.get,
            Article(
              ArticleData(
                "how-to-train-your-dragon-2",
                "How to train your dragon 2",
                "So toothless",
                "Its a dragon",
                List("drogon", "fly"),
                null,
                null,
                false,
                0,
                ArticleAuthor("admin", Some("I dont work"), Some(""), following = false)
              )
            )
          ).isIdentical
        }
      },
      test("article creation - check conflict") {
        assertZIO(for {
          repo <- ZIO.service[ArticlesRepository]
          _ <- repo.add(
            ArticleRow(
              slug = "test-slug",
              title = "title",
              description = "description",
              body = "body",
              createdAt = Instant.now,
              updatedAt = Instant.now,
              authorId = 1
            )
          )
          result <- ZIO
            .service[ArticlesEndpoints]
            .map(_.create)
            .flatMap { endpoint =>
              basicRequest
                .post(uri"http://test.com/api/articles")
                .body(
                  ArticleCreate(
                    ArticleCreateData(
                      title = "Test slug",
                      description = "So toothless",
                      body = "Its a dragon",
                      tagList = List("drogon", "fly")
                    )
                  )
                )
                .headers(validAuthorizationHeader())
                .response(asJson[Article])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        } yield result)(
          isLeft(
            equalTo(
              HttpError(
                "{\"error\":\"Article name already exists\"}",
                sttp.model.StatusCode.Conflict
              )
            )
          )
        )
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb),
    suite("update article")(
      test("positive article update") {
        for {
          repo <- ZIO.service[ArticlesRepository]
          _ <- repo.add(
            ArticleRow(
              slug = "test-slug",
              title = "Test slug",
              description = "description",
              body = "body",
              createdAt = Instant.now,
              updatedAt = Instant.now,
              authorId = 1
            )
          )
          result <- ZIO
            .service[ArticlesEndpoints]
            .map(_.update)
            .flatMap { endpoint =>
              basicRequest
                .put(uri"http://test.com/api/articles/test-slug")
                .body(
                  ArticleUpdate(
                    ArticleUpdateData(
                      slug = Option("test-slug-2"),
                      title = Option("Test slug 2"),
                      description = Option("updated description"),
                      body = Option("updated body")
                    )
                  )
                )
                .headers(validAuthorizationHeader())
                .response(asJson[Article])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        } yield assertTrue {
          // TODO there must be better way to implement this...
          import com.softwaremill.realworld.common.model.ArticleDiff.{*, given}
          compare(
            result.toOption.get,
            Article(
              ArticleData(
                "test-slug-2",
                "Test slug 2",
                "updated description",
                "updated body",
                Nil,
                null,
                null,
                false,
                0,
                ArticleAuthor("admin", Some("I dont work"), Some(""), following = false)
              )
            )
          ).isIdentical
        }
      },
      test("article update - check conflict") {
        assertZIO(for {
          repo <- ZIO.service[ArticlesRepository]
          _ <- repo.add(
            ArticleRow(
              slug = "test-slug",
              title = "Test slug",
              description = "description",
              body = "body",
              createdAt = Instant.now,
              updatedAt = Instant.now,
              authorId = 1
            )
          )
          _ <- repo.add(
            ArticleRow(
              slug = "test-slug-2",
              title = "Test slug 2",
              description = "description",
              body = "body",
              createdAt = Instant.now,
              updatedAt = Instant.now,
              authorId = 1
            )
          )
          result <- ZIO
            .service[ArticlesEndpoints]
            .map(_.update)
            .flatMap { endpoint =>
              basicRequest
                .put(uri"http://test.com/api/articles/test-slug")
                .body(
                  ArticleUpdate(
                    ArticleUpdateData(
                      slug = Option("test-slug-2"),
                      title = Option("Test slug 2"),
                      description = Option("updated description"),
                      body = Option("updated body")
                    )
                  )
                )
                .headers(validAuthorizationHeader())
                .response(asJson[Article])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        } yield result)(
          isLeft(
            equalTo(
              HttpError(
                "{\"error\":\"Article name already exists\"}",
                sttp.model.StatusCode.Conflict
              )
            )
          )
        )
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb)
  ).provide(
    Configuration.live,
    AuthService.live,
    UsersRepository.live,
    ArticlesRepository.live,
    ArticlesService.live,
    ArticlesEndpoints.live,
    BaseEndpoints.live,
    testDbConfigLayer
  )
