package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// CoursesSemesters
/////////////////////////////////////////////////////
case class CourseSemester(
                           id: CourseSemester.Id,
                           courseId: Course.Id,
                           semesterId: Semester.Id,
                           created: CourseSemester.Created
                           )

object CourseSemester {
  def create(
              id: java.util.UUID,
              courseId: java.util.UUID,
              semesterId: java.util.UUID,
              created: java.time.LocalDateTime
            ): CourseSemester = {
    CourseSemester(Id(id), Course.Id(courseId), Semester.Id(semesterId), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
