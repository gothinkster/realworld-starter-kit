package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// StudentsCoursesResults
/////////////////////////////////////////////////////
case class StudentCourseResult(
                                id: StudentCourseResult.Id,
                                studentId: Student.Id,
                                courseSemesterId: CourseSemester.Id,
                                grade: StudentCourseResult.Grade,
                                maximumMarks: StudentCourseResult.MaximumMarks,
                                marksObtained: StudentCourseResult.MarksObtained,
                                created: StudentCourseResult.Created
                                 )

object StudentCourseResult {
  def create(
              id: java.util.UUID,
              studentId: java.util.UUID,
              courseSemesterId: java.util.UUID,
              grade: String,
              maximumMarks: String,
              marksObtained: String,
              created: java.time.LocalDateTime
            ): StudentCourseResult = {
    StudentCourseResult(
      Id(id),
      Student.Id(studentId),
      CourseSemester.Id(courseSemesterId),
      Grade(grade),
      MaximumMarks(maximumMarks),
      MarksObtained(marksObtained),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Grade(value: String) extends AnyVal

  case class MaximumMarks(value: String) extends AnyVal

  case class MarksObtained(value: String) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
