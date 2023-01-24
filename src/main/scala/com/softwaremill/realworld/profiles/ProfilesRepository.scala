package com.softwaremill.realworld.profiles

import io.getquill.{SnakeCase, SqliteZioJdbcContext}
import zio.{IO, UIO, ZIO, ZLayer}

class ProfilesRepository(quill: SqliteZioJdbcContext[SnakeCase]):

  // TODO user proper db or create in-memory thread-safe store
  val profiles: Map[Int, StoredProfile] = Map(10 -> StoredProfile(10, "Dummy", "Dummy author", ""))

  def find(id: Int): IO[Option[Nothing], StoredProfile] = ZIO.fromOption(profiles.get(id))

object ProfilesRepository:

  def live: ZLayer[SqliteZioJdbcContext[SnakeCase], Nothing, ProfilesRepository] = ZLayer.fromFunction(ProfilesRepository(_))
