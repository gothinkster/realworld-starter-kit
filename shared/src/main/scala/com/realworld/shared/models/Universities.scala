package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Universities
/////////////////////////////////////////////////////
case class Universities(
                         id: Universities.Id,
                         code: Universities.Code,
                         name: Universities.Name,
                         yearOfEstablishment: Universities.YearOfEstablishment,
                         state: Universities.State,
                         address: Universities.Address,
                         created: Universities.Created
                       )

object Universities {
  def create(
              id: java.util.UUID,
              code: String,
              name: String,
              yearOfEstablishment: String,
              state: String,
              address: String,
              created: java.util.Date
            ): Universities = {
    Universities(
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

  case class Created(value: java.util.Date) extends AnyVal

}
