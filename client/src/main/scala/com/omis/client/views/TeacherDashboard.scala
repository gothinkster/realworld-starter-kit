package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object TeacherDashboard {

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
                    <.a(^.className := "nav-link active", ^.href := "", "Feed")
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
                    <.a(^.href := "", ^.className := "author", "Admin"),
                    <.span(^.className := "date", "January 20th")
                  ) /*,                  <.button(                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",                    <.i(^.className := "ion-heart"),                    "29"                  )*/
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("Your leaves for 3 from 24th June to 27th June is rejected"),
                  <.p("The department is having its a seminar on new technologies during that period. Your presence is mandatory"),
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
                    <.a(^.href := "", ^.className := "author", "Admin"),
                    <.span(^.className := "date", "January 20th")
                  ) /*,                  <.button(                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",                    <.i(^.className := "ion-heart"),                    "29"                  )*/
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("Your request for profile update is accepted"),
                  <.p("Please navigate to user popover on top right and profile to view the updated profile."),
                  <.span("Read more..."))
              )
            ),
            <.div(
              ^.className := "col-md-3",
              <.div(
                ^.className := "sidebar",
                <.p("Links"),
                <.div(
                  ^.className := "tag-list",
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Your Courses"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Apply For Leave"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "View Salary Statement"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Employee Information")
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
