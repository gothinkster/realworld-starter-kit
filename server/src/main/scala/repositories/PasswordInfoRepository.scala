package repositories

import java.util.UUID

import scala.concurrent.Future

trait PasswordInfoRepository extends Repository {
  import ctx._

  val pwInfo = quote(querySchema[UserPasswordInfo]("password_info"))

  def byUserId(userId: UUID) = quote {
    pwInfo.filter(_.userId == lift(userId))
  }
}
