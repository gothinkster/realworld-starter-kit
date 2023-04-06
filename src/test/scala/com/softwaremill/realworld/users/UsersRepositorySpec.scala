package com.softwaremill.realworld.users

import com.softwaremill.diffx.{Diff, compare}
import com.softwaremill.realworld.common.Pagination
import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.utils.TestUtils.*
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

object UsersRepositorySpec extends ZIOSpecDefault:
  def spec = suite("Check user repository features")(
    suite("find user by email")(
      test("check user not found") {
        for {
          repo <- ZIO.service[UsersRepository]
          v <- repo.findByEmail("notExisting@example.com")
        } yield zio.test.assert(v)(
          Assertion.equalTo(
            Option.empty
          )
        )
      },
      test("check user found") {
        for {
          repo <- ZIO.service[UsersRepository]
          v <- repo.findByEmail("admin@example.com")
        } yield zio.test.assert(v)(
          isSome(
            (hasField("userId", _.userId, equalTo(1)): Assertion[UserRow]) &&
              hasField("email", _.email, equalTo("admin@example.com")) &&
              hasField("username", _.username, equalTo("admin")) &&
              hasField("password", _.password, isNonEmptyString) &&
              hasField("bio", _.bio, equalTo(Some("I dont work"))) &&
              hasField("image", _.image, equalTo(Some("")))
          )
        )
      }
    ),
    suite("find user with password by email")(
      test("check user with password found") {
        for {
          repo <- ZIO.service[UsersRepository]
          result <- repo.findUserWithPasswordByEmail("admin@example.com")
        } yield assertTrue {
          // TODO there must be better way to implement this...
          import com.softwaremill.realworld.common.model.UserWithPasswordDiff.{*, given}
          compare(
            result.get,
            UserWithPassword(
              UserData(
                "admin@example.com",
                None,
                "admin",
                Some("I dont work"),
                Some("")
              ),
              "password"
            )
          ).isIdentical
        }
      },
      test("check user with password not found") {
        for {
          repo <- ZIO.service[UsersRepository]
          v <- repo.findUserWithPasswordByEmail("notExisting@example.com")
        } yield zio.test.assert(v)(
          Assertion.equalTo(
            Option.empty
          )
        )
      }
    ),
    suite("add user")(
      test("check user added") {
        for {
          repo <- ZIO.service[UsersRepository]
          v <- repo.add(UserRegisterData(email = "test@test.com", username = "tested", password = "tested"))
        } yield zio.test.assert(v)(isUnit) // TODO check DB?
      }
    )
  ).provide(
    UsersRepository.live,
    testDbLayerWithEmptyDb
  )
