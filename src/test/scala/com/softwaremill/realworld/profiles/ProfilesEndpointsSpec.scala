package com.softwaremill.realworld.profiles

import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.{BaseEndpoints, Configuration}
import com.softwaremill.realworld.users.UsersRepository
import com.softwaremill.realworld.utils.TestUtils.*
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
              basicRequest
                .get(uri"http://test.com/api/profiles/jake")
                .response(asJson[Profile])
                .send(backendStub(endpoint))
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
              basicRequest
                .post(uri"http://test.com/api/profiles/jake/follow")
                .response(asJson[Profile])
                .send(backendStub(endpoint))
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
              basicRequest
                .delete(uri"http://test.com/api/profiles/john/follow")
                .response(asJson[Profile])
                .send(backendStub(endpoint))
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
              basicRequest
                .get(uri"http://test.com/api/profiles/jake")
                .headers(validAuthorizationHeader("john@example.com"))
                .response(asJson[Profile])
                .send(backendStub(endpoint))
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
              basicRequest
                .post(uri"http://test.com/api/profiles/john/follow")
                .response(asJson[Profile])
                .headers(validAuthorizationHeader())
                .send(backendStub(endpoint))
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
              basicRequest
                .delete(uri"http://test.com/api/profiles/john/follow")
                .response(asJson[Profile])
                .headers(validAuthorizationHeader("john@example.com"))
                .send(backendStub(endpoint))
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
    )
  ).provide(
    AuthService.live,
    BaseEndpoints.live,
    Configuration.live,
    ProfilesEndpoints.live,
    ProfilesRepository.live,
    ProfilesService.live,
    UsersRepository.live,
    testDbLayerWithFixture("fixtures/articles/basic-data.sql")
  )
