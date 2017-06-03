package controllers

import com.mohiva.play.silhouette.api.Silhouette
import play.api.Configuration
import play.api.i18n.{I18nSupport, MessagesApi}
import utils.auth.DefaultEnv
import scala.concurrent.{ExecutionContext, Future}

class ViewController(
  val messagesApi: MessagesApi,
  silhouette: Silhouette[DefaultEnv],
  implicit val webJarAssets: WebJarAssets,
  implicit val config: Configuration,
  implicit val ec: ExecutionContext
)
    extends BaseController(silhouette) with I18nSupport {

  def index = withoutSession("index") { implicit request =>

    Future(Ok(html.app( /*bundleUrl("client")*/ )))
  }

  def bundleUrl(projectName: String): Option[String] = {
    val name = projectName.toLowerCase
    Seq(s"$name-opt-bundle.js", s"$name-fastopt-bundle.js")
      .find(name => getClass.getResource(s"/public/$name") != null)
      .map(controllers.routes.Assets.versioned(_).url)
  }

}
