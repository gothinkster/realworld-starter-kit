package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// StudentsCoursesResults
/////////////////////////////////////////////////////
case class StudentsCoursesResults(
                                   id: StudentsCoursesResults.Id,
                                   studentId: Students.Id,
                                   courseSemesterId: CoursesSemesters.Id,
                                   grade: StudentsCoursesResults.Grade,
                                   maximumMarks: StudentsCoursesResults.MaximumMarks,
                                   marksObtained: StudentsCoursesResults.MarksObtained,
                                   created: StudentsCoursesResults.Created
                                 )

object StudentsCoursesResults {
  def create(
              id: java.util.UUID,
              studentId: java.util.UUID,
              courseSemesterId: java.util.UUID,
              grade: String,
              maximumMarks: String,
              marksObtained: String,
              created: java.util.Date
            ): StudentsCoursesResults = {
    StudentsCoursesResults(
      Id(id),
      Students.Id(studentId),
      CoursesSemesters.Id(courseSemesterId),
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

  case class Created(value: java.util.Date) extends AnyVal

}
