package com.omis.client.router

import com.omis.client.services.OmisCircuit
import com.omis.client.views._
import japgolly.scalajs.react.extra.router._
import japgolly.scalajs.react.vdom.html_<^._

// scalastyle:off
object ApplicationRouter {

  sealed trait Loc
  case object HomeLoc extends Loc
  case object LoginLoc extends Loc
  case object RegisterLoc extends Loc
  case object DashboardLoc extends Loc
  case object ProfileLoc extends Loc
  case object SettingsLoc extends Loc
  case object NewEmployeeLoc extends Loc
  case object CreateLoc extends Loc
  case object ArticleLoc extends Loc
  case object EmployeesLoc extends Loc
  case object EmployeeLoc extends Loc
  case object NewLeaveLoc extends Loc

  private val userProxy = OmisCircuit.connect(_.user)
  private val empsProxy = OmisCircuit.connect(_.emps)
  private val empProxy = OmisCircuit.connect(_.emp)

  val routerConfig = RouterConfigDsl[Loc].buildConfig { dsl =>
    import dsl._

    (trimSlashes
      | staticRoute(root, HomeLoc) ~> renderR(ctl => userProxy(proxy => Home.component(Home.Props(ctl, proxy))))
      | staticRoute("login", LoginLoc) ~> renderR(ctl => Login.component(Login.Props(ctl)))
      | staticRoute("register", RegisterLoc) ~> renderR(ctl => Register.component(Register.Props(ctl)))
      | staticRoute("dashboard", DashboardLoc) ~> renderR(ctl => userProxy(proxy => Dashboard.component(Dashboard.Props(ctl, proxy))))
      | staticRoute("employee", EmployeeLoc) ~> renderR(ctl => empProxy(proxy => EmployeeView.component(EmployeeView.Props(ctl, proxy))))
      | staticRoute("employees", EmployeesLoc) ~> renderR(ctl => empsProxy(proxy => Employees.component(Employees.Props(ctl, proxy))))
      | staticRoute("profile", ProfileLoc) ~> renderR(ctl => Profile.component(Profile.Props(ctl)))
      | staticRoute("create", CreateLoc) ~> renderR(ctl => Create.component(Create.Props(ctl)))
      | staticRoute("article", ArticleLoc) ~> renderR(ctl => Article.component(Article.Props(ctl)))
      | staticRoute("settings", SettingsLoc) ~> renderR(ctl => Settings.component(Settings.Props(ctl)))
      | staticRoute("newemployee", NewEmployeeLoc) ~> renderR(ctl => NewEmployee.component(NewEmployee.Props(ctl)))
      | staticRoute("newleave", NewLeaveLoc) ~> renderR(ctl => NewLeave.component(NewLeave.Props(ctl))))
      .notFound(redirectToPage(HomeLoc)(Redirect.Replace))
      .renderWith(MainLayout.layout)
      .verify(HomeLoc)
  }

  val router = Router(BaseUrl.fromWindowOrigin_/ + "#/", routerConfig)
}
