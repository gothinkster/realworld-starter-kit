package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Users
/////////////////////////////////////////////////////
case class Users(id: Users.Id, roleId: Option[Roles.Id], created: Users.Created)

object Users {
  def create(id: java.util.UUID, roleId: Option[java.util.UUID], created: java.util.Date): Users = {
    Users(Id(id), roleId.map(Roles.Id.apply), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
