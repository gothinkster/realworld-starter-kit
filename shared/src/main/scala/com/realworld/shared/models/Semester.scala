package com.realworld.shared.models

/**
  * Created by shubham on 24/5/17.
  */
/////////////////////////////////////////////////////
// Semesters
/////////////////////////////////////////////////////
case class Semester(
                     id: Semester.Id,
                     session: Semester.Session,
                     semesterType: Semester.SemesterType,
                     created: Semester.Created
                   )

object Semester {
  def create(id: java.util.UUID, session: String, semesterType: String, created: java.time.LocalDateTime): Semester = {
    Semester(Id(id), Session(session), SemesterType(semesterType), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Session(value: String) extends AnyVal

  case class SemesterType(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
