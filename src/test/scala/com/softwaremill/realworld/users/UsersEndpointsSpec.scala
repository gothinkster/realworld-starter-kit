package com.softwaremill.realworld.users

import com.softwaremill.diffx.{Diff, compare}
import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.utils.TestUtils.*
import com.softwaremill.realworld.common.{BaseEndpoints, Configuration}
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import sttp.client3.testing.SttpBackendStub
import sttp.client3.ziojson.*
import sttp.client3.{HttpError, Response, ResponseException, UriContext, basicRequest}
import sttp.tapir.EndpointOutput.StatusCode
import sttp.tapir.server.stub.TapirStubInterpreter
import sttp.tapir.ztapir.{RIOMonadError, ZServerEndpoint}
import zio.test.Assertion.*
import zio.test.{Assertion, TestAspect, TestRandom, ZIOSpecDefault, assertTrue, assertZIO}
import zio.{RIO, Random, ZIO, ZLayer}

import java.time.{Instant, ZonedDateTime}
import javax.sql.DataSource

object UsersEndpointsSpec extends ZIOSpecDefault:
  def spec = suite("Users endpoints tests")(
    suite("Get current user")(
      test("return not found error") {
        assertZIO(
          ZIO
            .service[UsersEndpoints]
            .map(_.getCurrentUser)
            .flatMap { endpoint =>
              basicRequest
                .get(uri"http://test.com/api/user")
                .headers(validAuthorizationHeader("invalid_email@invalid.com"))
                .response(asJson[User])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        )(isLeft(equalTo(HttpError("{\"error\":\"User doesn't exist.\"}", sttp.model.StatusCode(404)))))
      },
      test("return valid user") {
        assertZIO(
          ZIO
            .service[UsersEndpoints]
            .map(_.getCurrentUser)
            .flatMap { endpoint =>
              basicRequest
                .get(uri"http://test.com/api/user")
                .headers(validAuthorizationHeader())
                .response(asJson[User])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        )(
          isRight(
            equalTo(
              User(
                UserData(
                  "admin@example.com",
                  None,
                  "admin",
                  Some("I dont work"),
                  Some("")
                )
              )
            )
          )
        )
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb),
    suite("User register")(
      test("return already in use error") {
        assertZIO(
          ZIO
            .service[UsersEndpoints]
            .map(_.register)
            .flatMap { endpoint =>
              basicRequest
                .post(uri"http://test.com/api/users")
                .body(UserRegister(UserRegisterData(email = "admin@example.com", username = "user", password = "password")))
                .response(asJson[User])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        )(isLeft(equalTo(HttpError("{\"error\":\"E-mail already in use!\"}", sttp.model.StatusCode(409)))))
      },
      test("return registered user") {
        for {
          result <- ZIO
            .service[UsersEndpoints]
            .map(_.register)
            .flatMap { endpoint =>
              basicRequest
                .post(uri"http://test.com/api/users")
                .body(UserRegister(UserRegisterData(email = "new_user@example.com", username = "user", password = "password")))
                .response(asJson[User])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        } yield assertTrue {
          // TODO there must be better way to implement this...
          import com.softwaremill.realworld.common.model.UserDiff.{*, given}
          compare(
            result.toOption.get,
            User(UserData(email = "new_user@example.com", token = None, username = "user", bio = None, image = None))
          ).isIdentical
        }
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb),
    suite("User login")(
      test("return invalid credentials error") {
        assertZIO(
          ZIO
            .service[UsersEndpoints]
            .map(_.login)
            .flatMap { endpoint =>
              basicRequest
                .post(uri"http://test.com/api/users/login")
                .body(UserLogin(UserLoginData(email = "admin@example.com", password = "invalid_password")))
                .response(asJson[User])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        )(isLeft(equalTo(HttpError("{\"error\":\"Invalid email or password!\"}", sttp.model.StatusCode(401)))))
      },
      test("return logged in user") {
        for {
          result <- ZIO
            .service[UsersEndpoints]
            .map(_.login)
            .flatMap { endpoint =>
              basicRequest
                .post(uri"http://test.com/api/users/login")
                .body(UserLogin(UserLoginData(email = "admin@example.com", password = "password")))
                .response(asJson[User])
                .send(backendStub(endpoint))
                .map(_.body)
            }
        } yield assertTrue {
          // TODO there must be better way to implement this...
          import com.softwaremill.realworld.common.model.UserDiff.{*, given}
          compare(
            result.toOption.get,
            User(UserData(email = "admin@example.com", token = None, username = "admin", bio = Some("I dont work"), image = Some("")))
          ).isIdentical
        }
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb)
  ).provide(
    Configuration.live,
    AuthService.live,
    UsersRepository.live,
    UsersService.live,
    UsersEndpoints.live,
    BaseEndpoints.live,
    testDbConfigLayer
  )
