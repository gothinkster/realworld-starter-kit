package com.softwaremill.realworld.auth

import com.softwaremill.realworld.auth.AuthService.maxSessionLifetime
import com.softwaremill.realworld.users.{UserSession, UserSessionRepository}
import com.softwaremill.realworld.utils.Exceptions
import zio.{Clock, IO, RIO, ZIO, ZLayer}

import java.time.Duration

class AuthService(repository: UserSessionRepository):

  def getActiveUserSession(token: String): IO[Exception, UserSession] = (for {
    now <- Clock.instant
    session <- repository.getUserSession(token)
  } yield session.filter(_.lastUsed.plus(maxSessionLifetime).isAfter(now)))
    .flatMap {
      case Some(us) => ZIO.succeed(us)
      case None     => ZIO.fail(Exceptions.NotFound("No active session."))
    }

object AuthService:

  val maxSessionLifetime: Duration = Duration.ofDays(10)

  val live: ZLayer[UserSessionRepository, Nothing, AuthService] = ZLayer.fromFunction(AuthService(_))
