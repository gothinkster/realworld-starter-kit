package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._

object NewEmployee {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State()

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(
        ^.className := "settings-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-6 offset-md-3 col-xs-12",
              <.h1(^.className := "text-xs-center", "New Employee"),
              <.form(
                <.fieldset(
                  /*<.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control", ^.`type` := "text", ^.placeholder := "URL of profile picture")
                  ),*/
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "First Name")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Last Name")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "University Code")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Faculty Code")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Code")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Employee Grade")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Salary")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Pay Scale")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.textarea(^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Short bio")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Registration ID")
                  ),
                  <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Add Employee")
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Settings")
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}
