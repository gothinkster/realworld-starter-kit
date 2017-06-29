package forms

import com.mohiva.play.silhouette.api.util.Credentials
import play.api.data.Forms._
import play.api.data._

object UserForms {
  val userAuthForm = Form(mapping(
    "registrationNumber" -> nonEmptyText,
    "password" -> nonEmptyText
  )(Credentials.apply)(Credentials.unapply))
}
