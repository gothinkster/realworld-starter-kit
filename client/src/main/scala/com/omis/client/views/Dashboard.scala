package com.omis.client.views

import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object Dashboard {

  case class State()
  case class Props(roleName: String)
  class Backend($: BackendScope[Props, State]) {
    def render(s: State, p: Props): VdomElement =
      p.roleName match {
        case "student" => StudentDashboard.component(StudentDashboard.Props())
        case "teacher" => TeacherDashboard.component(TeacherDashboard.Props())
        case "admin" => AdminDashboard.component(AdminDashboard.Props())
        case _ => <.div()
      }
  }

  val component = ScalaComponent.builder[Props]("Home")
    .initialState(State())
    .renderBackend[Backend]
    .build
}
