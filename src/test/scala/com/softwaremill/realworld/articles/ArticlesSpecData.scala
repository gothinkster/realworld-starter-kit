package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.model.{ArticleAuthor, ArticleData, ArticlesList}
import com.softwaremill.realworld.utils.TestUtils.backendStub
import sttp.client3.ziojson.asJson
import sttp.client3.{HttpError, ResponseException, basicRequest}
import sttp.model.Uri
import zio.ZIO
import zio.test.Assertion.{equalTo, isLeft, isRight}
import zio.test.{TestResult, assertTrue, assertZIO}

import java.time.Instant
import scala.collection.immutable.Map

object ArticlesSpecData {
  def zioEffect(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, Either[ResponseException[String, String], ArticlesList]] = {

    ZIO
      .service[ArticlesEndpoints]
      .map(_.listArticles)
      .flatMap { endpoint =>

        val requestWithUri = basicRequest
          .get(uri)

        val requestAfterAuthorization = authorizationHeaderOpt match
          case Some(authorizationHeader) => requestWithUri.headers(authorizationHeader)
          case None                      => requestWithUri

        requestAfterAuthorization
          .response(asJson[ArticlesList])
          .send(backendStub(endpoint))
          .map(_.body)
      }
  }

  def checkIfArticleListIsEmpty(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, TestResult] = {

    assertZIO(
      zioEffect(authorizationHeaderOpt, uri)
    )(
      isRight(
        equalTo(
          ArticlesList(
            articles = List.empty[ArticleData],
            articlesCount = 0
          )
        )
      )
    )
  }

  def checkIfFilterErrorOccur(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, TestResult] = {

    assertZIO(
      zioEffect(authorizationHeaderOpt, uri)
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
  }

  def checkIfPaginationErrorOccur(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, TestResult] = {

    assertZIO(
      zioEffect(authorizationHeaderOpt, uri)
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
  }

  def checkPagination(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, TestResult] = {

    for {
      result <- zioEffect(authorizationHeaderOpt, uri)
    } yield assertTrue {
      // TODO there must be better way to implement this...
      import com.softwaremill.realworld.common.model.UserDiff.{*, given}

      val articlesList = result.toOption.get

      articlesList.articlesCount == 1 &&
      articlesList.articles.contains(
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
    }
  }

  def checkFilters(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, TestResult] = {

    for {
      result <- zioEffect(authorizationHeaderOpt, uri)
    } yield assertTrue {
      // TODO there must be better way to implement this...
      import com.softwaremill.realworld.common.model.UserDiff.{*, given}

      val articlesList = result.toOption.get

      articlesList.articlesCount == 1 &&
      articlesList.articles.contains(
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
    }
  }

  def listAvailableArticles(
      authorizationHeaderOpt: Option[Map[String, String]],
      uri: Uri
  ): ZIO[ArticlesEndpoints, Throwable, TestResult] = {

    for {
      result <- zioEffect(authorizationHeaderOpt, uri)
    } yield assertTrue {
      // TODO there must be better way to implement this...
      import com.softwaremill.realworld.common.model.UserDiff.{*, given}

      val articlesList = result.toOption.get

      articlesList.articlesCount == 3 &&
      articlesList.articles.contains(
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
      ) &&
      articlesList.articles.contains(
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
      ) &&
      articlesList.articles.contains(
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
    }
  }
}
