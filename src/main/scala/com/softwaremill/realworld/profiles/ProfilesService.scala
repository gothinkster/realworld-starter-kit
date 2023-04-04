package com.softwaremill.realworld.profiles

import com.softwaremill.realworld.common.Exceptions.{BadRequest, NotFound}
import com.softwaremill.realworld.users.{UserRow, UsersRepository}
import zio.{Task, ZIO, ZLayer}

class ProfilesService(profilesRepository: ProfilesRepository, usersRepository: UsersRepository) {

  def getProfile(username: String, viewerEmail: String): Task[Profile] = for {
    profileUser <- getProfileByUsername(username)
    viewerId <- getFollowerByEmail(viewerEmail).map(_.userId)
    profileData <- getProfileData(profileUser, viewerId)
  } yield Profile(profileData)

  def follow(username: String, followerEmail: String): Task[Profile] = for {
    profileUser <- getProfileByUsername(username)
    followerId <- getFollowerByEmail(followerEmail).map(_.userId)
    _ <- ZIO.fail(BadRequest("You can't follow yourself")).when(profileUser.userId == followerId)
    _ <- profilesRepository.follow(profileUser.userId, followerId)
    profileData <- getProfileData(profileUser, followerId)
  } yield Profile(profileData)

  def unfollow(username: String, followerEmail: String): Task[Profile] = for {
    profileUser <- getProfileByUsername(username)
    followerId <- getFollowerByEmail(followerEmail).map(_.userId)
    _ <- profilesRepository.unfollow(profileUser.userId, followerId)
    profileData <- getProfileData(profileUser, followerId)
  } yield Profile(profileData)

  private def getProfileByUsername(username: String): Task[UserRow] = for {
    userOpt <- usersRepository.findByUsername(username)
    user <- ZIO.fromOption(userOpt).mapError(_ => NotFound(s"No profile with provided username '$username' could be found"))
  } yield user

  private def getFollowerByEmail(email: String): Task[UserRow] = for {
    userOpt <- usersRepository.findByEmail(email)
    user <- ZIO.fromOption(userOpt).mapError(_ => NotFound("Couldn't find user for logged in session"))
  } yield user

  def getProfileData(profileId: Int, asSeenByUserWithId: Int): Task[ProfileData] =
    usersRepository
      .findById(profileId)
      .someOrFail(NotFound(s"Couldn't find a profile for user with id=$profileId"))
      .flatMap(getProfileData(_, asSeenByUserWithId))

  private def getProfileData(user: UserRow, asSeenByUserWithId: Int): Task[ProfileData] =
    profilesRepository.isFollowing(user.userId, asSeenByUserWithId).map(ProfileData(user.username, user.bio, user.image, _))

}

object ProfilesService:
  val live: ZLayer[ProfilesRepository with UsersRepository, Nothing, ProfilesService] = ZLayer.fromFunction(ProfilesService(_, _))
