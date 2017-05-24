package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// CoursesInstructors
/////////////////////////////////////////////////////
case class CourseInstructor(
                             id: CourseInstructor.Id,
                             courseId: Course.Id,
                             instructorId: Employee.Id,
                             created: CourseInstructor.Created
                             )

object CourseInstructor {
  def create(
              id: java.util.UUID,
              courseId: java.util.UUID,
              instructorId: java.util.UUID,
              created: java.time.LocalDateTime
            ): CourseInstructor = {
    CourseInstructor(Id(id), Course.Id(courseId), Employee.Id(instructorId), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
