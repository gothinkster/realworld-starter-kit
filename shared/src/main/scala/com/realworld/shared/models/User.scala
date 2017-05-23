package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Users
/////////////////////////////////////////////////////
case class User(id: User.Id, roleId: Option[Roles.Id], created: User.Created)

object User {
  def create(id: java.util.UUID, roleId: Option[java.util.UUID], created: java.time.LocalDateTime): User = {
    User(Id(id), roleId.map(Roles.Id.apply), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
