package com.softwaremill.realworld.profiles

import zio.{IO, UIO, ZIO, ZLayer}

class ProfilesRepository:

  // TODO user proper db or create in-memory thread-safe store
  val profiles: Map[Int, StoredProfile] = Map(10 -> StoredProfile(10, "Dummy", "Dummy author", ""))

  def find(id: Int): IO[Option[Nothing], StoredProfile] = ZIO.fromOption(profiles.get(id))

object ProfilesRepository:

  def live: ZLayer[Any, Nothing, ProfilesRepository] = ZLayer.succeed(ProfilesRepository())
