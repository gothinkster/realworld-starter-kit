package com.softwaremill.realworld.users

import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.utils.{Exceptions, Pagination}
import zio.{IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersService(usersRepository: UsersRepository):

  def findById(id: Int): IO[Exception, User] = usersRepository
    .findById(id) // TODO to be changed when JWT is implemented
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"User with provided token doesn't exist."))
    }
object UsersService:
  val live: ZLayer[UsersRepository, Nothing, UsersService] = ZLayer.fromFunction(UsersService(_))
