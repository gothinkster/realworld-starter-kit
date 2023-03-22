package com.softwaremill.realworld.users

import com.softwaremill.realworld.common.Exceptions
import com.softwaremill.realworld.users.UserMapper.{toUserData, toUserDataWithPassword}
import io.getquill.*
import zio.{Console, IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class UsersRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*

  private val queryUser = quote(querySchema[UserRow](entity = "users"))

  def findByEmail(email: String): IO[Exception, Option[UserData]] = run(
    for {
      ur <- queryUser if ur.email == lift(email)
    } yield ur
  )
    .map(_.headOption)
    .map(_.map(toUserData))
    .provide(dsLayer)

  def findUserRowByEmail(email: String): IO[Exception, Option[UserRow]] =
    run( // TODO hm should I add additional DTO or returning row from repo in this case is OK?
      for {
        ur <- queryUser if ur.email == lift(email)
      } yield ur
    )
      .map(_.headOption)
      .provide(dsLayer)

  def findUserWithPasswordByEmail(email: String): IO[Exception, Option[UserWithPassword]] = run(
    for {
      ur <- queryUser if ur.email == lift(email)
    } yield ur
  )
    .map(_.headOption)
    .map(_.map(toUserDataWithPassword))
    .provide(dsLayer)

  def add(user: UserRegisterData): IO[Exception, Unit] = run(
    queryUser
      .insert(
        _.email -> lift(user.email),
        _.username -> lift(user.username),
        _.password -> lift(user.password)
      )
  ).unit
    .provide(dsLayer)

  def updateByEmail(updateData: UserUpdateData, email: String): IO[Exception, UserUpdateData] = run(
    queryUser
      .filter(_.email == lift(email))
      .update(
        record => record.email -> lift(updateData.email.orNull),
        record => record.username -> lift(updateData.username.orNull),
        record => record.password -> lift(updateData.password.orNull),
        record => record.bio -> lift(updateData.bio.orNull),
        record => record.image -> lift(updateData.image.orNull)
      )
  ).map(_ => updateData)
    .mapError(_ => Exceptions.AlreadyInUse("E-mail already in use!"))
    .provide(dsLayer)

object UsersRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, UsersRepository] =
    ZLayer.fromFunction(new UsersRepository(_, _))
