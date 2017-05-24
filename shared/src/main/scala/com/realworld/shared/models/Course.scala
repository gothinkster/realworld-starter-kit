package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Courses
/////////////////////////////////////////////////////
case class Course(id: Course.Id, code: Course.Code, name: Course.Name, created: Course.Created)

object Course {
  def create(id: java.util.UUID, code: String, name: String, created: java.time.LocalDateTime): Course = {
    Course(Id(id), Code(code), Name(name), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Code(value: String) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
