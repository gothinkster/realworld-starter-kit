package services

import java.util.UUID

import db.DbContext
import repositories.{Employee, EmployeeRepository, Student, UserLoginInfo}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class EmployeeService(val ctx: DbContext, userService: UserService)(implicit val ec: ExecutionContext) extends EmployeeRepository {

  import ctx._

  override def createEmpWithRole(employee: Employee, role: String): Future[String] = {
    val empId = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    for {
      userId <- userService.createUserWithRole(role)
      reg <- ctx.run(employees.insert(lift(employee.copy(id = empId, created = created, userId = userId))).returning(_.registrationNumber))
      _ <- userService.createLoginInfo(UserLoginInfo(userId, providerKey = employee.empGroup + reg))
    } yield {
      employee.empGroup + reg
    }
  }

  def getEmpRegDetailsById(uuid: UUID) = run(regById(uuid))

  def findById(uuid: UUID): Future[Option[Employee]] = run(byId(uuid)).map(_.headOption)
}
