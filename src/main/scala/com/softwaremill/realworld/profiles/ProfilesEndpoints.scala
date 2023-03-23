package com.softwaremill.realworld.profiles

import com.softwaremill.realworld.common.*
import sttp.tapir.generic.auto.*
import sttp.tapir.json.zio.jsonBody
import sttp.tapir.server.ServerEndpoint.Full
import sttp.tapir.ztapir.*
import sttp.tapir.{EndpointInput, PublicEndpoint, Validator}
import zio.{Cause, Console, Exit, IO, ZIO, ZLayer}

import scala.util.chaining.*

class ProfilesEndpoints(base: BaseEndpoints, profilesService: ProfilesService) {

  private val getProfile: ZServerEndpoint[Any, Any] = base.secureEndpoint.get
    .in("api" / "profiles" / path[String]("username"))
    .out(jsonBody[Profile])
    .serverLogic(session => username => profilesService.getProfile(username, session.email) pipe defaultErrorMappings)

  private val followUser: ZServerEndpoint[Any, Any] = base.secureEndpoint.post
    .in("api" / "profiles" / path[String]("username") / "follow")
    .out(jsonBody[Profile])
    .serverLogic(session => username => profilesService.follow(username, session.email) pipe defaultErrorMappings)

  private val unfollowUser: ZServerEndpoint[Any, Any] = base.secureEndpoint.delete
    .in("api" / "profiles" / path[String]("username") / "follow")
    .out(jsonBody[Profile])
    .serverLogic(session => username => profilesService.unfollow(username, session.email) pipe defaultErrorMappings)

  val endpoints: List[ZServerEndpoint[Any, Any]] = List(getProfile, followUser, unfollowUser)

  private def defaultErrorMappings[E <: Throwable, A](io: IO[E, A]): IO[ErrorInfo, A] = io.mapError {
    case e: Exceptions.NotFound   => NotFound(e.message)
    case e: Exceptions.BadRequest => BadRequest(e.message)
    case e: Exception             => InternalServerError(e.getMessage)
  }

}

object ProfilesEndpoints:
  val live: ZLayer[BaseEndpoints with ProfilesService, Nothing, ProfilesEndpoints] = ZLayer.fromFunction(new ProfilesEndpoints(_, _))
