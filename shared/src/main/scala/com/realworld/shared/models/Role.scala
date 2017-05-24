package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Roles
/////////////////////////////////////////////////////
case class Role(id: Role.Id, description: Role.Description, created: Role.Created)

object Role {
  def create(id: java.util.UUID, description: String, created: java.time.LocalDateTime): Role = {
    Role(Id(id), Description(description), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Description(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}