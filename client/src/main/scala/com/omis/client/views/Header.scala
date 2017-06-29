package com.omis.client.views

import com.omis.client.RootModels.UserRootModel
import com.omis.client.handlers.LogoutUser
import com.omis.client.router.ApplicationRouter.{HomeLoc, Loc, LoginLoc, RegisterLoc}
import com.omis.client.services.OmisCircuit
import diode.react.ModelProxy
import japgolly.scalajs.react.extra.router.{Resolution, RouterCtl}
import japgolly.scalajs.react.vdom.html_<^._
import org.scalajs.dom
import diode.AnyAction._
import japgolly.scalajs.react

import scala.reflect.macros.whitebox

object Header {

  def header(routerCtl: RouterCtl[Loc], r: Resolution[Loc]) = {
    val userProxy = OmisCircuit.connect(_.user)
    <.nav(
      ^.className := "navbar navbar-light",
      <.div(
        ^.className := "container",
        routerCtl.link(HomeLoc)(
          ^.cls := "navbar-brand",
          "OMIS"
        ),
        userProxy(proxy => RightMenu.component(RightMenu.Props(routerCtl: RouterCtl[Loc], r: Resolution[Loc], proxy)))
      )
    )
  }
}

import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._

object RightMenu {

  final case class Props(routerCtl: RouterCtl[Loc], r: Resolution[Loc], proxy: ModelProxy[UserRootModel])

  final case class State()

  final class Backend($: BackendScope[Props, Unit]) {

    def signOut(event: ReactEventFromInput) = {
      event.preventDefault()
      dom.window.location.replace("/")
      OmisCircuit.dispatch(LogoutUser())
      react.Callback.empty
    }

    def render(p: Props): VdomElement = {
      def navItem(name: String, target: Loc) =
        <.li(
          ^.cls := "nav-item",
          (^.cls := "active") when (target == p.r.page),
          p.routerCtl.link(target)(
            ^.className := "nav-link",
            name
          )
        )

      if (!p.proxy.value.isLoggedIn) {
        <.ul(
          ^.className := "nav navbar-nav pull-xs-right",
          navItem("Login", LoginLoc),
          navItem("Register", RegisterLoc)
        )

      } else {
        <.ul(
          ^.className := "nav navbar-nav pull-xs-right",
          <.li(
            ^.cls := "nav-item, active",

            <.button(
              ^.className := "btn btn-lg btn-primary ",
              "Sign Out", ^.onClick ==> signOut
            )
          )
        )
      }

    }

  }

  val component = ScalaComponent.builder[Props]("RightMenu")
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}

