package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// EmployeesGrades
/////////////////////////////////////////////////////
case class EmployeesGrades(
                            id: EmployeesGrades.Id,
                            name: EmployeesGrades.Name,
                            payBandMin: Option[EmployeesGrades.PayBandMin],
                            payBandMax: Option[EmployeesGrades.PayBandMax],
                            created: EmployeesGrades.Created
                          )

object EmployeesGrades {
  def create(
              id: java.util.UUID,
              name: String,
              payBandMin: Option[Int],
              payBandMax: Option[Int],
              created: java.util.Date
            ): EmployeesGrades = {
    EmployeesGrades(
      Id(id),
      Name(name),
      payBandMin.map(PayBandMin.apply),
      payBandMax.map(PayBandMax.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class PayBandMin(value: Int) extends AnyVal

  case class PayBandMax(value: Int) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
