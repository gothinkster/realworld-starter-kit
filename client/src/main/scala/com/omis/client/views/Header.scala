package com.omis.client.views

import com.omis.client.router.ApplicationRouter.{HomeLoc, Loc, LoginLoc, RegisterLoc}
import japgolly.scalajs.react.extra.router.{Resolution, RouterCtl}
import japgolly.scalajs.react.vdom.html_<^._

import scala.reflect.macros.whitebox

object Header {

  def header(routerCtl: RouterCtl[Loc], r: Resolution[Loc]) = {
    def navItem(name: String, target: Loc) =
      <.li(
        ^.cls := "nav-item",
        (^.cls := "active") when (target == r.page),
        routerCtl.link(target)(
          ^.className := "nav-link",
          name
        )
      )
    <.nav(
      ^.className := "navbar navbar-light",
      <.div(
        ^.className := "container",
        routerCtl.link(HomeLoc)(
          ^.cls := "navbar-brand",
          "OMIS"
        ),
        <.ul(
          ^.className := "nav navbar-nav pull-xs-right",
          navItem("Login", LoginLoc),
          navItem("Register", RegisterLoc)
        )
      )
    )
  }
}

