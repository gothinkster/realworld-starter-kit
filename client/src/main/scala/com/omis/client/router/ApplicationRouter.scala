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
  case object ProfileLoc extends Loc
  case object SettingsLoc extends Loc
  case object CreateLoc extends Loc
  case object ArticleLoc extends Loc
  case object EmployeesLoc extends Loc

  val routerConfig = RouterConfigDsl[Loc].buildConfig { dsl =>
    import dsl._

    (trimSlashes
      | staticRoute(root, HomeLoc) ~> renderR(ctl => Home.component(Home.Props(ctl)))
      | staticRoute("login", LoginLoc) ~> renderR(ctl => Login.component(Login.Props(ctl)))
      | staticRoute("register", RegisterLoc) ~> renderR(ctl => Register.component(Register.Props(ctl)))
      | staticRoute("dashboard", DashboardLoc) ~> renderR(ctl => Dashboard.component(Dashboard.Props(ctl, "admin")))
      | staticRoute("employee", DashboardLoc) ~> renderR(ctl => Dashboard.component(Dashboard.Props(ctl, "admin")))
      | staticRoute("employees", EmployeesLoc) ~> renderR(ctl => Employees.component(Employees.Props(ctl)))
      | staticRoute("profile", ProfileLoc) ~> renderR(ctl => Profile.component(Profile.Props(ctl)))
      | staticRoute("create", CreateLoc) ~> renderR(ctl => Create.component(Create.Props(ctl)))
      | staticRoute("article", ArticleLoc) ~> renderR(ctl => Article.component(Article.Props(ctl)))
      | staticRoute("settings", SettingsLoc) ~> renderR(ctl => Settings.component(Settings.Props(ctl))))
      .notFound(redirectToPage(HomeLoc)(Redirect.Replace))
      .renderWith(MainLayout.layout)
      .verify(HomeLoc)
  }

  val baseUrl = BaseUrl.fromWindowOrigin_/

  val router = Router(BaseUrl.fromWindowOrigin_/ + "#/", routerConfig)
}
