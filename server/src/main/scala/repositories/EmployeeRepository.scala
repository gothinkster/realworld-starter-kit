package repositories

import java.util.UUID
import scala.concurrent.Future

trait EmployeeRepository extends Repository {
  import ctx._
  val employees = quote(querySchema[Employee]("employees"))
  val empReg = quote(querySchema[EmployeeRegDetails]("employees"))

  def createEmpWithRole(employee: Employee, role: String): Future[String]

  def byId(uuid: UUID) = quote {
    employees.filter(_.id == lift(uuid))
  }

  def regById(uuid: UUID) = quote {
    empReg.filter(_.id == lift(uuid))
  }

}
