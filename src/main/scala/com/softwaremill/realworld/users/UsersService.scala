package com.softwaremill.realworld.users

import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.utils.{Exceptions, Pagination}
import zio.{IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersService(usersRepository: UsersRepository):

  private val EmailAlreadyUsed = "E-mail already in use!"

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
        _ <- ZIO.fail(Exceptions.Conflict(EmailAlreadyUsed)).when(maybeUser.isDefined)
      } yield ()

    def generateJwt(): ZIO[Any, Nothing, String] = ZIO.succeed("tempJWT") // TODO add JWT generation
    def encryptPassword(password: String): ZIO[Any, Nothing, String] = ZIO.succeed(password) // TODO add encryption

    for {
      _ <- checkUserDoesNotExist(emailClean)
      user <- {
        for {
          bcryptPassword <- encryptPassword(passwordClean)
          jwt <- generateJwt()
          _ <- usersRepository.add(UserRegisterData(emailClean, usernameClean, bcryptPassword))
        } yield User(userWithToken(emailClean, usernameClean, jwt))
      }
    } yield user
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
