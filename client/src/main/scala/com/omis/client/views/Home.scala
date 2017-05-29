package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.{BackendScope, ScalaComponent}
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._

object Home {

  case class State(placeholder: Long)
  case class Props(routerCtl: RouterCtl[Loc])
  class Backend($: BackendScope[Props, State]) {
    def render(s: State, p: Props): VdomElement =
      <.div(
        ^.className := "home-page",
        <.div(
          ^.className := "banner",
          <.div(
            ^.className := "container",
            <.h1(^.className := "logo-font", "OMIS"),
            <.p("An open source employees and students management system")
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Home")
    .initialState(State(0))
    .renderBackend[Backend]
    .build
}
