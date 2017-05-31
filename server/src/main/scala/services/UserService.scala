package services

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService
import db.DbContext
import repositories.{UserPasswordInfo, User, UserLoginInfo, UserRepository}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class UserService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends UserRepository with IdentityService[User] {
  import ctx._
  override def createUserWithRole(role: String): Future[UUID] = {
    val id = UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(users.insert(lift(User(id, role, created)))).map(_ => id)
  }

  override def createLoginInfo(userLoginInfo: UserLoginInfo): Future[UUID] = {
    run(loginInfos.insert(lift(userLoginInfo))).map(_ => userLoginInfo.userId)
  }

  override def createPasswordInfo(passwordInfo: UserPasswordInfo): Future[UUID] = {
    run(pwInfo.insert(lift(passwordInfo))).map(_ => passwordInfo.userId)
  }

  def findUserByProvideKey(providerKey: String): Future[Option[User]] = {
    run(findLoginInfoByProviderKey(providerKey))
      .map(_.headOption).flatMap {
        case Some(userLoginInfo) => run(byId(userLoginInfo.userId)).map(_.headOption)
        case None => Future(None)
      }
  }

  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = findUserByProvideKey(loginInfo.providerKey)

}
