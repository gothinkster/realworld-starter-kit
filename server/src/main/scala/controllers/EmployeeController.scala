package controllers

import java.util.UUID

import com.mohiva.play.silhouette.api.Silhouette
import com.omis.{EmpRegModel, EmployeeModel, UserReg}
import play.api.i18n.{I18nSupport, MessagesApi}
import play.api.libs.json.Json
import services.EmployeeService
import utils.auth.DefaultEnv
import scala.concurrent.{ExecutionContext, Future}

class EmployeeController(
  silhouette: Silhouette[DefaultEnv],
  val messagesApi: MessagesApi, employeeService: EmployeeService
)(implicit val ec: ExecutionContext)
    extends BaseController(silhouette) with I18nSupport {
  def createEmp = withAdminSession("") { req =>

    unmarshalJsValue[EmpRegModel](req) {
      data =>
        employeeService.createEmp(data).flatMap(
          e => Future(Ok(e))
        )
    }
  }

  def getAllEmp = withAdminSession("allEmp") {
    _ =>
      employeeService.getAllEmployeeDetails().map {
        e => Ok(Json.toJson(e))
      }
  }

  def getEmp(id: UUID) = withSession("getProfile") {
    _ =>
      employeeService.getEmp(id).map {
        e => Ok(Json.toJson(e))
      }
  }

  def updateEmp(id: UUID) = withAdminSession("updateEmployee") {
    req =>
      unmarshalJsValue[EmployeeModel](req) {
        data => employeeService.updateEmpDetails(data).map(e => Ok(Json.toJson(e)))
      }
  }

}
