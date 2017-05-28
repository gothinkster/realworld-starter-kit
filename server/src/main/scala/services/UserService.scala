package services

import java.util.UUID

import com.realworld.shared.models.User
import db.DbContext
import repositories.UserRepository

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class UserService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends UserRepository {
  import ctx._
  override def createUserWithRole(role: String): Future[UUID] = {
    val id = UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(users.insert(lift(User(UUID.randomUUID(), role, created)))).map(_ => id)
  }
  def yo() = println("yo from user service")
}
