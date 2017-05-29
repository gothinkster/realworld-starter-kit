package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._

object Article {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State()

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(
        ^.className := "article-page",
        <.div(
          ^.className := "banner",
          <.div(
            ^.className := "container",
            <.h1("How to build webapps that scale"),
            <.div(
              ^.className := "article-meta",
              <.a(
                ^.href := "",
                <.img(^.src := "/assets/images/Qr71crq.jpg")
              ),
              <.div(
                ^.className := "info",
                <.a(^.href := "", ^.className := "author", "Eric Simons"),
                <.span(^.className := "date", "January 20th")
              ),
              <.button(
                ^.className := "btn btn-sm btn-outline-secondary",
                <.i(^.className := "ion-plus-round"),
                "Follow Eric Simons",
                <.span(^.className := "counter", "(10)")
              ),
              <.button(
                ^.className := "btn btn-sm btn-outline-primary",
                <.i(^.className := "ion-heart"),
                "Favorite Post",
                <.span(^.className := "counter", "(29)")
              )
            )
          )
        ),
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row article-content",
            <.div(
              ^.className := "col-md-12",
              <.p("Web development technologies have evolved at an incredible clip over the past few years."),
              <.h2(^.id := "introducing-ionic", "Introducing RealWorld."),
              <.p("It's a great solution for learning how other frameworks work.")
            )
          ),
          <.hr,
          <.div(
            ^.className := "article-actions",
            <.div(
              ^.className := "article-meta",
              <.a(
                ^.href := "profile.html",
                <.img(^.src := "/assets/images/Qr71crq.jpg")
              ),
              <.div(
                ^.className := "info",
                <.a(^.href := "", ^.className := "author", "Eric Simons"),
                <.span(^.className := "date", "January 20th")
              ),
              <.button(
                ^.className := "btn btn-sm btn-outline-secondary",
                <.i(^.className := "ion-plus-round"),
                "Follow Eric Simons",
                <.span(^.className := "counter", "(10)")
              ),
              <.button(
                ^.className := "btn btn-sm btn-outline-primary",
                <.i(^.className := "ion-heart"),
                "Favorite Post",
                <.span(^.className := "counter", "(29)")
              )
            )
          ),
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-xs-12 col-md-8 offset-md-2",
              <.form(
                ^.className := "card comment-form",
                <.div(
                  ^.className := "card-block",
                  <.textarea(^.className := "form-control", ^.placeholder := "Write a comment...", ^.rows := 3)
                ),
                <.div(
                  ^.className := "card-footer",
                  <.img(^.src := "/assets/images/Qr71crq.jpg", ^.className := "comment-author-img"),
                  <.button(^.className := "btn btn-sm btn-primary", "Post Comment")
                )
              ),
              <.div(
                ^.className := "card",
                <.div(
                  ^.className := "card-block",
                  <.p(^.className := "card-text", "With supporting text below as a natural lead-in to additional content.")
                ),
                <.div(
                  ^.className := "card-footer",
                  <.a(^.href := "", ^.className := "comment-author",
                    <.img(^.src := "/assets/images/Qr71crq.jpg", ^.className := "comment-author-img")),
                  <.a(^.href := "", ^.className := "comment-author", "Jacob Schmidt"),
                  <.span(^.className := "date-posted", "Dec 29th")
                )
              ),
              <.div(
                ^.className := "card",
                <.div(
                  ^.className := "card-block",
                  <.p(^.className := "card-text", "With supporting text below as a natural lead-in to additional content.")
                ),
                <.div(
                  ^.className := "card-footer",
                  <.a(^.href := "", ^.className := "comment-author",
                    <.img(^.src := "/assets/images/Qr71crq.jpg", ^.className := "comment-author-img")),
                  <.a(^.href := "", ^.className := "comment-author", "Jacob Schmidt"),
                  <.span(^.className := "date-posted", "Dec 29th"),
                  <.span(
                    ^.className := "mod-options",
                    <.i(^.className := "ion-edit"),
                    <.i(^.className := "ion-trash-a")
                  )
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Create")
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}
