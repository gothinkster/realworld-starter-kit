package com.softwaremill.realworld.users

import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.users.UserSessionRepository
import com.softwaremill.realworld.users.UsersSerialization.{*, given}
import com.softwaremill.realworld.common.BaseEndpoints
import com.softwaremill.realworld.common.TestUtils.*
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

object UsersEndpointsSpec extends ZIOSpecDefault:
// TODO add user registration tests
  def spec = suite("Check users get")(
    suite("with empty db")(
      test("return unauthorized error") {
        assertZIO(
          ZIO
            .service[UsersEndpoints]
            .map(_.getCurrentUser)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/user")
                .headers(Map("Authorization" -> "Token admin-user-token"))
                .response(asJson[User])
                .send(backendStub)
                .map(_.body)
            }
        )(isLeft(equalTo(HttpError("{\"error\":\"Unauthorized.\"}", sttp.model.StatusCode(401)))))
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb),
    suite("with user in db")(
      test("check user") {
        assertZIO(
          ZIO
            .service[UsersEndpoints]
            .map(_.getCurrentUser)
            .flatMap { endpoint =>
              val backendStub =
                zioTapirStubInterpreter
                  .whenServerEndpoint(endpoint)
                  .thenRunLogic()
                  .backend()
              basicRequest
                .get(uri"http://test.com/api/user")
                .headers(Map("Authorization" -> "Token admin-user-token"))
                .response(asJson[User])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            equalTo(
              User(
                UserData(
                  "admin@example.com",
                  "admin-user-token",
                  "admin",
                  Some("I dont work"),
                  Some("")
                )
              )
            )
          )
        )
      }
    ) @@ TestAspect.before(withAuthData())
      @@ TestAspect.after(clearDb)
  ).provide(
    UsersRepository.live,
    UsersService.live,
    UsersEndpoints.live,
    BaseEndpoints.live,
    AuthService.live,
    UserSessionRepository.live,
    testDbConfigLayer
  )
