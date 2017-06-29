package com.omis.client.handlers

import com.omis.User
import com.omis.client.RootModels.UserRootModel
import com.omis.client.services.CoreApi
import diode.{ActionHandler, ActionResult, ModelRW}
import org.scalajs.dom.window

case class LoginUser(user: User)

case class LogoutUser()

class UserHandler[M](modelRW: ModelRW[M, UserRootModel]) extends ActionHandler(modelRW) {
  override def handle: PartialFunction[Any, ActionResult[M]] = {
    case LoginUser(user) =>
      updated(value.copy(user = user, isLoggedIn = true))

    case LogoutUser() =>
      // todo: Cancel all subscribe request for all sessions
      window.localStorage.clear()
      CoreApi.logout()
      updated(value.copy(isLoggedIn = false))

  }
}

