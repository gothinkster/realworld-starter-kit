package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._

object Profile {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State()

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(
        ^.className := "profile-page",
        <.div(
          ^.className := "user-info",
          <.div(
            ^.className := "container",
            <.div(
              ^.className := "row",
              <.div(
                ^.className := "col-xs-12 col-md-10 offset-md-1",
                <.img(^.src := "http://i.imgur.com/Qr71crq.jpg", ^.className := "user-img"),
                <.h4("Eric Simons"),
                <.p("Cofounder @GoThinkster, lived in Aol's HQ for a few months, kinda looks like Peeta from the Hunger Games"),
                <.button(
                  ^.className := "btn btn-sm btn-outline-secondary action-btn",
                  <.i(^.className := "ion-plus-round"),
                  "Follow Eric Simons"
                )
              )
            )
          )
        ),
        <.div(
          ^.className := "container",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-xs-12 col-md-10 offset-md-1",
              <.div(
                ^.className := "articles-toggle",
                <.ul(
                  ^.className := "nav nav-pills outline-active",
                  <.li(
                    ^.className := "nav-item",
                    <.a(^.className := "nav-link active", ^.href := "", "My Articles")
                  ),
                  <.li(
                    ^.className := "nav-item",
                    <.a(^.className := "nav-link", ^.href := "", "Favorited Articles")
                  )
                )
              ),
              <.div(
                ^.className := "article-preview",
                <.div(
                  ^.className := "article-meta",
                  <.a(
                    ^.href := "",
                    <.img(^.src := "http://i.imgur.com/Qr71crq.jpg")
                  ),
                  <.div(
                    ^.className := "info",
                    <.a(^.href := "", ^.className := "author", "Eric Simons"),
                    <.span(^.className := "date", "January 20th")
                  ) /*,                  <.button(                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",                    <.i(^.className := "ion-heart"),                    "29"                  )*/
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
                    ^.href := "",
                    <.img(^.src := "http://i.imgur.com/N4VcUeJ.jpg")
                  ),
                  <.div(
                    ^.className := "info",
                    <.a(^.href := "", ^.className := "author", "Albert Pai"),
                    <.span(^.className := "date", "January 20th")
                  ) /*,                  <.button(                    ^.className := "btn btn-outline-primary btn-sm pull-xs-right",                    <.i(^.className := "ion-heart"),                    "29"                  )*/
                ),
                <.a(^.href := "", ^.className := "preview-link",
                  <.h1("The song you won't ever stop singing. No matter how hard you try."),
                  <.p("This is the description for the post."),
                  <.span("Read more..."),
                  <.ul(
                    ^.className := "tag-list",
                    <.li(^.className := "tag-default tag-pill tag-outline", "Music"),
                    <.li(^.className := "tag-default tag-pill tag-outline", "Song")
                  ))
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Profile")
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}
