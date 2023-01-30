package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesEndpoints.{*, given}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.utils.DbUtils.*
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

  val articlesTestLayer: ZLayer[Any, Nothing, ArticlesService with TestDbLayer] =
    (Db.quillLive >>> ArticlesRepository.live >>> ArticlesService.live)
      ++ testDbConfigLayer

  def spec = suite("Check articles list and get")(
    test("return empty list when no articles in db") {
      val backendStub =
        TapirStubInterpreter(SttpBackendStub(new RIOMonadError[ArticlesService with DataSource]))
          .whenServerEndpoint(ArticlesEndpoints.list)
          .thenRunLogic()
          .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles")
        .response(asJson[List[Article]])
        .send(backendStub)

      assertZIO(response.map(_.body))(
        isRight(isEmpty)
      )
    } @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb),
    test("list available articles") {
      val backendStub =
        TapirStubInterpreter(SttpBackendStub(new RIOMonadError[ArticlesService with DataSource]))
          .whenServerEndpoint(ArticlesEndpoints.list)
          .thenRunLogic()
          .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles")
        .response(asJson[List[Article]])
        .send(backendStub)

      assertZIO(response.map(_.body))(
        isRight(
          hasSize(equalTo(2))
            && contains(
              Article(
                "how-to-train-your-dragon",
                "How to train your dragon",
                "Ever wonder how?",
                "It takes a Jacobian",
                Nil,
                Instant.ofEpochMilli(1455765776637L),
                Instant.ofEpochMilli(1455767315824L),
                false,
                0,
                ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
              )
            )
            && contains(
              Article(
                "how-to-train-your-dragon-2",
                "How to train your dragon 2",
                "So toothless",
                "Its a dragon",
                Nil,
                Instant.ofEpochMilli(1455765776637L),
                Instant.ofEpochMilli(1455767315824L),
                false,
                0,
                ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
              )
            )
        )
      )
    } @@ TestAspect.before(withFixture("fixtures/articles/original-spec-data.sql"))
      @@ TestAspect.after(clearDb),
    test("try getting not existing article") {
      val backendStub = TapirStubInterpreter(SttpBackendStub(new RIOMonadError[ArticlesService with DataSource]))
        .whenServerEndpoint(ArticlesEndpoints.get)
        .thenRunLogic()
        .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles/unknown-article")
        .response(asJson[Article])
        .send(backendStub)

      assertZIO(response.map(_.body))(
        isLeft(equalTo(HttpError("Article with slug unknown-article doesn't exist.", sttp.model.StatusCode(400))))
      )

    } @@ TestAspect.before(withFixture("fixtures/articles/original-spec-data.sql"))
      @@ TestAspect.after(clearDb),
    test("get existing article") {
      val backendStub = TapirStubInterpreter(SttpBackendStub(new RIOMonadError[ArticlesService with DataSource]))
        .whenServerEndpoint(ArticlesEndpoints.get)
        .thenRunLogic()
        .backend()

      val response = basicRequest
        .get(uri"http://test.com/api/articles/how-to-train-your-dragon-2")
        .response(asJson[Article])
        .send(backendStub)

      assertZIO(response.map(_.body))(
        isRight(
          equalTo(
            Article(
              "how-to-train-your-dragon-2",
              "How to train your dragon 2",
              "So toothless",
              "Its a dragon",
              Nil,
              Instant.ofEpochMilli(1455765776637L),
              Instant.ofEpochMilli(1455767315824L),
              false,
              0,
              ArticleAuthor("jake", "I work at statefarm", "https://i.stack.imgur.com/xHWG8.jpg", following = false)
            )
          )
        )
      )
    } @@ TestAspect.before(withFixture("fixtures/articles/original-spec-data.sql"))
      @@ TestAspect.after(clearDb)
  ).provide(articlesTestLayer)
