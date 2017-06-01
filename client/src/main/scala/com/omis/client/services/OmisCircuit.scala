package com.omis.client.services

import com.omis.User
import com.omis.client.RootModels.{EmployeeRootModel, EmployeesRootModel, UserRootModel}
import com.omis.client.handlers.{EmployeeHandler, EmployeesHandler, UserHandler}
import diode.Circuit
import diode.data.{Empty, Pot}
import diode.react.ReactConnector

case class RootModel(user: UserRootModel, emps: Pot[EmployeesRootModel], emp: Pot[EmployeeRootModel])

object OmisCircuit extends Circuit[RootModel] with ReactConnector[RootModel] {
  // initial application model
  override protected def initialModel = RootModel(
    UserRootModel(User(java.util.UUID.randomUUID(), "", "")), Pot.empty, Pot.empty
  )

  // combine all handlers into one
  override protected val actionHandler = composeHandlers(
    new UserHandler(zoomRW(_.user)((m, v) => m.copy(user = v))),
    new EmployeesHandler(zoomRW(_.emps)((m, v) => m.copy(emps = v))),
    new EmployeeHandler(zoomRW(_.emp)((m, v) => m.copy(emp = v)))
  )
}
