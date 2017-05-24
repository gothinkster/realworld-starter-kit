package models

import java.util.UUID

import com.mohiva.play.silhouette.api.Identity
import play.api.libs.json.{Format, Json}

/**
 * The user object.
 *
 * @param uuid The unique uuid of the user.
 */

case class UserIdentity(uuid: UUID, loginInfo: LoginInfo) extends Identity {
}
