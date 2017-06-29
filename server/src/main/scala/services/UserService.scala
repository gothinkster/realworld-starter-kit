package services

import java.util.UUID

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService
import db.DbContext
import repositories.{User, UserLoginInfo, UserPasswordInfo, UserRepository}
import utils.AppLogger

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class UserService(val ctx: DbContext)(implicit val ec: ExecutionContext) extends UserRepository with IdentityService[User] with AppLogger {
  import ctx._
  override def createUser(role: String, firstName: String, lastName: String, avatar: String): Future[UUID] = {
    val id = UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    run(users.insert(lift(User(id, role, firstName, lastName, avatar, created)))).map(_ => id)
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

  def updateUser(userId: UUID, role: String, firstName: String, lastName: String, avatar: String) = {
    findById(userId).map {
      case Some(user) => ctx.run(users.filter(_.id == lift(userId))
        .update(lift(user.copy(role = role, firstName = firstName, lastName = lastName, avatar = avatar))))
      case None => log.error(s"user not found for user id ${userId}")
    }
  }

  def findById(userId: UUID) = ctx.run(byId(userId)).map(_.headOption)

  def retrieve(loginInfo: LoginInfo): Future[Option[User]] = findUserByProvideKey(loginInfo.providerKey)

}
