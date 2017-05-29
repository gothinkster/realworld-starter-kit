package repositories

import java.util.UUID

import scala.concurrent.Future

trait StudentsRepository extends Repository {
  import ctx._
  val students = quote(querySchema[Student]("students"))

  def create(student: Student): Future[UUID]

  def byId(uuid: UUID) = quote {
    students.filter(_.id == lift(uuid))
  }

}
