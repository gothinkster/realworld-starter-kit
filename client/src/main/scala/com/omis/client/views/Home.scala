package com.omis.client.views

import japgolly.scalajs.react.{BackendScope, ScalaComponent}
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._

object Home {

  case class State(placeholder: Long)

  class Backend($: BackendScope[Unit, State]) {
    def render(s: State): VdomElement =
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

  val component = ScalaComponent.builder[Unit]("Home")
    .initialState(State(0))
    .renderBackend[Backend]
    .build

  def apply() = component()
}
