package com.omis.client.views

import com.omis.client.RootModels.EmployeeRootModel
import com.omis.client.handlers.{RefreshEmployee}
import com.omis.client.router.ApplicationRouter.Loc
import diode.data.Pot
import diode.react.ModelProxy
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import diode.react.ReactPot._
import diode.AnyAction._

object EmployeeView {

  case class Props(routerCtl: RouterCtl[Loc], proxy: ModelProxy[Pot[EmployeeRootModel]])

  case class State()

  final class Backend($: BackendScope[Props, Unit]) {

    def componentDidMount(props: Props) = Callback.when(!props.proxy().isPending)(props.proxy.dispatchCB(RefreshEmployee()))

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
              p.proxy().render(emp =>
                <.form(
                  <.fieldset(
                    /*<.fieldset(
                    ^.className := "form-group",
                    <.input(^.className := "form-control", ^.`type` := "text", ^.placeholder := "URL of profile picture", ^.value
                    :=emp.empDetails.URL of profile picture)
                  ),*/

                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "First Name",
                        ^.value := emp.empDetails.firstName)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Last Name",
                        ^.value := emp.empDetails.lastName)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Code",
                        ^.value := emp.empDetails.departmentCode, ^.disabled := true)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Name",
                        ^.value := emp.empDetails.departmentName, ^.disabled := true)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Registration Code",
                        ^.value := emp.empDetails.registrationCode, ^.disabled := true)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Employee Grade",
                        ^.value := emp.empDetails.grade, ^.disabled := true)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Salary",
                        ^.value := emp.empDetails.salary, ^.disabled := true)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Pay Scale",
                        ^.value := emp.empDetails.payScale, ^.disabled := true)
                    ),
                    <.fieldset(
                      ^.className := "form-group",
                      <.textarea(^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Short bio",
                        ^.value := emp.empDetails.shortbio)
                    ),
                    <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Request Profile Update")
                  )
                ))
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Settings")
    .renderBackend[Backend]
    .componentDidMount(scope => scope.backend.componentDidMount(scope.props))
    .build
}
