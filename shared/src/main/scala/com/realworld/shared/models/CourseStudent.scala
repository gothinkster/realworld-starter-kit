package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// CoursesStudents
/////////////////////////////////////////////////////
case class CourseStudent(
                          id: CourseStudent.Id,
                          courseId: CourseStudent.CourseId,
                          studentId: Student.Id,
                          created: CourseStudent.Created
                          )

object CourseStudent {
  def create(
              id: java.util.UUID,
              courseId: java.util.UUID,
              studentId: java.util.UUID,
              created: java.time.LocalDateTime
            ): CourseStudent = {
    CourseStudent(Id(id), CourseId(courseId), Student.Id(studentId), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class CourseId(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
