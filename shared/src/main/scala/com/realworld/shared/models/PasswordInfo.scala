package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// PasswordInfo
/////////////////////////////////////////////////////
case class PasswordInfo(
                         userId: User.Id,
                         provider: PasswordInfo.Provider,
                         key: PasswordInfo.Key,
                         hasher: PasswordInfo.Hasher,
                         password: PasswordInfo.Password,
                         salt: Option[PasswordInfo.Salt],
                         created: PasswordInfo.Created
                       )

object PasswordInfo {
  def create(
              userId: java.util.UUID,
              provider: String,
              key: String,
              hasher: String,
              password: String,
              salt: Option[String],
              created: java.time.LocalDateTime
            ): PasswordInfo = {
    PasswordInfo(
      User.Id(userId),
      Provider(provider),
      Key(key),
      Hasher(hasher),
      Password(password),
      salt.map(Salt.apply),
      Created(created)
    )
  }

  case class Provider(value: String) extends AnyVal

  case class Key(value: String) extends AnyVal

  case class Hasher(value: String) extends AnyVal

  case class Password(value: String) extends AnyVal

  case class Salt(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
