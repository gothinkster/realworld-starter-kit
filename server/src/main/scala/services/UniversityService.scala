package services

import db.DbContext
import repositories.UniversitiesRepository
import scala.concurrent.ExecutionContext

/**
 * .
 */
class UniversityService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends UniversitiesRepository {
  //  val university = quote(querySchema[University]("universities"))
  //  def addUser(user: User) = ctx.run(users.)
  //  def insertUniversity(university: University) =
}
