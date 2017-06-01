package com.omis.client

import com.omis.User
import com.omis.client.handlers.LoginUser
import com.omis.client.router.ApplicationRouter
import com.omis.client.services.{CoreApi, OmisCircuit}
import org.scalajs.dom
import play.api.libs.json.Json
import diode.AnyAction._
import org.scalajs.dom.window

import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
import scala.scalajs.js

object Omis extends js.JSApp {

  def main(): Unit = {
    //    require()
    println("Application started")
    CoreApi.authenticate.map { e =>
      val user = Json.parse(e).validate[User].get
      OmisCircuit.dispatch(LoginUser(user))
      dom.window.location.href = "/#/dashboard"
      //            window.location.replace("")
    }

    ApplicationRouter.router().renderIntoDOM(dom.document.getElementById("root"))
  }
}
