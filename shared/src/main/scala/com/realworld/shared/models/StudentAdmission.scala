package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// StudentAdmission
/////////////////////////////////////////////////////
case class StudentAdmission(
                             id: StudentAdmission.Id,
                             departmentId: Department.Id,
                             studentId: Student.Id,
                             created: StudentAdmission.Created
                           )

object StudentAdmission {
  def create(
              id: java.util.UUID,
              departmentId: java.util.UUID,
              studentId: java.util.UUID,
              created: java.time.LocalDateTime
            ): StudentAdmission = {
    StudentAdmission(
      Id(id),
      Department.Id(departmentId),
      Student.Id(studentId),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
