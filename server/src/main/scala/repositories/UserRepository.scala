package repositories

import java.util.UUID

import com.realworld.shared.models.{University, User}

trait UserRepository extends Repository {
  import ctx._
  val users = quote(querySchema[User]("users"))

  def byId(uuid: UUID) = quote {
    users.filter(_.id == lift(uuid))
  }
  /*def byUserOCde (code : String) = quote {
    users.filter(_.userCode == lift (code))
  }*/
}
