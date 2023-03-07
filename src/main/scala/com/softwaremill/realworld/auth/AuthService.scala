package com.softwaremill.realworld.auth

import com.password4j.{Argon2Function, Password}
import com.softwaremill.realworld.auth.AuthService.maxSessionLifetime
import com.softwaremill.realworld.auth.PasswordHashing.Argon2Config.*
import com.softwaremill.realworld.users.{UserData, UserSession, UserSessionRepository}
import com.softwaremill.realworld.utils.Exceptions
import zio.{Clock, IO, RIO, ZIO, ZLayer}

import java.time.Duration
import scala.util.{Failure, Success, Try}

class AuthService(repository: UserSessionRepository):

  def getActiveUserSession(token: String): IO[Exception, UserSession] = (for {
    now <- Clock.instant
    session <- repository.getUserSession(token)
  } yield session.filter(_.lastUsed.plus(maxSessionLifetime).isAfter(now)))
    .flatMap {
      case Some(us) => ZIO.succeed(us)
      case None     => ZIO.fail(Exceptions.NotFound("No active session."))
    }

object PasswordHashing {

  private val Argon2: Argon2Function =
    Argon2Function.getInstance(MemoryInKib, NumberOfIterations, LevelOfParallelism, LengthOfTheFinalHash, Type, Version)

  object Argon2Config {
    val MemoryInKib = 12
    val NumberOfIterations = 20
    val LevelOfParallelism = 2
    val LengthOfTheFinalHash = 32
    val Type = com.password4j.types.Argon2.ID
    val Version = 19
  }

  def encryptPassword(password: String): IO[Exception, String] =
    Try(Password.hash(password).`with`(Argon2).getResult) match {
      case Success(hashedPassword) => ZIO.succeed(hashedPassword)
      case _                       => ZIO.fail(Exceptions.NotFound("TODO"))
    }

  def verifyPassword(password: String, passwordHash: String): IO[Exception, Boolean] = {
    if (Password.check(password, passwordHash) `with` PasswordHashing.Argon2) ZIO.succeed(true)
    else ZIO.fail(Exceptions.InvalidCredentials(s"Incorrect Credentials."))
  }
}

object AuthService:

  val maxSessionLifetime: Duration = Duration.ofDays(10)

  val live: ZLayer[UserSessionRepository, Nothing, AuthService] = ZLayer.fromFunction(AuthService(_))
