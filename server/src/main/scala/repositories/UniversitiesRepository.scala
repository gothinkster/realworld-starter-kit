package repositories

import java.util.UUID

import com.realworld.shared.models.University

import scala.concurrent.Future

trait UniversitiesRepository extends Repository {
  import ctx._
  val universities = quote(querySchema[University]("universities"))


  def byId(uuid: UUID) = quote{
    universities.filter(_.id == lift(University.Id(uuid)))
  }
}
