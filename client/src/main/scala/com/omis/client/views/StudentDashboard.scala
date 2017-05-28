package com.omis.client.views

import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.{BackendScope, ScalaComponent}

object StudentDashboard {

  case class State()
  case class Props()
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
                    <.img(^.src := "http://i.imgur.com/Qr71crq.jpg")
                  ),
                  <.div(
                    ^.className := "info",
                    <.a(^.href := "", ^.className := "author", "Prof. John Doe"),
                    <.span(^.className := "date", "January 20th")
                  ),
                  <.button(
                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",
                    <.i(^.className := "ion-heart"),
                    "29"
                  )
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("The assignment on postgres sql is due in three days"),
                  <.p("You need to build a database showing one to one, one to many relationships"),
                  <.span("Read more..."))
              ),
              <.div(
                ^.className := "article-preview",
                <.div(
                  ^.className := "article-meta",
                  <.a(
                    ^.href := "profile.html",
                    <.img(^.src := "http://i.imgur.com/N4VcUeJ.jpg")
                  ),
                  <.div(
                    ^.className := "info",
                    <.a(^.href := "", ^.className := "author", "Prof. Charles Xavier"),
                    <.span(^.className := "date", "January 20th")
                  ),
                  <.button(
                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",
                    <.i(^.className := "ion-heart"),
                    "32"
                  )
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("Results for course winter semester announced"),
                  <.p("Please use the link on the right to view the results"))
              )
            ),
            <.div(
              ^.className := "col-md-3",
              <.div(
                ^.className := "sidebar",
                <.p("Links"),
                <.div(
                  ^.className := "tag-list",
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Courses Registered"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Results"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "Academic Information")
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
