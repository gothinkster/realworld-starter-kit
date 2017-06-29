package com.omis.client.views

import com.omis.client.router.ApplicationRouter.Loc
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import org.querki.jquery._
import org.querki.facades.bootstrap.datepicker._
object NewLeave {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State(leaveStartDate: String = "", leaveEndDate: String, reason: String)

  final class Backend(t: BackendScope[Props, State]) {
    def initializeDatepicker(): Unit = {
      val baseOpts = BootstrapDatepickerOptions.
        autoclose(true).
        todayHighlight(true).
        disableTouchKeyboard(true).
        orientation(Orientation.Bottom)
      // Iff this Date is Optional, show the Clear button:
      val opts =
        if (true)
          baseOpts.clearBtn(true)
        else
          baseOpts
      $("#leaveStartDate").datepicker(baseOpts)
      //      $("#leaveStartDate").on("changeDate", { rawEvt: JQueryEventObjectapp =>
      //        println(s"staapprt date =${$("#leaveStartDate").value().toString}")
      //        t.modState(s => s.copy(leaveStartDate = $("#leaveStartDate").value().toString)).runNow()
      //      })
    }
    def render(p: Props, s: State): VdomElement =
      <.div(
        ^.className := "settings-page",
        <.div(
          ^.className := "container page",
          <.div(
            ^.className := "row",
            <.div(
              ^.className := "col-md-6 offset-md-3 col-xs-12",
              <.h1(^.className := "text-xs-center", "Apply For Leave"),
              <.form(
                <.fieldset(
                  <.fieldset(
                    ^.className := "form-group",
                    <.input(^.tpe := "text", ^.className := "form-control-lg",
                      VdomAttr("data-provide") := "datepicker", ^.id := "leaveStartDate", ^.placeholder := " From date", ^.required := true, ^.defaultValue := s.leaveStartDate)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.textarea(^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Reason")
                  ),
                  <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Apply")
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Settings")
    .initialState(State("", "", ""))
    .renderBackend[Backend]
    .componentDidMount(scope => Callback {
      scope.backend.initializeDatepicker()
    })
    .build
}
