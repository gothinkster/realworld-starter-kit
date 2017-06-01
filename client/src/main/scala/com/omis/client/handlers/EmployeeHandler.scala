package com.omis.client.handlers

import com.omis.EmpDetails
import com.omis.client.RootModels.EmployeeRootModel
import com.omis.client.services.CoreApi
import diode.{ActionHandler, ActionResult, ModelRW}
import diode.data.{Empty, Pot, PotActionRetriable, Ready}
import diode.util.{Retry, RetryPolicy}
import play.api.libs.json.Json

import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue
import scala.scalajs.js.JavaScriptException

case class RefreshEmployee(potResult: Pot[EmployeeRootModel] = Empty, retryPolicy: RetryPolicy = Retry(3))
    extends PotActionRetriable[EmployeeRootModel, RefreshEmployee] {
  override def next(value: Pot[EmployeeRootModel], newRetryPolicy: RetryPolicy): RefreshEmployee = RefreshEmployee(value, newRetryPolicy)
}

class EmployeeHandler[M](modelRW: ModelRW[M, Pot[EmployeeRootModel]]) extends ActionHandler(modelRW) {
  //  var labelFamily = LabelsUtils.getLabelProlog(Nil)

  override def handle: PartialFunction[Any, ActionResult[M]] = {

    case action: RefreshEmployee =>
      val updateF = action.effectWithRetry {
        CoreApi.getEmp
      } { json =>
        Json.parse(json).validate[EmpDetails].asEither match {
          case Left(e) => throw JavaScriptException("Error in parsing content")
          case Right(empDetails) => EmployeeRootModel(empDetails)
        }

      }
      action.handleWith(this, updateF)(PotActionRetriable.handler())
  }
}