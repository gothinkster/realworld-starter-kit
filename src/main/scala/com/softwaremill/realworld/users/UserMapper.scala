package com.softwaremill.realworld.users

object UserMapper: // TODO probably this mapper can be replaced with something better in Scala

  def toUserDataWithPassword(userRow: UserRow): UserWithPassword = UserWithPassword(
    toUserData(userRow),
    userRow.password
  )

  def toUserData(userRow: UserRow): UserData = UserData(
    userRow.email,
    Option.empty[String],
    userRow.username,
    Option(userRow.bio),
    Option(userRow.image)
  )

  def toUserData(userUpdateData: UserUpdateData): UserData = UserData(
    email = userUpdateData.email.orNull,
    token = Option.empty[String],
    username = userUpdateData.username.orNull,
    bio = userUpdateData.bio,
    image = userUpdateData.image
  )

  def toUserUpdateDataWithFallback(updateData: UserUpdateData, oldUserData: UserWithPassword): UserUpdateData =
    updateData.copy(
      email = updateData.email
        .map(_.toLowerCase) // TODO consider moving it to endpoint "preprocessing phase" (the same in other cases)
        .map(_.trim)
        .orElse(Option(oldUserData.user.email)),
      username = updateData.username.map(_.trim).orElse(Option(oldUserData.user.username)),
      password = Option(oldUserData.hashedPassword),
      bio = updateData.bio.orElse(oldUserData.user.bio),
      image = updateData.image.orElse(oldUserData.user.image)
    )
