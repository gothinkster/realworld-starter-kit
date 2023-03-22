package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesEndpoints.{*, given}
import com.softwaremill.realworld.common.Pagination
import com.softwaremill.realworld.common.TestUtils.*
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{HttpError, Response, ResponseException, UriContext, basicRequest}
import sttp.tapir.EndpointOutput.StatusCode
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.{RIOMonadError, ZServerEndpoint}
import zio.test.Assertion.*
import zio.test.{Assertion, TestAspect, TestRandom, ZIOSpecDefault, assertZIO}
import zio.{RIO, Random, ZIO, ZLayer}

import java.time.{Instant, ZonedDateTime}
import javax.sql.DataSource

object ArticlesRepositorySpec extends ZIOSpecDefault:

  def spec = suite("Check list features")(
    suite("list articles")(
      suite("with auth data only")(
        test("no filters") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(Map(), Pagination(20, 0))
          } yield zio.test.assert(v)(Assertion.isEmpty)
        },
        test("with filters") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(
              Map(ArticlesFilters.Author -> "John", ArticlesFilters.Tag -> "dragon", ArticlesFilters.Favorited -> "Ron"),
              Pagination(20, 0)
            )
          } yield zio.test.assert(v)(Assertion.isEmpty)
        }
      ) @@ TestAspect.before(withEmptyDb())
        @@ TestAspect.after(clearDb),
      suite("with populated db")(
        test("with small offset and small limit") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(Map(), Pagination(1, 1))
          } yield zio.test.assert(v)(
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
        },
        test("no filters") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(Map(), Pagination(20, 0))
          } yield zio.test.assert(v)(
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
        },
        test("with tag filter") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(
              Map(ArticlesFilters.Tag -> "dragons"),
              Pagination(20, 0)
            )
          } yield zio.test.assert(v)(
            hasSize(equalTo(2))
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
          )
        },
        test("with favorited filter") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(
              Map(ArticlesFilters.Favorited -> "jake"),
              Pagination(20, 0)
            )
          } yield zio.test.assert(v)(
            hasSize(equalTo(1))
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
          )
        },
        test("with author filter") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.list(
              Map(ArticlesFilters.Author -> "john"),
              Pagination(20, 0)
            )
          } yield zio.test.assert(v)(
            hasSize(equalTo(1))
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
        }
      ) @@ TestAspect.before(withFixture("fixtures/articles/basic-data.sql"))
        @@ TestAspect.after(clearDb),
      suite("find article")(
        test("find by slug") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.findBySlug("how-to-train-your-dragon")
          } yield zio.test.assert(v)(
            Assertion.equalTo(
              Option(
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
            )
          )
        },
        test("find article by slug and email") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.findBySlugAndEmail("how-to-train-your-dragon", "jake@example.com")
          } yield zio.test.assert(v)(
            Assertion.equalTo(
              Option(
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
            )
          )
        },
        test("find article - check article not found") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.findBySlug("non-existing-article-slug")
          } yield zio.test.assert(v)(Assertion.isNone)
        },
        test("find article by slug and email - check article not found") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            v <- repo.findBySlugAndEmail("how-to-train-your-dragon", "someone_else@example.com")
          } yield zio.test.assert(v)(Assertion.isNone)
        }
      ) @@ TestAspect.before(withFixture("fixtures/articles/basic-data.sql"))
        @@ TestAspect.after(clearDb),
      suite("add & update tags")(
        test("add tag") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            slug = "how-to-train-your-dragon"
            newTag = "new_tag"
            _ <- repo.addTag(newTag, slug)
            v <- repo.findBySlug(slug).map(_.get.tagList)
          } yield zio.test.assert(v)(Assertion.contains(newTag))
        },
        test("add tag - check other article is untouched") {
          for {
            repo <- ZIO.service[ArticlesRepository]
            newTag = "new_tag"
            _ <- repo.addTag(newTag, "how-to-train-your-dragon")
            v <- repo.findBySlug("how-to-train-your-dragon-2").map(_.get.tagList)
          } yield zio.test.assert(v)(Assertion.hasNoneOf(newTag))
        }
      ) @@ TestAspect.before(withFixture("fixtures/articles/basic-data.sql"))
        @@ TestAspect.after(clearDb)
    )
  ).provide(
    ArticlesRepository.live,
    testDbConfigLayer
  )
