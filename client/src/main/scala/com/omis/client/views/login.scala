package com.omis.client.views

/**
 * Created by shubham.k on 28-05-2017.
 */
import com.omis.client.handlers.LoginUser
import com.omis.client.router.ApplicationRouter
import com.omis.{User, UserReg}
import com.omis.client.router.ApplicationRouter.Loc
import com.omis.client.services.{CoreApi, OmisCircuit}
import japgolly.scalajs.react
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import org.scalajs.dom.window

import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
import japgolly.scalajs.react.extra.router.RouterCtl
import play.api.libs.json.Json
import diode.AnyAction._
import org.scalajs.dom

object Login {

  case class Props(routerCtl: RouterCtl[Loc])

  //implicit val reusabilityProps: Reusability[Props] =
  //  Reusability.caseClass

  case class State(userReg: UserReg)

  case class Backend(t: BackendScope[Props, State]) {

    def updateRegCode(event: ReactEventFromInput) = {
      val value = event.target.value
      println("yo")
      t.modState(s => s.copy(userReg = s.userReg.copy(regCode = value)))
    }
    def updatePassword(event: ReactEventFromInput) = {
      val value = event.target.value
      t.modState(s => s.copy(userReg = s.userReg.copy(password = value)))
    }
    def loginUser(event: ReactEventFromInput) = {
      event.preventDefault()
      t.state.map(s => CoreApi.login(s.userReg)
        .map { s =>
          window.localStorage.setItem("X-Auth-Token", s)
          dom.window.location.href = "/"
        }) >> react.Callback.empty
    }
    def render(p: Props, s: State): VdomElement =
      <.div(
        ^.className := "auth-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-6 offset-md-3 col-xs-12",
              <.h1(^.className := "text-xs-center", "Login"),
              <.p(
                ^.className := "text-xs-center",
                <.a(^.href := "", "Don't have an account?")
              ),
              /*<.ul(
                ^.className := "error-messages",
                <.li("That email is already taken")
              ),*/
              <.form(
                <.fieldset(
                  ^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Registration Id",
                    ^.`type` := "text", ^.value := s.userReg.regCode, ^.onChange ==> updateRegCode)
                ),
                <.fieldset(
                  ^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Password",
                    ^.`type` := "password", ^.value := s.userReg.password, ^.onChange ==> updatePassword)
                ),
                <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Login", ^.onClick ==> loginUser)
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Login")
    .initialState(State(UserReg("", "")))
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}
