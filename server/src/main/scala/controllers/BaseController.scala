package controllers

import com.mohiva.play.silhouette.api.Silhouette
import com.mohiva.play.silhouette.api.actions.{SecuredRequest, UserAwareRequest}
import play.api.libs.json.{JsValue, Reads}
import play.api.mvc._
import utils.AppLogger
import utils.auth.DefaultEnv

import scala.concurrent.{Future}

abstract class BaseController(silhouette: Silhouette[DefaultEnv]) extends Controller with AppLogger {

  protected def unmarshalJsValue[R](request: Request[JsValue])(block: R => Future[Result])(implicit rds: Reads[R]): Future[Result] =
    request.body.validate[R](rds).fold(
      valid = block,
      invalid = e => {
      val error = e.mkString
      log.error(error)
      Future.successful(BadRequest(error))
    }
    )

  def withoutSession(action: String)(block: UserAwareRequest[DefaultEnv, AnyContent] => Future[Result]) = {
    silhouette.UserAwareAction.async { implicit request =>
      block(request)
    }
  }

  def withSession(action: String)(block: (SecuredRequest[DefaultEnv, AnyContent]) => Future[Result]) = {
    silhouette.UserAwareAction.async { implicit request =>
      request.identity match {
        case Some(u) =>
          val auth = request.authenticator.getOrElse(throw new IllegalStateException("You're not logged in."))
          block(SecuredRequest(u, auth, request))
        case None =>
          Future.successful(Unauthorized("You are not authorized to access this resource"))
      }
    }
  }

  def withAdminSession(action: String)(block: (SecuredRequest[DefaultEnv, AnyContent]) => Future[Result]) = {
    silhouette.UserAwareAction.async { implicit request =>
      request.identity match {
        case Some(u) =>
          if (u.role == "admin") {
            val auth = request.authenticator.getOrElse(throw new IllegalStateException("You're not logged in."))
            block(SecuredRequest(u, auth, request))
          } else {
            Future.successful(Unauthorized("You are not authorized to access this resource"))
          }

        case None =>
          Future.successful(Unauthorized("You are not authorized to access this resource"))
      }
    }
  }
}
