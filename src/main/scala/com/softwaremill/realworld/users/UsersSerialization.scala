package com.softwaremill.realworld.users

import zio.json.{DeriveJsonDecoder, DeriveJsonEncoder}

object UsersSerialization:

  given userEncoder: zio.json.JsonEncoder[User] = DeriveJsonEncoder.gen[User]
  given userDecoder: zio.json.JsonDecoder[User] = DeriveJsonDecoder.gen[User]
  given userDataEncoder: zio.json.JsonEncoder[UserData] = DeriveJsonEncoder.gen[UserData]
  given userDataDecoder: zio.json.JsonDecoder[UserData] = DeriveJsonDecoder.gen[UserData]
  given userRegisterRequestBodyEncoder: zio.json.JsonEncoder[UserRegister] = DeriveJsonEncoder.gen[UserRegister]
  given userRegisterRequestBodyDecoder: zio.json.JsonDecoder[UserRegister] = DeriveJsonDecoder.gen[UserRegister]
  given userRegisterDataEncoder: zio.json.JsonEncoder[UserRegisterData] = DeriveJsonEncoder.gen[UserRegisterData]
  given userRegisterDataDecoder: zio.json.JsonDecoder[UserRegisterData] = DeriveJsonDecoder.gen[UserRegisterData]
  given userLoginRequestBodyEncoder: zio.json.JsonEncoder[UserLogin] = DeriveJsonEncoder.gen[UserLogin]
  given userLoginRequestBodyDecoder: zio.json.JsonDecoder[UserLogin] = DeriveJsonDecoder.gen[UserLogin]
  given userLoginDataEncoder: zio.json.JsonEncoder[UserLoginData] = DeriveJsonEncoder.gen[UserLoginData]
  given userLoginDataDecoder: zio.json.JsonDecoder[UserLoginData] = DeriveJsonDecoder.gen[UserLoginData]
