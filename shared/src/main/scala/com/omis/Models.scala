package com.omis

import java.util.UUID

import play.api.libs.json.Json

case class Employee(empId:UUID, firstName: String, lastName: String, university: String, faculty: String, department: String,
                    grade: String, salary: String, payScale: String, shortbio: String,
                    since: String, registrationCode: String, imgUrl: String)

case class UserReg(regCode: String, password: String)

object UserReg{
  implicit val format = Json.format[UserReg]
}
