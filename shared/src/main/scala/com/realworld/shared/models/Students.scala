package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Students
/////////////////////////////////////////////////////
case class Students(id: Students.Id, userId: Option[Users.Id], created: Students.Created)

object Students {
  def create(id: java.util.UUID, userId: Option[java.util.UUID], created: java.util.Date): Students = {
    Students(Id(id), userId.map(Users.Id.apply), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
