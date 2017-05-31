package services

import java.time.LocalDateTime

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO
import db.DbContext
import repositories.{PasswordInfoRepository, UserPasswordInfo}
import scala.concurrent.{ExecutionContext, Future}

class PasswordInfoService(val ctx: DbContext, userService: UserService)(implicit val executionContext: ExecutionContext) extends DelegableAuthInfoDAO[PasswordInfo] with PasswordInfoRepository {
  import ctx._

  override def add(loginInfo: LoginInfo, authInfo: PasswordInfo) = {
    userService.findUserByProvideKey(loginInfo.providerKey) flatMap {
      case Some(user) => run(pwInfo.insert(lift(
        UserPasswordInfo(
          user.id,
          authInfo.hasher,
          authInfo.password,
          authInfo.salt,
          LocalDateTime.now()
        )
      )))
        .map(_ => authInfo)
      case None => Future(authInfo)
    }

  }

  override def find(loginInfo: LoginInfo) = {
    userService.findUserByProvideKey(loginInfo.providerKey) flatMap {
      case Some(user) => {
        for {
          e <- run(byUserId(user.id)).map(_.headOption)
        } yield {
          Some(PasswordInfo(e.get.hasher, e.get.password, e.get.salt))
        }
      }
      case None => Future(None)
    }
  }

  override def remove(loginInfo: LoginInfo) = ???

  override def save(loginInfo: LoginInfo, authInfo: PasswordInfo) = ???

  override def update(loginInfo: LoginInfo, authInfo: PasswordInfo) = ???
}
