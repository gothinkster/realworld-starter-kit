package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Departments
/////////////////////////////////////////////////////
case class Department(
                       id: Department.Id,
                       facultyId: Faculty.Id,
                       name: Department.Name,
                       yearOfEstablishment: Department.YearOfEstablishment,
                       address: Department.Address,
                       created: Department.Created
                      )

object Department {
  def create(
              id: java.util.UUID,
              facultyId: java.util.UUID,
              name: String,
              yearOfEstablishment: String,
              address: String,
              created: java.time.LocalDateTime
            ): Department = {
    Department(
      Id(id),
      Faculty.Id(facultyId),
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
