package services

import java.util.UUID

import com.omis.EmpDetails
import db.DbContext
import repositories.{Employee, EmployeeRepository, Student, UserLoginInfo}

import scala.concurrent.{ExecutionContext, Future}

/**
 * .
 */
class EmployeeService(val ctx: DbContext, userService: UserService,
    departmentService: DepartmentService)(implicit val ec: ExecutionContext) extends EmployeeRepository {

  import ctx._

  override def createEmpWithRole(employee: Employee, role: String, empDetails: EmpDetails): Future[String] = {
    val empId = java.util.UUID.randomUUID()
    val created = java.time.LocalDateTime.now()
    for {
      userId <- userService.createUserWithRole(role)
      dept <- departmentService.findByCode(empDetails.department)
      reg <- ctx.run(employees.insert(lift(employee.copy(id = empId, created = created, userId = userId, departmentId = dept.get.id)))
        .returning(_.registrationNumber))
      _ <- userService.createLoginInfo(UserLoginInfo(userId, providerKey = employee.empGroup + reg))
      _ <- createEmpDetails(empDetails.copy(userId = userId))
    } yield {
      employee.empGroup + reg
    }
  }

  def createEmpDetails(empDetails: EmpDetails) = ctx.run(empDet.insert(lift(empDetails)))

  def findEmpDetailsById(uuid: UUID) = run(empDetailById(uuid)).map(_.headOption)

  def getALl() = ctx.run(quote(querySchema[EmpDetails]("emp_details")))

  def findById(uuid: UUID): Future[Option[Employee]] = run(byId(uuid)).map(_.headOption)
}
