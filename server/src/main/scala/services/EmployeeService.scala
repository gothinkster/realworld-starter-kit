package services

import java.util.UUID

import com.realworld.shared.models.{Employee, User}
import db.DbContext
import repositories.EmployeeRepository

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class EmployeeService(val ctx: DbContext, userService: UserService)(implicit val ec: ExecutionContext) extends EmployeeRepository{

  import ctx._
  override def createEmpWithRole(employee: Employee, role: String): Future[Option[Employee]] = {
    val empId = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    for {
      userId <- userService.createUserWithRole(role)
      _ <- ctx.run(employees.insert(employee.copy(id = empId, created= created)))
      employees <- run(byId(empId))
    } yield {
      employees.headOption
    }
    /*userService.createUserWithRole(role).map{
      id => ctx.run(employees.insert(employee.copy(id = empId, created= created))).map(_ => run(byId(empId)).map(_.headOption))
    }*/

  }
}
