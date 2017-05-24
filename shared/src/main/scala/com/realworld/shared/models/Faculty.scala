package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Faculties
/////////////////////////////////////////////////////
case class Faculty(
                    id: Faculty.Id,
                    universityId: University.Id,
                    code: Faculty.Code,
                    name: Faculty.Name,
                    addressOfFaculty: Faculty.AddressOfFaculty,
                    yearOfEstablishment: Faculty.YearOfEstablishment,
                    created: Faculty.Created
                    )

object Faculty {
  def create(
              id: java.util.UUID,
              universityId: java.util.UUID,
              code: String,
              name: String,
              addressOfFaculty: String,
              yearOfEstablishment: String,
              created: java.time.LocalDateTime
            ): Faculty = {
    Faculty(
      Id(id),
      University.Id(universityId),
      Code(code),
      Name(name),
      AddressOfFaculty(addressOfFaculty),
      YearOfEstablishment(yearOfEstablishment),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Code(value: String) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class AddressOfFaculty(value: String) extends AnyVal

  case class YearOfEstablishment(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
