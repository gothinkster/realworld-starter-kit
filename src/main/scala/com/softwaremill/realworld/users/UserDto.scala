package com.softwaremill.realworld.users

import java.time.Instant

case class User(
    user: UserData
)

case class UserRegister(
    user: UserRegisterData
)

case class UserLogin(
    user: UserLoginData
)

case class UserWithPassword(
    user: UserData,
    hashedPassword: String
)

case class UserData(
    email: String,
    token: String,
    username: String,
    bio: Option[String],
    image: Option[String]
)

case class UserRegisterData(
    email: String,
    username: String,
    password: String
)

case class UserLoginData(
    email: String,
    password: String
)

case class UserRow(
    userId: Int,
    email: String,
    username: String,
    password: String,
    bio: String,
    image: String
)
