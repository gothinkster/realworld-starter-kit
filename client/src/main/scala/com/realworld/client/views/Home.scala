package com.realworld.client.views

import japgolly.scalajs.react.{BackendScope, ScalaComponent}
import japgolly.scalajs.react.vdom.VdomElement
import japgolly.scalajs.react.vdom.html_<^._

object Home {

  case class State(placeholder: Long)

  class Backend($: BackendScope[Unit, State]) {
    def render(s: State): VdomElement =
      <.div(
        ^.className := "home-page",
        <.div(
          ^.className := "banner",
          <.div(
            ^.className := "container",
            <.h1(^.className := "logo-font", "conduit"),
            <.p("A place to share your knowledge.")
          )
        ),
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
                    <.a(^.className := "nav-link disabled", ^.href := "", "Your Feed")
                  ),
                  <.li(
                    ^.className := "nav-item",
                    <.a(^.className := "nav-link active", ^.href := "", "Global Feed")
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
                    <.a(^.href := "", ^.className := "author", "Eric Simons"),
                    <.span(^.className := "date", "January 20th")
                  ),
                  <.button(
                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",
                    <.i(^.className := "ion-heart"),
                    "29"
                  )
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("How to build webapps that scale"),
                  <.p("This is the description for the post."),
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
                    <.a(^.href := "", ^.className := "author", "Albert Pai"),
                    <.span(^.className := "date", "January 20th")
                  ),
                  <.button(
                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",
                    <.i(^.className := "ion-heart"),
                    "32"
                  )
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("The song you won't ever stop singing. No matter how hard you try."),
                  <.p("This is the description for the post."),
                  <.span("Read more..."))
              )
            ),
            <.div(
              ^.className := "col-md-3",
              <.div(
                ^.className := "sidebar",
                <.p("Popular Tags"),
                <.div(
                  ^.className := "tag-list",
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "programming"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "javascript"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "emberjs"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "angularjs"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "react"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "mean"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "node"),
                  <.a(^.href := "", ^.className := "tag-pill tag-default", "rails")
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Unit]("Home")
    .initialState(State(0))
    .renderBackend[Backend]
    .build

  def apply() = component()
}
