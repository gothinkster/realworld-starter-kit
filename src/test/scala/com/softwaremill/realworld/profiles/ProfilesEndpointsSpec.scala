package com.softwaremill.realworld.profiles

import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.{BaseEndpoints, Configuration}
import com.softwaremill.realworld.common.TestUtils.{
  clearDb,
  testDbConfigLayer,
  validAuthorizationHeader,
  withEmptyDb,
  withFixture,
  zioTapirStubInterpreter
}
import com.softwaremill.realworld.users.UsersRepository
import sttp.client3.*
import sttp.client3.ziojson.*
import sttp.model.StatusCode
import zio.*
import zio.test.*
import zio.test.Assertion.*

object ProfilesEndpointsSpec extends ZIOSpecDefault:

  override def spec = suite("Profile endpoints")(
    suite("as anonymous user")(
      test("get profile") {
        assertZIO(
          ZIO
            .service[ProfilesEndpoints]
            .map(_.getProfile)
            .flatMap { endpoint =>
              val backendStub = zioTapirStubInterpreter
                .whenServerEndpointRunLogic(endpoint)
                .backend()
              basicRequest
                .get(uri"http://test.com/api/profiles/jake")
                .response(asJson[Profile])
                .send(backendStub)
                .map(_.body)
            }
        )(isLeft(isSubtype[HttpError[_]](hasField("statusCode", _.statusCode, equalTo(StatusCode.Unauthorized)))))
      },
      test("follow profile") {
        assertZIO(
          ZIO
            .service[ProfilesEndpoints]
            .map(_.followUser)
            .flatMap { endpoint =>
              val backendStub = zioTapirStubInterpreter
                .whenServerEndpointRunLogic(endpoint)
                .backend()
              basicRequest
                .post(uri"http://test.com/api/profiles/jake/follow")
                .response(asJson[Profile])
                .send(backendStub)
                .map(_.body)
            }
        )(isLeft(isSubtype[HttpError[_]](hasField("statusCode", _.statusCode, equalTo(StatusCode.Unauthorized)))))
      },
      test("unfollow profile") {
        assertZIO(
          ZIO
            .service[ProfilesEndpoints]
            .map(_.unfollowUser)
            .flatMap { endpoint =>
              val backendStub = zioTapirStubInterpreter
                .whenServerEndpointRunLogic(endpoint)
                .backend()
              basicRequest
                .delete(uri"http://test.com/api/profiles/john/follow")
                .response(asJson[Profile])
                .send(backendStub)
                .map(_.body)
            }
        )(isLeft(isSubtype[HttpError[_]](hasField("statusCode", _.statusCode, equalTo(StatusCode.Unauthorized)))))
      }
    ),
    suite("as authenticated user")(
      test("get profile") {
        assertZIO(
          ZIO
            .service[ProfilesEndpoints]
            .map(_.getProfile)
            .flatMap { endpoint =>
              val backendStub = zioTapirStubInterpreter
                .whenServerEndpointRunLogic(endpoint)
                .backend()
              basicRequest
                .get(uri"http://test.com/api/profiles/jake")
                .headers(validAuthorizationHeader("john@example.com"))
                .response(asJson[Profile])
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            hasField(
              "profile",
              _.profile,
              (hasField("username", _.username, equalTo("jake")): Assertion[ProfileData])
                && hasField("bio", _.bio, isSome)
                && hasField("image", _.image, isSome)
                && hasField("following", _.following, isTrue)
            )
          )
        )
      },
      test("follow profile") {
        assertZIO(
          ZIO
            .service[ProfilesEndpoints]
            .map(_.followUser)
            .flatMap { endpoint =>
              val backendStub = zioTapirStubInterpreter
                .whenServerEndpointRunLogic(endpoint)
                .backend()
              basicRequest
                .post(uri"http://test.com/api/profiles/john/follow")
                .response(asJson[Profile])
                .headers(validAuthorizationHeader())
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            hasField(
              "profile",
              _.profile,
              (hasField("username", _.username, equalTo("john")): Assertion[ProfileData])
                && hasField("bio", _.bio, isSome)
                && hasField("image", _.image, isSome)
                && hasField("following", _.following, isTrue)
            )
          )
        )
      },
      test("unfollow profile") {
        assertZIO(
          ZIO
            .service[ProfilesEndpoints]
            .map(_.unfollowUser)
            .flatMap { endpoint =>
              val backendStub = zioTapirStubInterpreter
                .whenServerEndpointRunLogic(endpoint)
                .backend()
              basicRequest
                .delete(uri"http://test.com/api/profiles/john/follow")
                .response(asJson[Profile])
                .headers(validAuthorizationHeader("john@example.com"))
                .send(backendStub)
                .map(_.body)
            }
        )(
          isRight(
            hasField(
              "profile",
              _.profile,
              (hasField("username", _.username, equalTo("john")): Assertion[ProfileData])
                && hasField("bio", _.bio, isSome)
                && hasField("image", _.image, isSome)
                && hasField("following", _.following, isFalse)
            )
          )
        )
      }
    ) @@ TestAspect.before(withFixture("fixtures/articles/basic-data.sql"))
      @@ TestAspect.after(clearDb)
  ).provide(
    AuthService.live,
    BaseEndpoints.live,
    Configuration.live,
    ProfilesEndpoints.live,
    ProfilesRepository.live,
    ProfilesService.live,
    UsersRepository.live,
    testDbConfigLayer
  )
