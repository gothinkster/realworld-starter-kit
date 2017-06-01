package repositories

import java.util.UUID

import com.omis.EmpDetails

import scala.concurrent.Future

trait EmployeeRepository extends Repository {
  import ctx._
  val employees = quote(querySchema[Employee]("employees"))
  val empDet = quote(querySchema[EmpDetails]("emp_details"))
  def createEmpWithRole(employee: Employee, role: String, empDetails: EmpDetails): Future[String]

  def byId(uuid: UUID) = quote {
    employees.filter(_.id == lift(uuid))
  }

}
