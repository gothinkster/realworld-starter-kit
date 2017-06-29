package repositories

import java.time.LocalDateTime
import java.util.UUID

import com.mohiva.play.silhouette.api

case class Course(id: java.util.UUID, code: String, name: String, departmentId: UUID,
  created: java.time.LocalDateTime)

case class CourseInstructor(id: java.util.UUID, courseId: java.util.UUID, instructorId: java.util.UUID,
  created: java.time.LocalDateTime)

case class CourseStudent(id: java.util.UUID, courseId: java.util.UUID, studentId: java.util.UUID,
  created: java.time.LocalDateTime)

case class Department(id: java.util.UUID, facultyId: java.util.UUID, code: String, name: String, yearOfEstablishment: String, address: String,
  created: java.time.LocalDateTime)

case class Employee(id: java.util.UUID, empGroup: String, userId: java.util.UUID, departmentId: java.util.UUID,
  employeeSince: java.time.LocalDate, created: java.time.LocalDateTime, registrationNumber: String,
  grade: String, salary: String, payScale: String, shortBio: String)

case class Faculty(id: java.util.UUID, universityId: java.util.UUID, code: String, name: String,
  addressOfFaculty: String, yearOfEstablishment: String, created: java.time.LocalDateTime)

case class UserPasswordInfo(userId: UUID, hasher: String, password: String, salt: Option[String], created: LocalDateTime)

case class Student(id: java.util.UUID, userId: java.util.UUID, registration_number: String, department_id: UUID,
  student_group: String, date_of_enrollment: String, created: java.time.LocalDateTime)

case class University(id: java.util.UUID, code: String, name: String, yearOfEstablishment: String, state: String, address: String,
  created: java.time.LocalDateTime)

case class User(id: java.util.UUID, role: String, firstName: String, lastName: String, avatar: String, created: java.time.LocalDateTime) extends api.Identity

case class UserLoginInfo(userId: UUID, providerID: String = "credentials", providerKey: String)