package services

import java.util.UUID

import com.omis.{EmpRegModel, EmployeeModel}
import db.DbContext
import play.api.libs.json.JsResult.Exception
import repositories._

import scala.concurrent.{ExecutionContext, Future}
import scala.util.Random

/**
 * .
 */
class EmployeeService(val ctx: DbContext, userService: UserService,
    departmentService: DepartmentService)(implicit val ec: ExecutionContext) extends EmployeeRepository {

  import ctx._

  override def createEmp(empModel: EmpRegModel): Future[String] = {
    val empId = java.util.UUID.randomUUID()
    val since = java.time.LocalDate.parse(empModel.employeeSince)
    val created = java.time.LocalDateTime.now()
    val group = getUserGroup()
    for {
      userId <- userService.createUser(empModel.role, empModel.firstName, empModel.lastName, empModel.avatar)
      dept <- departmentService.findByCode(empModel.department)
      reg <- ctx.run(employees.insert(lift(Employee(empId, group, userId, dept.get.id, since, created, "", empModel.grade,
        empModel.salary, empModel.payScale, empModel.shortbio)))
        .returning(_.registrationNumber))
      _ <- userService.createLoginInfo(UserLoginInfo(userId, providerKey = group + reg))
    } yield {
      group + reg
    }
  }

  def getUserGroup(): String = {
    val codeList = Seq("AE", "BG", "NQ", "ZB", "TA", "OM", "IE", "PL", "LE", "AR", "AV", "DA", "FO")
    val rand = new Random(System.currentTimeMillis())
    val random_index = rand.nextInt(codeList.length)
    codeList(random_index)
  }

  def updateEmpDetails(empModel: EmployeeModel): Future[EmployeeModel] = {
    for {
      emp <- findEmpById(empModel.empId)
      _ <- userService.updateUser(emp.get.userId, empModel.role, empModel.firstName, empModel.lastName, empModel.avatar)
      _ <- {
        val newEmp = emp.get.copy(grade = empModel.grade, salary = empModel.salary, payScale = empModel.payScale, shortBio = empModel.shortbio)
        ctx.run(employees.filter(_.id == lift(emp.get.id)).update(lift(newEmp)))
      }
    } yield {
      empModel
    }
  }

  def getAllEmployeeDetails(): Future[List[EmployeeModel]] = {
    ctx.run(allEmployeeUserDepartment).map {
      e =>
        e.map {
          case (emp: Employee, u: User, d: Department) =>
            EmployeeModel(emp.id, u.firstName, u.lastName, d.name, d.code, emp.empGroup + emp.registrationNumber,
              emp.grade, emp.salary, emp.payScale, emp.shortBio, emp.employeeSince.toString, u.role, u.avatar)
        }
    }
  }

  def getEmp(id: UUID): Future[EmployeeModel] = {
    run(getEmpById(id)).map(_.head).map {
      case (emp: Employee, u: User, d: Department) =>
        EmployeeModel(emp.id, u.firstName, u.lastName, d.name, d.code, emp.empGroup + emp.registrationNumber,
          emp.grade, emp.salary, emp.payScale, emp.shortBio, emp.employeeSince.toString, u.role, u.avatar)
      case _ => throw new IllegalArgumentException

    }
  }

  def getALl() = ctx.run(employees)

  def findEmpById(uuid: UUID): Future[Option[Employee]] = run(byId(uuid)).map(_.headOption)
}
