package controllers

import java.util.UUID

import com.mohiva.play.silhouette.api.Silhouette
import com.omis.{EmpDetails, UserReg}
import play.api.i18n.{I18nSupport, Messages, MessagesApi}
import play.api.libs.json.Json
import repositories.Employee
import services.EmployeeService
import utils.auth.DefaultEnv

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

class EmployeeController(
  silhouette: Silhouette[DefaultEnv],
  val messagesApi: MessagesApi, employeeService: EmployeeService
)(implicit val ec: ExecutionContext)
    extends BaseController(silhouette) with I18nSupport {
  def createEmp = withAdminSession("") { req =>

    unmarshalJsValue[EmpDetails](req) {
      data =>
        val codeList = Seq("AE", "BG", "NQ", "ZB", "TA", "OM", "IE", "PL", "LE", "AR", "AV", "DA", "FO")
        val rand = new Random(System.currentTimeMillis())
        val random_index = rand.nextInt(codeList.length)
        val result = codeList(random_index)
        employeeService.createEmpWithRole(Employee(
          java.util.UUID.randomUUID(),
          result, java.util.UUID.randomUUID(), java.util.UUID.randomUUID(), java.time.LocalDateTime.now(), java.time.LocalDateTime.now()
        ), "teacher", data).flatMap(
          e => Future(Ok(e))
        )
    }
  }

  def getAllEmp = withAdminSession("allEmp") {
    _ =>
      employeeService.getALl().map {
        e => Ok(Json.toJson(e))
      }
  }

  def getEmp(id: UUID) = withSession("getProfile") {
    _ =>
      {
        employeeService.findEmpDetailsById(id).map {
          case Some(e) => Ok(Json.toJson(e))
          case None => NotFound
        }
      }
  }

  def updateEmp(id: UUID) = withAdminSession("updateEmployee") {
    req =>
      unmarshalJsValue[EmpDetails](req) {
        data => employeeService.updateEmpDetails(data).map(e => Ok(Json.toJson(e)))
      }
  }

}
