package controllers

import com.mohiva.play.silhouette.api.util.PasswordHasherRegistry
import com.mohiva.play.silhouette.api.{LoginEvent, LoginInfo, SignUpEvent, Silhouette}
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import com.omis.UserReg
import play.api.i18n.{I18nSupport, Messages, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.Action
import services.{PasswordInfoService, UserService}
import utils.auth.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}

class RegistrationController(userService: UserService, passwordInfoService: PasswordInfoService,
    val messagesApi: MessagesApi,
    hasherReg: PasswordHasherRegistry,
    silhouette: Silhouette[DefaultEnv])(implicit val ec: ExecutionContext) extends BaseController(silhouette) with I18nSupport {
  def submit = Action.async(parse.json) { implicit request =>
    request.body.validate[UserReg].map { data =>
      val loginInfo = LoginInfo(CredentialsProvider.ID, data.regCode)
      userService.retrieve(loginInfo).flatMap {
        case Some(user) =>
          val passwordInfo = hasherReg.current.hash(data.password)
          passwordInfoService.add(loginInfo, passwordInfo)
          Future.successful(BadRequest(Json.obj("message" -> Messages("User already registered"))))
          for {
            _ <- passwordInfoService.add(loginInfo, passwordInfo)
            authenticator <- silhouette.env.authenticatorService.create(loginInfo)
            token <- silhouette.env.authenticatorService.init(authenticator)
          } yield {
            silhouette.env.eventBus.publish(SignUpEvent(user, request))
            silhouette.env.eventBus.publish(LoginEvent(user, request))
            Ok(Json.obj("token" -> token))
          }
        case None =>
          Future.successful(BadRequest(Json.obj("message" -> Messages("User not found."))))
      }
    }.recoverTotal {
      case error =>
        Future.successful(Unauthorized(Json.obj("message" -> Messages("Invalid data"))))
    }
  }

}
