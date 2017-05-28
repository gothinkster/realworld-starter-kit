package com.omis.client.views

import japgolly.scalajs.react.vdom.html_<^._

object Footer {
  def footer() = {
    <.footer(
      <.div(
        ^.className := "container",
        <.a(^.href := "/", ^.className := "logo-font", "osis"),
        <.span(^.className := "attribution", "An open source management information system",
          <.a(^.href := "/", "Omis"),
          ". Code & design licensed under MIT.")
      )
    )
  }
}

