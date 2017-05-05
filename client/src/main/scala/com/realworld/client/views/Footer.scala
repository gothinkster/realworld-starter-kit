package com.realworld.client.views

import japgolly.scalajs.react.vdom.html_<^._

object Footer {
  def footer() = {
    <.footer(
      <.div(
        ^.className := "container",
        <.a(^.href := "/", ^.className := "logo-font", "conduit"),
        <.span(^.className := "attribution", "An interactive learning project from",
          <.a(^.href := "https://thinkster.io", "Thinkster"),
          ". Code & design licensed under MIT.")
      )
    )
  }
}

