package com.softwaremill.realworld.users

import com.softwaremill.realworld.auth.AuthService
import com.softwaremill.realworld.common.Exceptions.{NotFound, Unauthorized}
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import com.softwaremill.realworld.users.UserMapper.{toUserData, toUserUpdateDataWithFallback}
import zio.{Console, IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersService(authService: AuthService, usersRepository: UsersRepository):

  def get(email: String): IO[Exception, UserData] = usersRepository
    .findByEmail(email)
    .flatMap {
      case Some(a) => ZIO.succeed(toUserData(a))
      case None    => ZIO.fail(Exceptions.NotFound("User doesn't exist."))
    }

  def register(user: UserRegisterData): IO[Throwable, User] = {
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
          _ <- usersRepository.add(UserRegisterData(emailClean, usernameClean, hashedPassword))
        } yield User(userWithToken(emailClean, usernameClean, jwt))
      }
    } yield user
  }

  def login(user: UserLoginData): IO[Throwable, UserData] = {
    val emailClean = user.email.toLowerCase.trim()
    val passwordClean = user.password.trim()

    for {
      maybeUser <- usersRepository.findUserWithPasswordByEmail(emailClean)
      userWithPassword <- ZIO.fromOption(maybeUser).mapError(_ => Unauthorized())
      _ <- authService.verifyPassword(passwordClean, userWithPassword.hashedPassword)
      jwt <- authService.generateJwt(emailClean)
    } yield userWithPassword.user.copy(token = Some(jwt))
  }

  def update(updateData: UserUpdateData, email: String): IO[Throwable, UserData] =
    for {
      maybeOldUser <- usersRepository.findUserWithPasswordByEmail(email)
      oldUser <- ZIO.fromOption(maybeOldUser).mapError(_ => NotFound("User doesn't exist."))
      password <- updateData.password
        .map(newPassword => authService.encryptPassword(newPassword))
        .getOrElse(ZIO.succeed(oldUser.hashedPassword))
      updatedData <- usersRepository.updateByEmail(
        toUserUpdateDataWithFallback(updateData, oldUser.copy(hashedPassword = password)),
        email
      )
    } yield toUserData(updatedData)

  private def userWithToken(email: String, username: String, jwt: String): UserData = {
    UserData(
      email,
      Some(jwt),
      username,
      Option.empty[String],
      Option.empty[String]
    )
  }

object UsersService:
  val live: ZLayer[AuthService with UsersRepository, Nothing, UsersService] = ZLayer.fromFunction(UsersService(_, _))
