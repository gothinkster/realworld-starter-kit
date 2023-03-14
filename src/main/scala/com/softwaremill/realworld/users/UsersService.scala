package com.softwaremill.realworld.users

import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.Exceptions.Unauthorized
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import com.softwaremill.realworld.profiles.ProfileRow
import zio.{Console, IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersService(authService: AuthService, usersRepository: UsersRepository):

  def findByEmail(email: String): IO[Exception, UserData] = usersRepository
    .findByEmail(email)
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"User doesn't exist."))
    }

  def registerNewUser(user: UserRegisterData): IO[Throwable, User] = {
    val emailClean = user.email.toLowerCase.trim()
    val usernameClean = user.username.trim()
    val passwordClean = user.password.trim()

    def checkUserDoesNotExist(email: String): IO[Exception, Unit] =
      for {
        maybeUser <- usersRepository.findByEmail(email.toLowerCase)
        _ <- ZIO.fail(Exceptions.AlreadyInUse("E-mail already in use!")).when(maybeUser.isDefined)
      } yield ()

    for {
      _ <- checkUserDoesNotExist(emailClean)
      user <- {
        for {
          hashedPassword <- authService.encryptPassword(passwordClean)
          jwt <- authService.generateJwt(emailClean)
          _ <- usersRepository.addUser(UserRegisterData(emailClean, usernameClean, hashedPassword))
        } yield User(userWithToken(emailClean, usernameClean, jwt))
      }
    } yield user
  }

  def userLogin(user: UserLoginData): IO[Throwable, UserData] = {
    val emailClean = user.email.toLowerCase.trim()
    val passwordClean = user.password.trim()

    for {
      maybeUser <- usersRepository.findUserWithPasswordByEmail(emailClean)
      userWithPassword <- ZIO.fromOption(maybeUser).mapError(_ => Unauthorized())
      _ <- authService.verifyPassword(passwordClean, userWithPassword.hashedPassword)
      jwt <- authService.generateJwt(emailClean)
    } yield userWithPassword.user.copy(token = Some(jwt))
  }

  private def userWithToken(email: String, username: String, jwt: String): UserData = {
    UserData(
      email,
      Some(jwt),
      username,
      None,
      None
    )
  }

object UsersService:
  val live: ZLayer[AuthService with UsersRepository, Nothing, UsersService] = ZLayer.fromFunction(UsersService(_, _))
