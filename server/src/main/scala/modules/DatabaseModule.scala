package modules

import com.softwaremill.macwire.wire
import io.getquill.{PostgresAsyncContext, SnakeCase}
import services._

import scala.concurrent.ExecutionContext

/**
 * Created by shubham on 24/5/17.
 */
trait DatabaseModule {
  // quill
  implicit def executionContext: ExecutionContext
  // database
  lazy val dbCtx = new PostgresAsyncContext[SnakeCase]("ctx")
  lazy val universityService = wire[UniversityService]
  lazy val facultyService = wire[FacultyService]
  lazy val departmentService = wire[DepartmentService]
  lazy val userService = wire[UserService]
  lazy val employeeService = wire[EmployeeService]
  lazy val studentService = wire[StudentService]
}
