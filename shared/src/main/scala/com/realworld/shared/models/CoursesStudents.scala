package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// CoursesStudents
/////////////////////////////////////////////////////
case class CoursesStudents(
                            id: CoursesStudents.Id,
                            courseId: Option[CoursesStudents.CourseId],
                            studentId: Option[Students.Id],
                            created: CoursesStudents.Created
                          )

object CoursesStudents {
  def create(
              id: java.util.UUID,
              courseId: Option[java.util.UUID],
              studentId: Option[java.util.UUID],
              created: java.time.LocalDateTime
            ): CoursesStudents = {
    CoursesStudents(Id(id), courseId.map(CourseId.apply), studentId.map(Students.Id.apply), Created(created))
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class CourseId(value: java.util.UUID) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
