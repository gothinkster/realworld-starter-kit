package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// CoursesInstructors
/////////////////////////////////////////////////////
case class CoursesInstructors(
                               id: CoursesInstructors.Id,
                               courseId: Courses.Id,
                               instructorId: Employees.Id,
                               created: CoursesInstructors.Created
                             )

object CoursesInstructors {
  def create(
              id: java.util.UUID,
              courseId: java.util.UUID,
              instructorId: java.util.UUID,
              created: java.time.LocalDateTime
            ): CoursesInstructors = {
    CoursesInstructors(Id(id), Courses.Id(courseId), Employees.Id(instructorId), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
