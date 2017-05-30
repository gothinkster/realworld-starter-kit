package com.omis.client.views.modals

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.OnUnmount
import japgolly.scalajs.react.vdom.html_<^._
import com.omis.Employee
import com.omis.client.components.Bootstrap._
import japgolly.scalajs.react
import scala.language.reflectiveCalls
import org.querki.jquery._

object EditEmployee {

  case class Props(teacher: Employee)

  case class State(showEditTeacherForm: Boolean = false)

  abstract class RxObserver[BS <: BackendScope[_, _]](scope: BS) extends OnUnmount {
  }

  class Backend(t: BackendScope[Props, State]) extends RxObserver(t) {
    def mounted(props: Props): Callback = {
      t.modState(s => s.copy(showEditTeacherForm = true))
    }

    def editTeacherDone(): Callback = {
      t.modState(s => s.copy(showEditTeacherForm = false))
    }

    def addNewProjectForm( /*postProject: Boolean*/ ): Callback = {
      println("yo")
      t.modState(s => s.copy(showEditTeacherForm = true))
    }
  }

  val component = ScalaComponent.builder[Props]("AddNewAgent")
    .initialState(State())
    .backend(new Backend(_))
    .renderPS(($, P, S) => {
      val B = $.backend
      <.div()(
        <.button(
          ^.onClick --> B.addNewProjectForm(),
          ^.className := "btn btn-outline-primary btn-sm pull-xs-right",
          <.i(^.className := "ion-android-create")
        ),
        if (S.showEditTeacherForm) EditTeacherForm(EditTeacherForm.Props(B.editTeacherDone, P.teacher))
        else
          EmptyVdom
      )
    })
    .configure(OnUnmount.install)
    .build

  def apply(props: Props) = component(props)
}

object EditTeacherForm {

  case class Props(submitHandler: ( /*Boolean*/ ) => Callback, employee: Employee)

  case class State(employee: Employee, closePopup: Boolean = false, selectizeInputId: String = "postNewJobSelectizeInput")

  case class Backend(t: BackendScope[Props, State]) {
    def hide(event: ReactEventFromInput) = {
      // instruct Bootstrap to hide the modal
      t.modState(s => s.copy(closePopup = true))
    }

    def submitForm(e: ReactEventFromInput): react.Callback = {
      e.preventDefault()
      t.modState(s => s.copy(closePopup = true))
    }

    def formClosed(state: State, props: Props): Callback = {
      props.submitHandler( /*state.postProject*/ )
    }

    /*def updateName(event: ReactEventFromInput): react.Callback = {
      val value = event.target.value
      t.modState(s => s.copy(job = s.job.copy(name = value)))
    }*/

    // scalastyle:off
    def render(s: State, p: Props) = {
      val headerText = "Edit Teacher"
      Modal.component(
        Modal.Props(
          // this is called after the modal has been hidden (animation is completed)
          closed = () => formClosed(s, p), headerText = "Edit Employee"
        )
      )(
          <.div(
            ^.className := "settings-page",
            <.div(
              ^.className := "container page",
              <.div(
                ^.className := "row",
                <.div(
                  ^.className := "col-md-12 col-xs-12",
                  <.form(
                    <.fieldset(
                      /*<.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control", ^.`type` := "text", ^.placeholder := "URL of profile picture", ^.value
                      :=p.employee.URL of profile picture)
                    ),*/
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "First Name",
                          ^.value := p.employee.firstName)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Last Name",
                          ^.value := p.employee.lastName)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "University Code",
                          ^.value := p.employee.registrationCode)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Faculty Code",
                          ^.value := "FCA")
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Code",
                          ^.value := "DCA")
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Employee Grade",
                          ^.value := "A")
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Salary",
                          ^.value := p.employee.salary)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Pay Scale",
                          ^.value := p.employee.payScale)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.textarea(^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Short bio",
                          ^.value := p.employee.shortbio)
                      ),
                      <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Edit Employee")
                    )
                  )
                )
              )
            )
          )

        )
    }
  }

  private val component = ScalaComponent.builder[Props]("PostAProjectForm")
    .initialStateFromProps(p => State(employee = p.employee))
    .renderBackend[Backend]
    .componentDidMount(scope => Callback {
    })
    .componentDidUpdate(scope => Callback {
      if (scope.currentState.closePopup) {
        $(scope.getDOMNode).modal("hide")
      }
    })
    .build

  def apply(props: Props) = component(props)
}