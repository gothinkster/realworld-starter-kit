package com.softwaremill.realworld.users

import com.softwaremill.realworld.auth.PasswordHashing
import com.softwaremill.realworld.common.Exceptions.InvalidCredentials
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import com.softwaremill.realworld.profiles.ProfileRow
import zio.{Console, IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersService(usersRepository: UsersRepository):

  def findById(id: Int): IO[Exception, UserData] = usersRepository
    .findById(id) // TODO to be changed when JWT is implemented
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"User with provided token doesn't exist."))
    }

  def registerNewUser(user: UserRegisterData): IO[Exception, User] = {
    val emailClean = user.email.toLowerCase.trim()
    val usernameClean = user.username.trim()
    val passwordClean = user.password.trim()

    def checkUserDoesNotExist(email: String): IO[Exception, Unit] =
      for {
        maybeUser <- usersRepository.findByEmail(email.toLowerCase)
        _ <- ZIO.fail(Exceptions.AlreadyInUse("E-mail already in use!")).when(maybeUser.isDefined)
      } yield ()

    def generateJwt(): ZIO[Any, Nothing, String] = ZIO.succeed("tempJWT") // TODO add JWT generation

    for {
      _ <- checkUserDoesNotExist(emailClean)
      user <- {
        for {
          hashedPassword <- PasswordHashing.encryptPassword(passwordClean)
          jwt <- generateJwt()
          _ <- usersRepository.addUser(UserRegisterData(emailClean, usernameClean, hashedPassword))
        } yield User(userWithToken(emailClean, usernameClean, jwt))
      }
    } yield user
  }

  def userLogin(user: UserLoginData): IO[Exception, UserData] = {
    val emailClean = user.email.toLowerCase.trim()
    val passwordClean = user.password.trim()

    for {
      maybeUser <- usersRepository.findUserWithPasswordByEmail(emailClean)
      userWithPassword <- ZIO.fromOption(maybeUser).mapError(_ => InvalidCredentials())
      _ <- PasswordHashing.verifyPassword(passwordClean, userWithPassword.hashedPassword)
    } yield userWithPassword.user
  }

  private def userWithToken(email: String, username: String, jwt: String): UserData = {
    UserData(
      email,
      jwt,
      username,
      None,
      None
    )
  }

object UsersService:
  val live: ZLayer[UsersRepository, Nothing, UsersService] = ZLayer.fromFunction(UsersService(_))
