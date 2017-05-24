package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// EmployeesDesignations
/////////////////////////////////////////////////////
case class EmployeeDesignation(
                                id: EmployeeDesignation.Id,
                                name: EmployeeDesignation.Name,
                                created: EmployeeDesignation.Created
                                )

object EmployeeDesignation {
  def create(id: java.util.UUID, name: String, created: java.time.LocalDateTime): EmployeeDesignation = {
    EmployeeDesignation(Id(id), Name(name), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Name(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
