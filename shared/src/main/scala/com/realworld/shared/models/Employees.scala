package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Employees
/////////////////////////////////////////////////////
case class Employees(
                      id: Employees.Id,
                      userId: Option[User.Id],
                      departmentId: Option[Departments.Id],
                      employeeSince: Option[Employees.EmployeeSince],
                      created: Employees.Created
                    )

object Employees {
  def create(
              id: java.util.UUID,
              userId: Option[java.util.UUID],
              departmentId: Option[java.util.UUID],
              employeeSince: Option[java.time.LocalDateTime],
              created: java.time.LocalDateTime
            ): Employees = {
    Employees(
      Id(id),
      userId.map(User.Id.apply),
      departmentId.map(Departments.Id.apply),
      employeeSince.map(EmployeeSince.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class EmployeeSince(value: java.time.LocalDateTime) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
