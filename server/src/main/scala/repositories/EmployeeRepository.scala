package repositories

import java.util.UUID

import com.omis.{EmpRegModel}

import scala.concurrent.Future

trait EmployeeRepository extends Repository {

  import ctx._

  val employees = quote(querySchema[Employee]("employees"))
  val users = quote(querySchema[User]("users"))
  val departments = quote(querySchema[Department]("departments"))

  val allEmployeeUserDepartment = quote {
    for {
      (e, u) <- employees.join(users).on((e, u) => e.userId == u.id)
      d <- departments.join(_.id == e.departmentId)
    } yield (e, u, d)

  }

  def getEmpById(id: UUID) = quote {
    allEmployeeUserDepartment.filter(_._1.id == lift(id))
  }

  /*def getEmpById(id: UUID) = quote {
    for {
      e <- employees.filter(_.id == lift(id))
      u <- users.filter(_.id == lift(e.userId))
      d <- departments.filter(_.id == lift(e.departmentId))
    } yield (e, u, d)

    //    allEmployeeUserDepartment.filter(_._1.id == lift(id))

  }*/
  def createEmp(empModel: EmpRegModel): Future[String]

  def byId(uuid: UUID) = quote {
    employees.filter(_.id == lift(uuid))
  }
}
