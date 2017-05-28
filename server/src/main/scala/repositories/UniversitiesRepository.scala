package repositories

import java.util.UUID

import scala.concurrent.Future

trait UniversitiesRepository extends Repository {
  import ctx._
  val universities = quote(querySchema[University]("universities"))

  def create(university: University): Future[UUID]

  def byId(uuid: UUID) = quote {
    universities.filter(_.id == lift(uuid))
  }

  def byCode(code: String) = quote {
    universities.filter(_.code == lift(code))
  }

}
