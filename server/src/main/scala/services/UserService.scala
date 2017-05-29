package services

import java.util.UUID

import db.DbContext
import repositories.{User, UserRepository}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class UserService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends UserRepository {
  import ctx._
  override def createUserWithRole(role: String): Future[UUID] = {
    val id = UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(users.insert(lift(User(id, role, created)))).map(_ => id)
  }
  def yo() = println("yo from user service")
}
