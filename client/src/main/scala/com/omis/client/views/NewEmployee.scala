package com.omis.client.views

import java.util.UUID

import com.omis.EmpDetails
import com.omis.client.router.ApplicationRouter.Loc
import com.omis.client.services.CoreApi
import japgolly.scalajs.react
import japgolly.scalajs.react._
import japgolly.scalajs.react.extra.router.RouterCtl
import japgolly.scalajs.react.vdom.html_<^._
import org.scalajs.dom
import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
object NewEmployee {

  case class Props(routerCtl: RouterCtl[Loc])
  case class State(empDetails: EmpDetails, empAdded: Boolean = false, empCode: String = "")

  final class Backend($: BackendScope[Props, State]) {

    def updateFirstName(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(firstName = value)))
    }

    def updateLastName(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(lastName = value)))
    }

    def updateDepartment(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(department = value)))
    }

    def updateGrade(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(grade = value)))
    }

    def updateSalary(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(salary = value)))
    }

    def updatePayScale(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(payScale = value)))
    }

    def updateShortbio(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(shortbio = value)))
    }

    def updateCreated(e: ReactEventFromInput) = {
      val value = e.target.value
      $.modState(s => s.copy(empDetails = s.empDetails.copy(created = value)))
    }

    def addEmployee(e: ReactEventFromInput) = {
      e.preventDefault()
      $.state.map {
        s =>
          CoreApi.addEmployee(s.empDetails).map {
            e =>
              println(e)
              $.modState(s => s.copy(empAdded = true, empCode = e)).runNow()
          }
      } >> react.Callback.empty

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
              <.h1(^.className := "text-xs-center", s"New Employee ${s.empCode}"),
              <.form(
                ^.className := "disabled",
                <.fieldset(
                  /*<.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true,^.className := "form-control", ^.`type` := "text", ^.placeholder := "URL of profile picture", ^.onChange ==> updateURLpicture)
                  ),*/
                  <.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "First Name", ^.onChange ==> updateFirstName)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Last Name", ^.onChange ==> updateLastName)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Department Code", ^.onChange ==> updateDepartment)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Employee Grade", ^.onChange ==> updateGrade)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Salary", ^.onChange ==> updateSalary)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.input((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.`type` := "text", ^.placeholder := "Pay Scale", ^.onChange ==> updatePayScale)
                  ),
                  <.fieldset(
                    ^.className := "form-group",
                    <.textarea((^.disabled := true) when s.empAdded == true, ^.className := "form-control form-control-lg", ^.rows := 8, ^.placeholder := "Short bio", ^.onChange ==> updateShortbio)
                  ),
                  <.button((^.disabled := true) when s.empAdded == true, ^.className := "btn btn-lg btn-primary pull-xs-right", "Add Employee", ^.onClick ==> addEmployee)
                )
              )
            )
          )
        )
      )
  }

  val component = ScalaComponent.builder[Props]("Settings")
    .initialState(State(EmpDetails(UUID.randomUUID(), "John", "Doe", "DCS", "A", "1000000", "1000000-1200000",
      "Btech Mtech and Phd Qualified", "January 29th 1999")))
    .renderBackend[Backend]
    //.configure(Reusability.shouldComponentUpdate)
    .build
}
