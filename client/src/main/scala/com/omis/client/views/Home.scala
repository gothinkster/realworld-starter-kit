package com.omis.client.views

import com.omis.client.RootModels.UserRootModel
import com.omis.client.router.ApplicationRouter.Loc
import diode.react.ModelProxy
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.{BackendScope, ScalaComponent}
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._

object Home {

  case class State(placeholder: Long)
  case class Props(routerCtl: RouterCtl[Loc], proxy: ModelProxy[UserRootModel])
  class Backend($: BackendScope[Props, State]) {
    def render(s: State, p: Props): VdomElement =
      p.proxy.value.user.role match {
        case "student" => StudentDashboard.component(StudentDashboard.Props(p.routerCtl))
        case "teacher" => TeacherDashboard.component(TeacherDashboard.Props(p.routerCtl))
        case "admin" => AdminDashboard.component(AdminDashboard.Props(p.routerCtl))
        case _ => <.div(
          ^.className := "home-page",
          <.header(
            <.div(^.className := "container", ^.id := "maincontent",
              <.div(
                ^.className := "row",
                <.div(
                  ^.className := "col-lg-12",
                  <.img(^.className := "img-responsive", ^.src := "/assets/images/profile.png", ^.alt := ""),
                  <.div(
                    ^.className := "intro-text",
                    <.h1(^.className := "name", "OMIS"),
                    <.hr(^.className := "star-light"),
                    <.span(^.className := "skills", "An open source employees and students management system")
                  )
                )
              ))
          )
        )
      }

  }

  val component = ScalaComponent.builder[Props]("Home")
    .initialState(State(0))
    .renderBackend[Backend]
    .build
}
