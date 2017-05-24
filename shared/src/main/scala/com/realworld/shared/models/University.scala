package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Universities
/////////////////////////////////////////////////////
case class University(
                       id: University.Id,
                       code: University.Code,
                       name: University.Name,
                       yearOfEstablishment: University.YearOfEstablishment,
                       state: University.State,
                       address: University.Address,
                       created: University.Created
                       )

object University {
  def create(
              id: java.util.UUID,
              code: String,
              name: String,
              yearOfEstablishment: String,
              state: String,
              address: String,
              created: java.time.LocalDateTime
            ): University = {
    University(
      Id(id),
      Code(code),
      Name(name),
      YearOfEstablishment(yearOfEstablishment),
      State(state),
      Address(address),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Code(value: String) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class YearOfEstablishment(value: String) extends AnyVal

  case class State(value: String) extends AnyVal

  case class Address(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
