package com.softwaremill.realworld.profiles

import io.getquill.*
import zio.ZLayer

import javax.sql.DataSource

class ProfilesRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource) {

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)
  import quill.*

  def follow(followedId: Int, followerId: Int) = run {
    query[Followers].insert(_.userId -> lift(followedId), _.followerId -> lift(followerId)).onConflictIgnore
  }.provide(dsLayer)

  def unfollow(followedId: Int, followerId: Int) = run {
    query[Followers].filter(f => (f.userId == lift(followedId)) && (f.followerId == lift(followerId))).delete
  }.provide(dsLayer)

  def isFollowing(followedId: Int, followerId: Int) = run {
    query[Followers].filter(_.userId == lift(followedId)).filter(_.followerId == lift(followerId)).map(_ => 1).nonEmpty
  }.provide(dsLayer)

}

object ProfilesRepository:
  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, ProfilesRepository] =
    ZLayer.fromFunction(new ProfilesRepository(_, _))
