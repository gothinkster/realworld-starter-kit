package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Roles
/////////////////////////////////////////////////////
case class Roles(id: Roles.Id, description: Roles.Description, created: Roles.Created)

object Roles {
  def create(id: java.util.UUID, description: String, created: java.util.Date): Roles = {
    Roles(Id(id), Description(description), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Description(value: String) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}

/////////////////////////////////////////////////////
// Semesters
/////////////////////////////////////////////////////
case class Semesters(
                      id: Semesters.Id,
                      session: Semesters.Session,
                      semesterType: Semesters.SemesterType,
                      created: Semesters.Created
                    )

object Semesters {
  def create(id: java.util.UUID, session: String, semesterType: String, created: java.util.Date): Semesters = {
    Semesters(Id(id), Session(session), SemesterType(semesterType), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Session(value: String) extends AnyVal

  case class SemesterType(value: String) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
