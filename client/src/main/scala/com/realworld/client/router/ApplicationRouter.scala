package com.realworld.client.router

import com.realworld.client.views.{Home, MainLayout}
import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._
import org.scalajs.dom

// scalastyle:off
object ApplicationRouter {

  sealed trait Loc
  case object HomeLoc extends Loc
  case object Doco extends Loc

  val routerConfig = RouterConfigDsl[Loc].buildConfig { dsl =>
    import dsl._

    (trimSlashes
      | staticRoute(root, HomeLoc) ~> render(Home.component()))
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
