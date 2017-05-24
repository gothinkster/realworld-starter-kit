package utils.auth

import com.mohiva.play.silhouette.api.Env
import com.mohiva.play.silhouette.impl.authenticators.{CookieAuthenticator, JWTAuthenticator}
import models.UserIdentity

/**
 * The default env.
 */
trait DefaultEnv extends Env {
  type I = UserIdentity
  type A = CookieAuthenticator
}
