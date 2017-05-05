package com.realworld.client.views

import com.realworld.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react.extra.router.{Resolution, RouterCtl}
import japgolly.scalajs.react.vdom.html_<^._

object Header {
  def header(c: RouterCtl[Loc], r: Resolution[Loc]) = {
    <.nav(
      ^.className := "navbar navbar-light",
      <.div(
        ^.className := "container",
        <.a(^.className := "navbar-brand", ^.href := "index.html", "conduit"),
        <.ul(
          ^.className := "nav navbar-nav pull-xs-right",
          <.li(
            ^.className := "nav-item active",
            <.a(^.className := "nav-link", ^.href := "", "Home")
          ),
          <.li(
            ^.className := "nav-item",
            <.a(^.className := "nav-link", ^.href := "",
              <.i(^.className := "ion-compose"),
              "New Post")
          ),
          <.li(
            ^.className := "nav-item",
            <.a(^.className := "nav-link", ^.href := "",
              <.i(^.className := "ion-gear-a"),
              "Settings")
          ),
          <.li(
            ^.className := "nav-item",
            <.a(^.className := "nav-link", ^.href := "", "Sign up")
          )
        )
      )
    )
  }
}

