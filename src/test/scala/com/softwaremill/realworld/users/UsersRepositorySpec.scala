package com.softwaremill.realworld.users

import com.softwaremill.realworld.db.{Db, DbConfig, DbMigrator}
import com.softwaremill.realworld.common.Pagination
import com.softwaremill.realworld.common.TestUtils.*
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

object UsersRepositorySpec extends ZIOSpecDefault:
  // TODO add user add tests
  def spec = suite("Check user repository features")(
    suite("with auth data only")(
      test("check user found") {
        for {
          repo <- ZIO.service[UsersRepository]
          v <- repo.findById(1)
        } yield zio.test.assert(v)(
          Assertion.equalTo(
            Option(
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
      }
    ) @@ TestAspect.before(withAuthData())
      @@ TestAspect.after(clearDb),
    suite("with empty db")(
      test("check user not found") {
        for {
          repo <- ZIO.service[UsersRepository]
          v <- repo.findById(1)
        } yield zio.test.assert(v)(
          Assertion.equalTo(
            Option.empty
          )
        )
      }
    ) @@ TestAspect.before(withEmptyDb())
      @@ TestAspect.after(clearDb)
  ).provide(
    UsersRepository.live,
    UserSessionRepository.live,
    testDbConfigLayer
  )
