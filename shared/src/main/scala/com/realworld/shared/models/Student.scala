package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Students
/////////////////////////////////////////////////////
case class Student(id: Student.Id, userId: User.Id, created: Student.Created)

object Student {
  def create(id: java.util.UUID, userId: java.util.UUID, created: java.time.LocalDateTime): Student = {
    Student(Id(id), User.Id(userId), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
