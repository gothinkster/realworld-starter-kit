package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// Employees
/////////////////////////////////////////////////////
case class Employee(
                     id: Employee.Id,
                     userId: User.Id,
                     departmentId: Department.Id,
                     employeeSince: Option[Employee.EmployeeSince],
                     created: Employee.Created
                    )

object Employee {
  def create(
              id: java.util.UUID,
              userId: java.util.UUID,
              departmentId: java.util.UUID,
              employeeSince: Option[java.time.LocalDateTime],
              created: java.time.LocalDateTime
            ): Employee = {
    Employee(
      Id(id),
      User.Id(userId),
      Department.Id(departmentId),
      employeeSince.map(EmployeeSince.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class EmployeeSince(value: java.time.LocalDateTime) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
