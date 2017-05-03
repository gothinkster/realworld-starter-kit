package services.silhouetteservices

import com.mohiva.play.silhouette.api.LoginInfo
import com.mohiva.play.silhouette.api.services.IdentityService
import models.UserIdentity

import scala.concurrent.{ExecutionContext, Future}

/**
 * Handles actions to users.
 *
 */
class SilhouetteIdentityService()(implicit val executionContext: ExecutionContext)
    extends IdentityService[UserIdentity] {
  /**
   * Retrieves a user that matches the specified login info.
   *
   * @param loginInfo The login info to retrieve a user.
   * @return The retrieved user or None if no user could be retrieved for the given login info.
   */

  def retrieve(loginInfo: LoginInfo): Future[Option[UserIdentity]] = Future(None)
}
