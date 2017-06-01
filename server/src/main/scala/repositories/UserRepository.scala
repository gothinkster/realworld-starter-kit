package repositories

import java.util.UUID

import com.omis.EmpDetails

import scala.concurrent.Future

trait UserRepository extends Repository {
  import ctx._
  val users = quote(querySchema[User]("users"))
  val loginInfos = quote(querySchema[UserLoginInfo]("login_info"))
  val pwInfo = quote(querySchema[UserPasswordInfo]("password_info"))
  val emp = quote(querySchema[Employee]("employees"))
  def byId(uuid: UUID) = quote {
    users.filter(_.id == lift(uuid))
  }

  def findLoginInfoByProviderKey(providerKey: String) = quote {
    loginInfos.filter(_.providerKey == lift(providerKey))
  }

  def createUserWithRole(role: String): Future[UUID]

  def createLoginInfo(loginInfo: UserLoginInfo): Future[UUID]

  def createPasswordInfo(passwordInfo: UserPasswordInfo): Future[UUID]

}
