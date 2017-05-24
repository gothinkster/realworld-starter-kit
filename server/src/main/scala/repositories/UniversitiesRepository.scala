package repositories

import com.realworld.shared.models.University

trait UniversitiesRepository extends Repository {
  import ctx._
  val universities = quote(querySchema[University]("universities"))
}
