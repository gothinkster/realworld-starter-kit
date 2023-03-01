package com.softwaremill.realworld.users

import java.time.Instant

case class User(
    user: UserData
)

case class UserRegister(
    user: UserRegisterData
)

case class UserData(
    email: String,
    token: String,
    username: String,
    bio: String,
    image: String
)

case class UserRegisterData(
    email: String,
    username: String,
    password: String
)

case class UserRow(
    userId: Int,
    email: String,
    username: String,
    bio: String,
    image: String
)
