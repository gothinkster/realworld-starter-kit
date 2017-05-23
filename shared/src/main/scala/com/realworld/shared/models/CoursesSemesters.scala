package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// CoursesSemesters
/////////////////////////////////////////////////////
case class CoursesSemesters(
                             id: CoursesSemesters.Id,
                             courseId: Courses.Id,
                             semesterId: Semesters.Id,
                             created: CoursesSemesters.Created
                           )

object CoursesSemesters {
  def create(
              id: java.util.UUID,
              courseId: java.util.UUID,
              semesterId: java.util.UUID,
              created: java.time.LocalDateTime
            ): CoursesSemesters = {
    CoursesSemesters(Id(id), Courses.Id(courseId), Semesters.Id(semesterId), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
