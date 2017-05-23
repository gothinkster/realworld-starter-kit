package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Departments
/////////////////////////////////////////////////////
case class Departments(
                        id: Departments.Id,
                        facultyId: Option[Faculties.Id],
                        name: Departments.Name,
                        yearOfEstablishment: Departments.YearOfEstablishment,
                        address: Departments.Address,
                        created: Departments.Created
                      )

object Departments {
  def create(
              id: java.util.UUID,
              facultyId: Option[java.util.UUID],
              name: String,
              yearOfEstablishment: String,
              address: String,
              created: java.time.LocalDateTime
            ): Departments = {
    Departments(
      Id(id),
      facultyId.map(Faculties.Id.apply),
      Name(name),
      YearOfEstablishment(yearOfEstablishment),
      Address(address),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class YearOfEstablishment(value: String) extends AnyVal

  case class Address(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
