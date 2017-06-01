package controllers

import com.mohiva.play.silhouette.api.exceptions.ProviderException
import com.mohiva.play.silhouette.api.util.{Clock, Credentials, PasswordHasher}
import com.mohiva.play.silhouette.api._
import com.mohiva.play.silhouette.impl.authenticators.{CookieAuthenticator, JWTAuthenticator}
import com.mohiva.play.silhouette.impl.exceptions.IdentityNotFoundException
import com.mohiva.play.silhouette.impl.providers.CredentialsProvider
import com.omis.{User, UserReg}
import org.joda.time.DateTime
import play.api.Configuration
import play.api.i18n.{I18nSupport, Messages, MessagesApi}
import play.api.libs.json.Json
import play.api.mvc.Action
import _root_.services.{PasswordInfoService, UserService}
import utils.auth.DefaultEnv
import net.ceedubs.ficus.Ficus._

import scala.concurrent.duration.FiniteDuration
import scala.concurrent.{ExecutionContext, Future}

class AuthController(userService: UserService, passwordInfoService: PasswordInfoService,
    val messagesApi: MessagesApi,
    passwordHasher: PasswordHasher,
    silhouette: Silhouette[DefaultEnv],
    credentialsProvider: CredentialsProvider,
    configuration: Configuration, clock: Clock)(implicit val ec: ExecutionContext) extends BaseController(silhouette) with I18nSupport {
  def login = Action.async(parse.json) { implicit request =>
    request.body.validate[UserReg].map { data =>
      credentialsProvider.authenticate(Credentials(data.regCode, data.password)).flatMap { loginInfo =>
        userService.retrieve(loginInfo).flatMap {
          case Some(user) => silhouette.env.authenticatorService.create(loginInfo).map {
            case authenticator => createAuthenticator(authenticator)
          }.flatMap { authenticator =>
            silhouette.env.eventBus.publish(LoginEvent(user, request))
            silhouette.env.authenticatorService.init(authenticator).map { token =>
              Ok(token)
            }
          }
          case None => Future.failed(new IdentityNotFoundException("Couldn't find user"))
        }
      }.recover {
        case e: ProviderException =>
          Unauthorized(Json.obj("message" -> Messages("invalid.credentials")))
      }
    }.recoverTotal {
      case error =>
        Future.successful(Unauthorized(Json.obj("message" -> Messages("invalid.credentials"))))
    }
  }

  private def createAuthenticator(authenticator: JWTAuthenticator) = {
    authenticator.copy(
      expirationDateTime = rememberMeParams._1,
      idleTimeout = rememberMeParams._2
    )
  }

  private lazy val rememberMeParams: (DateTime, Option[FiniteDuration], Option[FiniteDuration]) = {
    val cfg = configuration.getConfig("silhouette.authenticator.rememberMe").get.underlying
    (
      clock.now.plusSeconds(cfg.as[FiniteDuration]("authenticatorExpiry").toSeconds.toInt),
      cfg.getAs[FiniteDuration]("authenticatorIdleTimeout"),
      cfg.getAs[FiniteDuration]("cookieMaxAge")
    )
  }

  def authenticate = withSession("authenticate") {
    req =>
      Future(Ok(Json.toJson(User(req.identity.id, req.identity.role, req.identity.created.toString))))
  }

  def logout = silhouette.SecuredAction.async { implicit request =>
    silhouette.env.eventBus.publish(LogoutEvent(request.identity, request))
    silhouette.env.authenticatorService.discard(request.authenticator, Ok)
  }
}
