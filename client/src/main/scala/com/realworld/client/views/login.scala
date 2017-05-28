package com.realworld.client.views

/**
  * Created by shubham.k on 28-05-2017.
  */
import japgolly.scalajs.react._
import japgolly.scalajs.react.vdom.html_<^._
import japgolly.scalajs.react.extra._

object Login {

  final case class Props(state: StateSnapshot[State]) {
    @inline def render: VdomElement = Component(this)
  }

  //implicit val reusabilityProps: Reusability[Props] =
  //  Reusability.caseClass

  final case class State()

  object State {
    def init: State =
      State()

    //implicit val reusability: Reusability[State] =
    //  Reusability.caseClass
  }

  final class Backend($: BackendScope[Props, Unit]) {
    def render(p: Props): VdomElement =
      <.div(^.className := "auth-page",
        <.div(^.className := "container page",
          <.div(^.className := "row",
            <.div(^.className := "col-md-6 offset-md-3 col-xs-12",
              <.h1(^.className := "text-xs-center","Sign up"),
              <.p(^.className := "text-xs-center",
                <.a(^.href := "","Have an account?")
              ),
              <.ul(^.className := "error-messages",
                <.li("That email is already taken")
              ),
              <.form(
                <.fieldset(^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Your Name", ^.`type` := "text")
                ),
                <.fieldset(^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Email", ^.`type` := "text")
                ),
                <.fieldset(^.className := "form-group",
                  <.input(^.className := "form-control form-control-lg", ^.placeholder := "Password", ^.`type` := "password")
                ),
                <.button(^.className := "btn btn-lg btn-primary pull-xs-right","Sign up")
              )
            )
          )
        )
      )
  }

  val Component = ScalaComponent.builder[Props]("Login")
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}
