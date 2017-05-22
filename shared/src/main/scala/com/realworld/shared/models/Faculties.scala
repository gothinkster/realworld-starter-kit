package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Faculties
/////////////////////////////////////////////////////
case class Faculties(
                      id: Faculties.Id,
                      universityId: Option[Universities.Id],
                      code: Faculties.Code,
                      name: Faculties.Name,
                      addressOfFaculty: Faculties.AddressOfFaculty,
                      yearOfEstablishment: Faculties.YearOfEstablishment,
                      created: Faculties.Created
                    )

object Faculties {
  def create(
              id: java.util.UUID,
              universityId: Option[java.util.UUID],
              code: String,
              name: String,
              addressOfFaculty: String,
              yearOfEstablishment: String,
              created: java.util.Date
            ): Faculties = {
    Faculties(
      Id(id),
      universityId.map(Universities.Id.apply),
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

  case class Created(value: java.util.Date) extends AnyVal

}
