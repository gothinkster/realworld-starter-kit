package services

import java.util.UUID

import com.realworld.shared.models.University
import db.DbContext
import repositories.UniversitiesRepository

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class UniversityService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends UniversitiesRepository {

  import ctx._

  def create(university: University): Future[UUID] = {
    val id = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(universities.insert(lift(university.copy(id = id, created = created)))).map {
      _ => id
    }
  }

  def findById(uuid: UUID): Future[Option[University]] = run(byId(uuid)).map(_.headOption)
}
