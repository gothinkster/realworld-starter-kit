package repositories

import java.util.UUID
import scala.concurrent.Future

trait EmployeeRepository extends Repository {
  import ctx._
  val employees = quote(querySchema[Employee]("employees"))

  def createEmpWithRole(employee: Employee, role: String): Future[Option[Employee]]

  def byId(uuid: UUID) = quote {
    employees.filter(_.id == lift(uuid))
  }

}
