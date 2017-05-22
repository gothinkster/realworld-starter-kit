package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Courses
/////////////////////////////////////////////////////
case class Courses(id: Courses.Id, code: Courses.Code, name: Courses.Name, created: Courses.Created)

object Courses {
  def create(id: java.util.UUID, code: String, name: String, created: java.util.Date): Courses = {
    Courses(Id(id), Code(code), Name(name), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Code(value: String) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
