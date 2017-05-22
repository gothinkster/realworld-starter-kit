package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// EmployeesSalaries
/////////////////////////////////////////////////////
case class EmployeesSalaries(
                              id: EmployeesSalaries.Id,
                              employeeId: Option[Employees.Id],
                              employeeGradeId: Option[EmployeesGrades.Id],
                              employeeDesignationId: Option[EmployeesDesignations.Id],
                              appraisalDueOn: Option[EmployeesSalaries.AppraisalDueOn],
                              created: EmployeesSalaries.Created
                            )

object EmployeesSalaries {
  def create(
              id: java.util.UUID,
              employeeId: Option[java.util.UUID],
              employeeGradeId: Option[java.util.UUID],
              employeeDesignationId: Option[java.util.UUID],
              appraisalDueOn: Option[java.util.Date],
              created: java.util.Date
            ): EmployeesSalaries = {
    EmployeesSalaries(
      Id(id),
      employeeId.map(Employees.Id.apply),
      employeeGradeId.map(EmployeesGrades.Id.apply),
      employeeDesignationId.map(EmployeesDesignations.Id.apply),
      appraisalDueOn.map(AppraisalDueOn.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class AppraisalDueOn(value: java.util.Date) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
