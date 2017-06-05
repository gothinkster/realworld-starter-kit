package com.omis.client.services

import com.omis.{EmpRegModel, EmployeeModel, UserReg}
import org.scalajs.dom.ext.Ajax
import play.api.libs.json.Json

import scala.concurrent.Future
import org.scalajs.dom.window

import scala.scalajs.concurrent.JSExecutionContext.Implicits.queue

/**
 * Created by shubham.k on 22-03-2017.
 */
object CoreApi {

  private def ajaxPost(requestContent: String, apiUrl: String): Future[String] = {
    Ajax.post(
      url = apiUrl,
      data = requestContent,
      headers = Map("Content-Type" -> "application/json;charset=UTF-8", "X-Auth-Token" -> window.localStorage.getItem("X-Auth-Token"))
    ).map(_.responseText)
  }

  private def ajaxGet(url: String): Future[String] = {
    Ajax.get(
      url = s"/${url}",
      headers = Map("X-Auth-Token" -> window.localStorage.getItem("X-Auth-Token"))
    ).map(_.responseText)
  }

  def login(userReg: UserReg) = {
    ajaxPost(Json.stringify(Json.toJson[UserReg](userReg)), "login")
  }

  def signUp(userReg: UserReg) = {
    ajaxPost(Json.stringify(Json.toJson[UserReg](userReg)), "signup")
  }

  def addEmployee(empDetails: EmpRegModel) = {
    ajaxPost(Json.stringify(Json.toJson[EmpRegModel](empDetails)), "employees/create")
  }

  def logout() = ajaxGet("logout")

  def getAllEmp = ajaxGet("employees")

  def getEmp = ajaxGet(s"employees/${OmisCircuit.zoom(_.emp.get.empDetails.empId)}")

  def updateEmp(empDetails: EmployeeModel) = {
    ajaxPost(Json.stringify(Json.toJson[EmployeeModel](empDetails)), s"employees/${empDetails.empId}")
  }

  val authenticate = ajaxGet("authenticate")
}
