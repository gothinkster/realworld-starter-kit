package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// Employees
/////////////////////////////////////////////////////
case class Employees(
                      id: Employees.Id,
                      userId: Option[Users.Id],
                      departmentId: Option[Departments.Id],
                      employeeSince: Option[Employees.EmployeeSince],
                      created: Employees.Created
                    )

object Employees {
  def create(
              id: java.util.UUID,
              userId: Option[java.util.UUID],
              departmentId: Option[java.util.UUID],
              employeeSince: Option[java.util.Date],
              created: java.util.Date
            ): Employees = {
    Employees(
      Id(id),
      userId.map(Users.Id.apply),
      departmentId.map(Departments.Id.apply),
      employeeSince.map(EmployeeSince.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class EmployeeSince(value: java.util.Date) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
