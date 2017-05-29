package services

import java.util.UUID

import db.DbContext
import repositories.{Employee, EmployeeRepository, Student}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class EmployeeService(val ctx: DbContext, userService: UserService)(implicit val ec: ExecutionContext) extends EmployeeRepository {

  import ctx._
  override def createEmpWithRole(employee: Employee, role: String): Future[Option[Employee]] = {
    val empId = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    for {
      userId <- userService.createUserWithRole(role)
      _ <- ctx.run(employees.insert(lift(employee.copy(id = empId, created = created, userId = userId))))
      employees <- run(byId(empId))
    } yield {
      employees.headOption
    }
  }
  def findById(uuid: UUID): Future[Option[Employee]] = run(byId(uuid)).map(_.headOption)
}
