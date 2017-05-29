package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object Employees {

  case class State()
  case class Props(routerCtl: RouterCtl[Loc])
  class Backend($: BackendScope[Props, State]) {
    def render(s: State, p: Props): VdomElement =
      <.div(
        ^.className := "home-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-9",
              <.div(
                ^.className := "feed-toggle",
                <.ul(
                  ^.className := "nav nav-pills outline-active",
                  <.li(
                    ^.className := "nav-item",
                    <.a(^.className := "nav-link active", ^.href := "", "Employees")
                  )
                )
              ),
              <.div(
                ^.className := "article-preview",
                <.div(
                  ^.className := "article-meta",
                  <.a(
                    ^.href := "profile.html",
                    <.img(^.src := "/assets/images/Qr71crq.jpg")
                  ),
                  <.div(
                    ^.className := "info",
                    <.a(^.href := "", ^.className := "author", "John Doe"),
                    <.span(^.className := "date", "Employee since: January 20th, 1999")
                  ) /*,                  <.button(                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",                    <.i(^.className := "ion-heart"),                    "29"                  )*/
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("University Employee: AMU00001 From: 22/06/2017 To: 25/06/2017"),
                  <.p("Heading to hometown during that period."),
                  <.span("Read more..."))
              ),
              <.div(
                ^.className := "article-preview",
                <.div(
                  ^.className := "article-meta",
                  <.a(
                    ^.href := "profile.html",
                    <.img(^.src := "/assets/images/N4VcUeJ.jpg")
                  ),
                  <.div(
                    ^.className := "info",
                    <.a(^.href := "", ^.className := "author", "Test employee"),
                    <.span(^.className := "date", "January 20th")
                  ) /*,                  <.button(                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",                    <.i(^.className := "ion-heart"),                    "29"                  )*/
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("Profile Update Employee: AMU00001"),
                  <.p("Please review the updated profile in the request menu"))
              )
            ),
            <.div(
              ^.className := "col-md-3",
              <.div(
                ^.className := "sidebar",
                <.p("Links"),
                <.div(
                  ^.className := "tag-list",
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Add Employee")
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("StudentDashboard")
    .initialState(State())
    .renderBackend[Backend]
    .build
}
