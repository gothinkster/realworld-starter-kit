package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object Dashboard {

  case class State()
  case class Props(routerCtl: RouterCtl[Loc], roleName: String)
  class Backend($: BackendScope[Props, State]) {
    def render(s: State, p: Props): VdomElement =
      p.roleName match {
        case "student" => StudentDashboard.component(StudentDashboard.Props(p.routerCtl))
        case "teacher" => TeacherDashboard.component(TeacherDashboard.Props(p.routerCtl))
        case "admin" => AdminDashboard.component(AdminDashboard.Props(p.routerCtl))
        case _ => <.div()
      }
  }

  val component = ScalaComponent.builder[Props]("Home")
    .initialState(State())
    .renderBackend[Backend]
    .build
}
