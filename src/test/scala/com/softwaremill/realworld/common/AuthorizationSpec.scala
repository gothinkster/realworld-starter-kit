package com.softwaremill.realworld.common

import com.softwaremill.realworld.articles.model.{Article, ArticleAuthor, ArticleData}
import com.softwaremill.realworld.articles.{ArticlesEndpoints, ArticlesRepository, ArticlesService}
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.model.auth.*
import com.softwaremill.realworld.common.{BaseEndpoints, Configuration}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.profiles.{ProfilesRepository, ProfilesService}
import com.softwaremill.realworld.users.UsersEndpointsSpec.test
import com.softwaremill.realworld.users.{User, UsersEndpoints, UsersRepository, UsersService}
import com.softwaremill.realworld.utils.TestUtils.*
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{HttpError, Request, Response, ResponseException, UriContext, basicRequest}
import sttp.model.Uri
import sttp.tapir.EndpointOutput.StatusCode
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.{RIOMonadError, ZServerEndpoint}
import zio.test.Assertion.*
import zio.test.{Spec, TestAspect, TestRandom, ZIOSpecDefault, assertZIO}
import zio.{RIO, Random, ZIO, ZLayer}

import java.time.{Instant, ZonedDateTime}
import javax.sql.DataSource

object AuthorizationSpec extends ZIOSpecDefault:

  val userTestParameters: List[UserAuthTestParameters] = List(
    UserAuthTestParameters(
      endpointParam = UserAuthEndpointParameters.getCurrentUser,
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    UserAuthTestParameters(
      endpointParam = UserAuthEndpointParameters.getCurrentUser,
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    ),
    UserAuthTestParameters(
      endpointParam = UserAuthEndpointParameters.update,
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    UserAuthTestParameters(
      endpointParam = UserAuthEndpointParameters.update,
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    )
  )
  val articleTestParameters: List[ArticleAuthTestParameters] = List(
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.listArticles,
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.listArticles,
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.get("slug"),
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.get("slug"),
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.create,
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.create,
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.update("slug"),
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.update("slug"),
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.makeFavorite("slug"),
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.makeFavorite("slug"),
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.removeFavorite("slug"),
      headers = Map("Authorization" -> "Token Invalid JWT"),
      expectedError = "{\"error\":\"Invalid token!\"}"
    ),
    ArticleAuthTestParameters(
      endpointParam = ArticleAuthEndpointParameters.removeFavorite("slug"),
      headers = Map(),
      expectedError = "Invalid value for: header Authorization (missing)"
    )
  )

  def userEndpointsAuthorizationTest(testParameters: UserAuthTestParameters): Spec[UsersEndpoints, Throwable] = {
    test(s"User endpoints negative authorization test [expected: ${testParameters.expectedError}]") {
      assertZIO(
        testParameters.endpoint
          .flatMap { endpoint =>
            testParameters.request
              .headers(testParameters.headers)
              .response(asJson[User])
              .send(backendStub(endpoint))
              .map(_.body)
          }
      )(isLeft(equalTo(HttpError(testParameters.expectedError, sttp.model.StatusCode(401)))))
    }
  }

  def articleEndpointsAuthorizationTest(testParameters: ArticleAuthTestParameters): Spec[ArticlesEndpoints, Throwable] = {
    test(s"Article endpoints negative authorization test [expected: ${testParameters.expectedError}]") {
      assertZIO(
        testParameters.endpoint
          .flatMap { endpoint =>
            testParameters.request
              .headers(testParameters.headers)
              .response(asJson[Article])
              .send(backendStub(endpoint))
              .map(_.body)
          }
      )(isLeft(equalTo(HttpError(testParameters.expectedError, sttp.model.StatusCode(401)))))
    }
  }

  def spec = suite("Check authorization is needed")(
    suite("Articles endpoints")(
      articleTestParameters.map(articleEndpointsAuthorizationTest): _*
    ),
    suite("User endpoints")(
      userTestParameters.map(userEndpointsAuthorizationTest): _*
    )
  ).provide(
    Configuration.live,
    AuthService.live,
    UsersRepository.live,
    UsersService.live,
    UsersEndpoints.live,
    ArticlesRepository.live,
    ArticlesService.live,
    ArticlesEndpoints.live,
    BaseEndpoints.live,
    ProfilesRepository.live,
    ProfilesService.live,
    testDbLayer
  )
