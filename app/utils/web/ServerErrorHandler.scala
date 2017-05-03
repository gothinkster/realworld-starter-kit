package utils.web

import org.slf4j.LoggerFactory
import play.api._
import play.api.http.DefaultHttpErrorHandler
import play.api.mvc.Results._
import play.api.mvc._
import play.api.routing.Router
import play.core.SourceMapper

import scala.concurrent.Future

/**
 * Created by shubham.k on 03-01-2017.
 */
class ServerErrorHandler(
    env: play.api.Environment, config: Configuration,
    sourceMapper: Option[SourceMapper], router: Option[Router]
) extends DefaultHttpErrorHandler(env, config, sourceMapper, router) {

  private val log = LoggerFactory.getLogger(classOf[ServerErrorHandler])

  override def onClientError(request: RequestHeader, statusCode: Int, message: String) = {
    Future.successful(
      Status(statusCode)("A client error occurred: " + message)
    )
  }

  override def onServerError(request: RequestHeader, exception: Throwable) = {
    log.error("Server error " + exception.getMessage + "for uri" + request.uri)
    Future.successful(
      InternalServerError("A server error occurred: " + exception.getMessage)
    )
  }
}
