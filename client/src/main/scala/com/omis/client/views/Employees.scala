package com.omis.client.views

import com.omis.{EmployeeModel}
import com.omis.client.RootModels.EmployeesRootModel
import com.omis.client.handlers.RefreshEmployees
import com.omis.client.router.ApplicationRouter.{Loc, NewEmployeeLoc}
import com.omis.client.views.modals.EditEmployee
import diode.data.Pot
import diode.react.ModelProxy
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, Callback, ScalaComponent}
import diode.react.ReactPot._
import diode.AnyAction._

object Employees {

  case class State()

  case class Props(routerCtl: RouterCtl[Loc], proxy: ModelProxy[Pot[EmployeesRootModel]])

  class Backend($: BackendScope[Props, State]) {
    def componentDidMount(props: Props) = Callback.when(!props.proxy().isPending)(props.proxy.dispatchCB(RefreshEmployees()))

    def renderEmployee(employee: EmployeeModel) = {
      <.div(
        ^.className := "article-preview",
        <.div(
          ^.className := "article-meta",
          <.a(
            ^.href := "profile.html",
            <.img(^.src := "/assets/images/N4VcUeJ.jpg")
          ),
          <.div(
            ^.className := "info",
            <.a(^.href := "", ^.className := "author", s"${employee.firstName} ${employee.lastName}"),
            <.span(^.className := "date", s"Employee since: ${employee.employeeSince}")
          ), EditEmployee(EditEmployee.Props(employee))
        ),
        <.a(^.href := "", ^.className := "preview-link",
          <.h1(s"Employee: ${employee.firstName} ${employee.lastName}"),
          <.p(s"Department: ${employee.departmentName}"),
          <.p(s"Department Code: ${employee.departmentCode}"),
          <.p(s"Registration Code: ${employee.registrationCode}"),
          <.p(s"Salary: ${employee.salary}"),
          <.p(s"Employee Grade: ${employee.grade}"),
          <.p(s"Pay group: ${employee.payScale}"),
          <.p(s"Short Bio: ${employee.shortbio}"),
          <.p(s"Employee Since: ${employee.employeeSince}"))
      )

    }

    def render(s: State, p: Props): VdomElement =
      <.div(
        ^.className := "home-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-9",
              <.div(
                ^.className := "feed-toggle",
                <.ul(
                  ^.className := "nav nav-pills outline-active",
                  <.li(
                    ^.className := "nav-item",
                    <.a(^.className := "nav-link active", ^.href := "", "Employees")
                  )
                )
              ),
              <.div(
                p.proxy().render(employeesRootModel =>
                  <.div(
                    employeesRootModel.emp map renderEmployee: _*
                  )),
                p.proxy().renderFailed(ex => <.div()(
                  <.span(""), "Error in loading users"
                )),
                p.proxy().renderPending(e =>
                  <.div()(
                    <.img(^.src := "./assets/images/processing.gif")
                  ))

              )
            ),
            <.div(
              ^.className := "col-md-3",
              <.div(
                ^.className := "sidebar",
                <.p("Links"),
                <.div(
                  ^.className := "tag-list",
                  p.routerCtl.link(NewEmployeeLoc)(
                    ^.className := "tag-pill tag-default",
                    "Add Employee"
                  )
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("StudentDashboard")
    .initialState(State())
    .renderBackend[Backend]
    .componentDidMount(scope => scope.backend.componentDidMount(scope.props))
    .build
}
