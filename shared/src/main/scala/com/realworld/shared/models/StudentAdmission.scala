package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// StudentAdmission
/////////////////////////////////////////////////////
case class StudentAdmission(
                             id: StudentAdmission.Id,
                             departmentId: Option[Departments.Id],
                             studentId: Option[Students.Id],
                             created: StudentAdmission.Created
                           )

object StudentAdmission {
  def create(
              id: java.util.UUID,
              departmentId: Option[java.util.UUID],
              studentId: Option[java.util.UUID],
              created: java.util.Date
            ): StudentAdmission = {
    StudentAdmission(
      Id(id),
      departmentId.map(Departments.Id.apply),
      studentId.map(Students.Id.apply),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
