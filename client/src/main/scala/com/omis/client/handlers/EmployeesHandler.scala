package com.omis.client.handlers

import com.omis.{EmployeeModel}
import com.omis.client.RootModels.EmployeesRootModel
import com.omis.client.services.CoreApi
import diode.{ActionHandler, ActionResult, ModelRW}
import diode.data.{Empty, Pot, PotActionRetriable, Ready}
import diode.util.{Retry, RetryPolicy}
import play.api.libs.json.Json

import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue

case class RefreshEmployees(potResult: Pot[EmployeesRootModel] = Empty, retryPolicy: RetryPolicy = Retry(3))
    extends PotActionRetriable[EmployeesRootModel, RefreshEmployees] {
  override def next(value: Pot[EmployeesRootModel], newRetryPolicy: RetryPolicy): RefreshEmployees = RefreshEmployees(value, newRetryPolicy)
}

class EmployeesHandler[M](modelRW: ModelRW[M, Pot[EmployeesRootModel]]) extends ActionHandler(modelRW) {
  //  var labelFamily = LabelsUtils.getLabelProlog(Nil)

  override def handle: PartialFunction[Any, ActionResult[M]] = {

    case action: RefreshEmployees =>
      val updateF = action.effectWithRetry {
        CoreApi.getAllEmp
      } { json =>
        val empDetails = Json.parse(json).validate[Seq[EmployeeModel]].getOrElse(Nil)
        EmployeesRootModel(empDetails)
      }
      action.handleWith(this, updateF)(PotActionRetriable.handler())
  }
}