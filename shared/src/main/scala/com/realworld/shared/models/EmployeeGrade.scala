package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// EmployeesGrades
/////////////////////////////////////////////////////
case class EmployeeGrade(
                          id: EmployeeGrade.Id,
                          name: EmployeeGrade.Name,
                          payBandMin: Option[EmployeeGrade.PayBandMin],
                          payBandMax: Option[EmployeeGrade.PayBandMax],
                          created: EmployeeGrade.Created
                          )

object EmployeeGrade {
  def create(
              id: java.util.UUID,
              name: String,
              payBandMin: Option[Int],
              payBandMax: Option[Int],
              created: java.time.LocalDateTime
            ): EmployeeGrade = {
    EmployeeGrade(
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

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
