package services

import java.util.UUID
import db.DbContext
import repositories.{FacultiesRepository, Faculty, UniversitiesRepository}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class FacultyService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends FacultiesRepository {

  import ctx._

  override def create(faculty: Faculty): Future[UUID] = {
    val id = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(faculties.insert(lift(faculty.copy(id = id, created = created)))).map {
      _ => id
    }
  }
  def yo() = {
    println("yo")
  }
  def findById(uuid: UUID): Future[Option[Faculty]] = run(byId(uuid)).map(_.headOption)
  def findByCode(code: String): Future[Option[Faculty]] = run(byCode(code)).map(_.headOption)
}
