package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._

object Create {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State()

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(
        ^.className := "editor-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-10 offset-md-1 col-xs-12",
              <.form(
                <.fieldset(
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.`type` := "text", ^.className := "form-control form-control-lg", ^.placeholder := "Article Title")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.`type` := "text", ^.className := "form-control", ^.placeholder := "What's this article about?")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.textarea(^.className := "form-control", ^.rows := 8, ^.placeholder := "Write your article (in markdown)")
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.`type` := "text", ^.className := "form-control", ^.placeholder := "Enter tags"),
                    <.div(^.className := "tag-list")
                  ),
                  <.button(^.className := "btn btn-lg pull-xs-right btn-primary", ^.`type` := "button", "Publish Article")
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
