package com.omis.client.views

import java.util.UUID

import com.omis.Employee
import com.omis.client.router.ApplicationRouter.{Loc, NewEmployeeLoc}
import com.omis.client.views.modals.EditEmployee
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object Employees {

  lazy val employeesSeq: Seq[Employee] = Seq(
    Employee(UUID.randomUUID(), "John", "Doe", "AMU", "FCS", "DCS", "A", "1000000", "1000000-1200000",
      "Btech Mtech and Phd Qualified", "January 29th 1999", "AMU0001", "/assets/images/Qr71crq.jpg"),
    Employee(UUID.randomUUID(), "Charles", "Xavier", "AMU", "FCS", "DCS", "A", "1000000", "1000000-1200000",
      "Btech Mtech Qualified", "January 29th 2001", "AMU0002", "/assets/images/N4VcUeJ.jpg")
  )

  case class State(employees: Seq[Employee] = employeesSeq)

  case class Props(routerCtl: RouterCtl[Loc])

  class Backend($: BackendScope[Props, State]) {
    def renderEmployee(employee: Employee) = {
      <.div(
        ^.className := "article-preview",
        <.div(
          ^.className := "article-meta",
          <.a(
            ^.href := "profile.html",
            <.img(^.src := employee.imgUrl)
          ),
          <.div(
            ^.className := "info",
            <.a(^.href := "", ^.className := "author", s"${employee.firstName} ${employee.lastName}"),
            <.span(^.className := "date", s"Employee since: ${employee.since}")
          ), EditEmployee(EditEmployee.Props(employee))
        ),
        <.a(^.href := "", ^.className := "preview-link",
          <.h1(s"Employee Code: ${employee.registrationCode}"),
          <.p("Department: Computer Science"),
          <.p("Salary: 100000"),
          <.p("Employee Grade: B"),
          <.p("Pay group: 100000 - 120000"))
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
                s.employees map renderEmployee: _*
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
    .build
}
