package services.silhouetteservices

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.util.PasswordInfo
import com.mohiva.play.silhouette.persistence.daos.DelegableAuthInfoDAO

import scala.concurrent.{ExecutionContext, Future}

class PasswordInfoService()(implicit val executionContext: ExecutionContext) extends DelegableAuthInfoDAO[PasswordInfo] {
  override def add(loginInfo: LoginInfo, authInfo: PasswordInfo) = ???

  override def find(loginInfo: LoginInfo) = ???

  override def remove(loginInfo: LoginInfo) = ???

  override def save(loginInfo: LoginInfo, authInfo: PasswordInfo) = ???

  override def update(loginInfo: LoginInfo, authInfo: PasswordInfo) = ???
}
