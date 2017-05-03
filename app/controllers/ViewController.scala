package controllers

import com.mohiva.play.silhouette.api.Silhouette
import play.api.Configuration
import play.api.i18n.{I18nSupport, MessagesApi}
import utils.auth.DefaultEnv
import scala.concurrent.{ExecutionContext, Future}

/**
 * Created by shubham.k on 27-02-2017.
 */
class ViewController(
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv],
  implicit val webJarAssets: WebJarAssets,
  implicit val config: Configuration,
  implicit val ec: ExecutionContext
)
    extends BaseController(silhouette) with I18nSupport {

  def index = withoutSession("index") { implicit request =>
    Future(Ok(views.html.app()))
  }

}
