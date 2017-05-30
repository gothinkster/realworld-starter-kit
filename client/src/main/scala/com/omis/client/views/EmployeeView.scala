package com.omis.client.views

import com.omis.Employee
import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._

object EmployeeView {

  case class Props(routerCtl: RouterCtl[Loc], employee: Employee)
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
              <.h1(^.className := "text-xs-center", "Profile"),
              <.form(
                <.fieldset(
                  /*<.fieldset(
                  ^.className := "form-group",
                  <.input(^.className := "form-control", ^.`type` := "text", ^.placeholder := "URL of profile picture", ^.value
                  :=p.employee.URL of profile picture)
                ),*/
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "First Name",
                      ^.value := p.employee.firstName)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Last Name",
                      ^.value := p.employee.lastName)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "University Code",
                      ^.value := p.employee.registrationCode)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Faculty Code",
                      ^.value := "FCA")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Code",
                      ^.value := "DCA")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Employee Grade",
                      ^.value := "A")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Salary",
                      ^.value := p.employee.salary)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Pay Scale",
                      ^.value := p.employee.payScale)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.textarea(^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Short bio",
                      ^.value := p.employee.shortbio)
                  ),
                  <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Request Profile Update")
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
