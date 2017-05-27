package com.realworld.shared.models


case class Course(id: java.util.UUID, code: String, name: String,
                  created: java.time.LocalDateTime)

case class CourseInstructor(id: java.util.UUID, courseId: java.util.UUID, instructorId: java.util.UUID,
                            created: java.time.LocalDateTime)

case class CourseSemester(id: java.util.UUID, courseId: java.util.UUID, semesterId: java.util.UUID,
                          created: java.time.LocalDateTime)

case class CourseStudent(id: java.util.UUID, courseId: java.util.UUID, studentId: java.util.UUID,
                         created: java.time.LocalDateTime)

case class Department(id: java.util.UUID, facultyId: java.util.UUID, name: String, yearOfEstablishment: String, address: String,
                      created: java.time.LocalDateTime)

case class Employee( id: java.util.UUID, registrationNumber: String, empGroup: String, userId: java.util.UUID, departmentId: java.util.UUID,
                     employeeSince: Option[java.time.LocalDateTime], created: java.time.LocalDateTime)

case class EmployeeDesignation(id: java.util.UUID, name: String, created: java.time.LocalDateTime)

case class EmployeeGrade( id: java.util.UUID, name: String, payBandMin: Option[Int], payBandMax: Option[Int],
                          created: java.time.LocalDateTime)

case class EmployeeSalary( id: java.util.UUID, employeeId: java.util.UUID, employeeGradeId: java.util.UUID,
                           employeeDesignationId: java.util.UUID, appraisalDueOn: Option[java.time.LocalDateTime],
                           created: java.time.LocalDateTime)

case class Faculty( id: java.util.UUID, universityId: java.util.UUID, code: String, name: String,
                    addressOfFaculty: String, yearOfEstablishment: String, created: java.time.LocalDateTime)

case class PasswordInfo( userId: java.util.UUID, provider: String, key: String, hasher: String, password: String,
                         salt: Option[String], created: java.time.LocalDateTime)

case class Semester(id: java.util.UUID, session: String, semesterType: String, created: java.time.LocalDateTime)

case class Student(id: java.util.UUID, userId: java.util.UUID, created: java.time.LocalDateTime)

case class StudentAdmission( id: java.util.UUID, departmentId: java.util.UUID, studentId: java.util.UUID,
                             created: java.time.LocalDateTime)

case class StudentCourseResult( id: java.util.UUID, studentId: java.util.UUID, courseSemesterId: java.util.UUID, grade: String,
                                maximumMarks: String, marksObtained: String, created: java.time.LocalDateTime )

case class University(id: java.util.UUID, code: String, name: String, yearOfEstablishment: String, state: String, address: String,
                      created: java.time.LocalDateTime)

case class UniversityAllocatedLeaves(id: java.util.UUID, year: String, universityId: java.util.UUID, numberOfLeaves: Int,
                                     created: java.time.LocalDateTime)

case class User(id: java.util.UUID, role: String, created: java.time.LocalDateTime)

case class UserProfile(userId: java.util.UUID, address: Option[String], phoneNumber: Option[String], firstName: Option[String],
                        lastName: Option[String], imgUrl: Option[String], nationality: Option[String], fatherName: Option[String],
                        motherName: Option[String], created: java.time.LocalDateTime)