package services

import java.util.UUID

import db.DbContext
import repositories.{Department, DepartmentsRepository, Student, StudentsRepository}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class StudentService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends StudentsRepository {

  import ctx._

  override def create(student: Student): Future[UUID] = {
    val id = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(students.insert(lift(student.copy(id = id, created = created)))).map {
      _ => id
    }
  }
  def findById(uuid: UUID): Future[Option[Student]] = run(byId(uuid)).map(_.headOption)
}
