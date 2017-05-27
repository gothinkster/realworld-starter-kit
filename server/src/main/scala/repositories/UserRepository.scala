package repositories

import java.util.UUID

import com.realworld.shared.models.{User}

import scala.concurrent.Future

trait UserRepository extends Repository {
  import ctx._
  val users = quote(querySchema[User]("users"))

  def byId(uuid: UUID) = quote {
    users.filter(_.id == lift(uuid))
  }

  def createUserWithRole(role: String): Future[UUID]
  /*def byUserOCde (code : String) = quote {
    users.filter(_.userCode == lift (code))
  }*/
}
