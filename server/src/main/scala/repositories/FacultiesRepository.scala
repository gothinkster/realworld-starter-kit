package repositories

import java.util.UUID
import scala.concurrent.Future

trait FacultiesRepository extends Repository {
  import ctx._
  val faculties = quote(querySchema[Faculty]("faculties"))

  def create(faculty: Faculty): Future[UUID]

  def byId(uuid: UUID) = quote {
    faculties.filter(_.id == lift(uuid))
  }

  def byCode(code: String) = quote {
    faculties.filter(_.code == lift(code))
  }

}
