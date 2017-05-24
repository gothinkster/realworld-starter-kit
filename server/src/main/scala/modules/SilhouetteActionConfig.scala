package modules

import com.mohiva.play.silhouette.api.actions._
import com.softwaremill.macwire._
import play.api.i18n.{I18nComponents}
import utils.auth.{CustomSecuredErrorHandler, CustomUnsecuredErrorHandler}

trait SilhouetteActionConfig extends I18nComponents {
  //  def messageApi: MessagesApi
  lazy val securedErrorHandler: SecuredErrorHandler = wire[CustomSecuredErrorHandler]
  lazy val unSecuredErrorHandler: UnsecuredErrorHandler = wire[CustomUnsecuredErrorHandler]
  lazy val userAwareAction = new DefaultUserAwareAction(new DefaultUserAwareRequestHandler)
  lazy val securedAction: SecuredAction = new DefaultSecuredAction(new DefaultSecuredRequestHandler(securedErrorHandler))
  lazy val unsecuredAction: UnsecuredAction = new DefaultUnsecuredAction(new DefaultUnsecuredRequestHandler(unSecuredErrorHandler))
}
