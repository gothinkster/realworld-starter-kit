package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// EmployeesSalaries
/////////////////////////////////////////////////////
case class EmployeeSalary(
                           id: EmployeeSalary.Id,
                           employeeId: Employee.Id,
                           employeeGradeId: EmployeeGrade.Id,
                           employeeDesignationId: EmployeeDesignation.Id,
                           appraisalDueOn: Option[EmployeeSalary.AppraisalDueOn],
                           created: EmployeeSalary.Created
                            )

object EmployeeSalary {
  def create(
              id: java.util.UUID,
              employeeId: java.util.UUID,
              employeeGradeId: java.util.UUID,
              employeeDesignationId: java.util.UUID,
              appraisalDueOn: Option[java.time.LocalDateTime],
              created: java.time.LocalDateTime
            ): EmployeeSalary = {
    EmployeeSalary(
      Id(id),
      Employee.Id(employeeId),
      EmployeeGrade.Id(employeeGradeId),
      EmployeeDesignation.Id(employeeDesignationId),
      appraisalDueOn.map(AppraisalDueOn.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class AppraisalDueOn(value: java.time.LocalDateTime) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
