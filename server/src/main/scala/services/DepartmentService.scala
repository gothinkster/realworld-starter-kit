package services

import java.util.UUID

import com.realworld.shared.models.{Department, Faculty}
import db.DbContext
import repositories.{DepartmentsRepository, FacultiesRepository}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class DepartmentService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends DepartmentsRepository {

  import ctx._

  override def create(department: Department): Future[UUID] = {
    val id = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(departments.insert(lift(department.copy(id = id, created = created)))).map {
      _ => id
    }
  }

  def findById(uuid: UUID): Future[Option[Department]] = run(byId(uuid)).map(_.headOption)
  def findByCode(code: String): Future[Option[Department]] = run(byCode(code)).map(_.headOption)
}
