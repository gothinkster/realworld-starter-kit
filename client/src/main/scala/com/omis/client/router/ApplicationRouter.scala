package com.omis.client.router

import com.omis.client.views._
import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._
import org.scalajs.dom

// scalastyle:off
object ApplicationRouter {

  sealed trait Loc
  case object HomeLoc extends Loc
  case object LoginLoc extends Loc
  case object RegisterLoc extends Loc
  case object DashboardLoc extends Loc

  val routerConfig = RouterConfigDsl[Loc].buildConfig { dsl =>
    import dsl._

    (trimSlashes
      | staticRoute(root, HomeLoc) ~> render(Home.component())
      | staticRoute("login", LoginLoc) ~> render(Login.component(Login.Props()))
      | staticRoute("register", RegisterLoc) ~> render(Register.component(Register.Props()))
      | staticRoute("dashboard", DashboardLoc) ~> render(Dashboard.component(Dashboard.Props("admin"))))
      .notFound(redirectToPage(HomeLoc)(Redirect.Replace))
      .renderWith(MainLayout.layout)
      .verify(HomeLoc)
  }

  val baseUrl =
    if (dom.window.location.hostname == "localhost")
      BaseUrl.fromWindowOrigin_/
    else
      BaseUrl.fromWindowOrigin / "scalajs-react/"

  val router = Router(BaseUrl.fromWindowOrigin_/ + "#/", routerConfig)
}
