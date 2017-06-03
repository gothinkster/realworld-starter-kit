package com.omis.client.views.modals

import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.OnUnmount
import japgolly.scalajs.react.vdom.html_<^._
import com.omis.EmpDetails
import com.omis.client.components.Bootstrap._
import com.omis.client.services.CoreApi
import japgolly.scalajs.react
import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
import scala.language.reflectiveCalls
import org.querki.jquery._

object EditEmployee {

  case class Props(teacher: EmpDetails)

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

  case class Props(submitHandler: ( /*Boolean*/ ) => Callback, employee: EmpDetails)

  case class State(employee: EmpDetails, closePopup: Boolean = false, selectizeInputId: String = "postNewJobSelectizeInput")

  case class Backend(t: BackendScope[Props, State]) {
    def hide(event: ReactEventFromInput) = {
      // instruct Bootstrap to hide the modal
      t.modState(s => s.copy(closePopup = true))
    }

    def submitForm(e: ReactEventFromInput): react.Callback = {
      e.preventDefault()
      val state = t.state.runNow()
      CoreApi.updateEmp(state.employee).map {
        _ => t.modState(s => s.copy(closePopup = true)).runNow()
      }.recover {
        case _: Exception => t.modState(s => s.copy(closePopup = false)).runNow()
      }
      Callback.empty
    }

    def formClosed(state: State, props: Props): Callback = {
      props.submitHandler( /*state.postProject*/ )
    }

    def udpateFirstName(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      println("yo sasur")
      t.modState(s => s.copy(employee = s.employee.copy(firstName = value)))
    }
    def udpateLastName(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      t.modState(s => s.copy(employee = s.employee.copy(lastName = value)))
    }
    def udpateDepartment(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      t.modState(s => s.copy(employee = s.employee.copy(department = value)))
    }
    def udpateGrade(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      t.modState(s => s.copy(employee = s.employee.copy(grade = value)))
    }
    def udpateSalary(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      t.modState(s => s.copy(employee = s.employee.copy(salary = value)))
    }
    def udpatePayScale(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      t.modState(s => s.copy(employee = s.employee.copy(payScale = value)))
    }
    def udpateShortbio(e: ReactEventFromInput): react.Callback = {
      val value = e.target.value
      t.modState(s => s.copy(employee = s.employee.copy(shortbio = value)))
    }

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
                <.div("Error yo!!!"),
                <.div(
                  ^.className := "col-md-12 col-xs-12",
                  <.form(
                    <.fieldset(
                      /*<.fieldset(
                      ^.className := "form-group",
                      <.input(^.className := "form-control", ^.`type` := "text", ^.placeholder := "URL of profile picture", ^.value
                      :=s.employee.URL of profile picture)
                    ),*/
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "First Name",
                          ^.value := s.employee.firstName, ^.onChange ==> udpateFirstName)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Last Name",
                          ^.value := s.employee.lastName, ^.onChange ==> udpateLastName)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Code",
                          ^.value := s.employee.department, ^.onChange ==> udpateDepartment)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Employee Grade",
                          ^.value := s.employee.grade, ^.onChange ==> udpateGrade)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Salary",
                          ^.value := s.employee.salary, ^.onChange ==> udpateSalary)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.input(^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Pay Scale",
                          ^.value := s.employee.payScale, ^.onChange ==> udpatePayScale)
                      ),
                      <.fieldset(
                        ^.className := "form-group",
                        <.textarea(^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Short bio",
                          ^.value := s.employee.shortbio, ^.onChange ==> udpateShortbio)
                      ),
                      <.button(^.className := "btn btn-lg btn-primary pull-xs-right", "Edit Employee", ^.onClick ==> submitForm)
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