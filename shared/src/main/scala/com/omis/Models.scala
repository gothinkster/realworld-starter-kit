package com.omis

import java.util.UUID

import play.api.libs.json.Json

case class EmpDetails(userId:UUID, firstName: String, lastName: String, department: String,
                      grade: String, salary: String, payScale: String, shortbio: String,
                      created: String)

object EmpDetails {
  implicit val format = Json.format[EmpDetails]
}

case class UserReg(regCode: String, password: String)

object UserReg{
  implicit val format = Json.format[UserReg]
}

case class User(id: java.util.UUID, role: String, created: String)

object User {
  implicit val format = Json.format[User]
}

case class UserProfile(userId: java.util.UUID, address: Option[String], phoneNumber: Option[String], firstName: Option[String],
                       lastName: Option[String], imgUrl: Option[String], nationality: Option[String], fatherName: Option[String],
                       motherName: Option[String], created: String, shortBio: Option[String])