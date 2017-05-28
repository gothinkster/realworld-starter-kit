package repositories

import java.util.UUID

import com.realworld.shared.models.{Department, Faculty}

import scala.concurrent.Future

trait DepartmentsRepository extends Repository {
  import ctx._
  val departments = quote(querySchema[Department]("departments"))

  def create(department: Department): Future[UUID]

  def byId(uuid: UUID) = quote {
    departments.filter(_.id == lift(uuid))
  }

  def byCode(code: String) = quote {
    departments.filter(_.code == lift(code))
  }

}
