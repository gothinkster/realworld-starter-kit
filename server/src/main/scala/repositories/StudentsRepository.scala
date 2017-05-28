package repositories

import java.util.UUID

trait StudentsRepository extends Repository {
  import ctx._
  val students = quote(querySchema[Student]("students"))

  def byId(uuid: UUID) = quote {
    students.filter(_.id == lift(uuid))
  }

  /*def byCode(code: String) = quote {
    students.filter(_.code ==lift(code))
  }*/

}
