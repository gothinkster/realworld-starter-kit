package com.softwaremill.realworld.users

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

import java.time.Instant

case class User(
    user: UserData
)
object User:
  given userEncoder: zio.json.JsonEncoder[User] = DeriveJsonEncoder.gen[User]
  given userDecoder: zio.json.JsonDecoder[User] = DeriveJsonDecoder.gen[User]

case class UserRegister(
    user: UserRegisterData
)
object UserRegister:
  given userRegisterRequestBodyEncoder: zio.json.JsonEncoder[UserRegister] = DeriveJsonEncoder.gen[UserRegister]
  given userRegisterRequestBodyDecoder: zio.json.JsonDecoder[UserRegister] = DeriveJsonDecoder.gen[UserRegister]

case class UserLogin(
    user: UserLoginData
)
object UserLogin:
  given userLoginRequestBodyEncoder: zio.json.JsonEncoder[UserLogin] = DeriveJsonEncoder.gen[UserLogin]
  given userLoginRequestBodyDecoder: zio.json.JsonDecoder[UserLogin] = DeriveJsonDecoder.gen[UserLogin]

case class UserData(
    email: String,
    token: Option[String],
    username: String,
    bio: Option[String],
    image: Option[String]
)
object UserData:
  given userDataEncoder: zio.json.JsonEncoder[UserData] = DeriveJsonEncoder.gen[UserData]
  given userDataDecoder: zio.json.JsonDecoder[UserData] = DeriveJsonDecoder.gen[UserData]

case class UserRegisterData(
    email: String,
    username: String,
    password: String
)
object UserRegisterData:
  given userRegisterDataEncoder: zio.json.JsonEncoder[UserRegisterData] = DeriveJsonEncoder.gen[UserRegisterData]
  given userRegisterDataDecoder: zio.json.JsonDecoder[UserRegisterData] = DeriveJsonDecoder.gen[UserRegisterData]

case class UserLoginData(
    email: String,
    password: String
)
object UserLoginData:
  given userLoginDataEncoder: zio.json.JsonEncoder[UserLoginData] = DeriveJsonEncoder.gen[UserLoginData]
  given userLoginDataDecoder: zio.json.JsonDecoder[UserLoginData] = DeriveJsonDecoder.gen[UserLoginData]

case class UserWithPassword(
    user: UserData,
    hashedPassword: String
)

case class UserRow(
    userId: Int,
    email: String,
    username: String,
    password: String,
    bio: String,
    image: String
)

case class UserSession(email: String)
