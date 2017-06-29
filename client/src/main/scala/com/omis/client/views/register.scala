package com.omis.client.views

/**
 * Created by shubham.k on 28-05-2017.
 */
import com.omis.UserReg
import com.omis.client.router.ApplicationRouter.Loc
import com.omis.client.services.CoreApi
import japgolly.scalajs.react
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.extra.router.RouterCtl
import org.scalajs.dom
import org.scalajs.dom.window
import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue

object Register {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State(userReg: UserReg)

  final class Backend(t: BackendScope[Props, State]) {
    def updateRegCode(event: ReactEventFromInput) = {
      val value = event.target.value
      t.modState(s => s.copy(userReg = s.userReg.copy(regCode = value)))
    }
    def updatePassword(event: ReactEventFromInput) = {
      val value = event.target.value
      t.modState(s => s.copy(userReg = s.userReg.copy(password = value)))
    }
    def signUpUser(event: ReactEventFromInput) = {
      event.preventDefault()
      t.state.map(s => CoreApi.signUp(s.userReg)
        .map { s =>
          window.localStorage.setItem("X-Auth-Token", s)
          dom.window.location.href = "/"
        }) >> react.Callback.empty
    }
    def render(p: Props): VdomElement =
      <.div(
        ^.className := "auth-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-6 offset-md-3 col-xs-12",
              <.h1(^.className := "text-xs-center", "Sign up"),
              <.p(
                ^.className := "text-xs-center",
                <.a(^.href := "", "Have an account?")
              ),
              /*<.ul(
                ^.className := "error-messages",
                <.li("That email is already taken")
              ),*/
              <.form(
                <.fieldset(
                  ^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Registration Id", ^.`type` := "text", ^.onChange ==> updateRegCode)
                ),
                <.fieldset(
                  ^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Password", ^.`type` := "password", ^.onChange ==> updatePassword)
                ),
                <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Sign up", ^.onClick ==> signUpUser)
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
