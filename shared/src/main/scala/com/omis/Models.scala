package com.omis

import java.util.UUID

import play.api.libs.json.Json

case class EmpRegModel(firstName: String, lastName: String, department: String,
                       grade: String, salary: String, payScale: String, shortbio: String,
                       employeeSince: String, role: String, avatar: String)

object EmpRegModel {
  implicit val format = Json.format[EmpRegModel]
}


case class EmployeeModel(empId:UUID, firstName: String, lastName: String,
                         departmentName: String, departmentCode: String, registrationCode: String,
                         grade: String, salary: String, payScale: String, shortbio: String,
                         employeeSince: String, role: String, avatar: String)

object EmployeeModel {
  implicit val format = Json.format[EmployeeModel]
}

case class UserReg(regCode: String, password: String)

object UserReg{
  implicit val format = Json.format[UserReg]
}

case class User(id: java.util.UUID, role: String, created: String, firstName: String,
                lastName: String, avatar: String)

object User {
  implicit val format = Json.format[User]
}
