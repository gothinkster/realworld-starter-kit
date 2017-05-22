package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// EmployeesDesignations
/////////////////////////////////////////////////////
case class EmployeesDesignations(
                                  id: EmployeesDesignations.Id,
                                  name: EmployeesDesignations.Name,
                                  created: EmployeesDesignations.Created
                                )

object EmployeesDesignations {
  def create(id: java.util.UUID, name: String, created: java.util.Date): EmployeesDesignations = {
    EmployeesDesignations(Id(id), Name(name), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
