package services

import test.{BaseDBSpec, BaseSpec}
import org.scalatest.Matchers._
import org.scalatestplus.play.PlaySpec
import repositories.{Department, Employee, Faculty, University}

//todo improve these test
class UniversityServiceSpec extends PlaySpec with BaseDBSpec with BaseSpec {
  //todo remove mutable reference
  var universityId = java.util.UUID.randomUUID()
  var facultyId = java.util.UUID.randomUUID()
  var departmentId = java.util.UUID.randomUUID()
  var regCode = ""
  "UniversityService" should {
    "create and find" in {
      universityId = db.universityService.create(University(java.util.UUID.randomUUID(),
        "AMU", "Aligarh Muslim University", "1919", "Uttar Pradesh", "Aligarh", java.time.LocalDateTime.now())).futureValue
      val univFound = db.universityService.findById(universityId).futureValue
      univFound shouldBe defined
      univFound.foreach(_.code shouldBe "AMU")
    }
  }
  "FacultyService" should {
    "create and find" in {
      //      db.userServicep.yo()
      facultyId = db.facultyService.create(Faculty(java.util.UUID.randomUUID(),
        universityId, "AMUFCS", "Faculty Of Computer Application", "Aligarh Muslim University", "1995", java.time.LocalDateTime.now())).futureValue
      val facultyFound = db.facultyService.findById(facultyId).futureValue
      facultyFound shouldBe defined
      facultyFound.foreach(_.code shouldBe "AMUFCS")
    }
  }

  "DepartmentService" should {
    "create and find" in {
      //      db.userServicep.yo()
      departmentId = db.departmentService.create(Department(java.util.UUID.randomUUID(),
        facultyId, "DCS", "Department Of Computer Application", "1995", "Aligarh Muslim University", java.time.LocalDateTime.now())).futureValue
      val departmentFound = db.departmentService.findById(departmentId).futureValue
      departmentFound shouldBe defined
      departmentFound.foreach(_.code shouldBe "DCS")
    }
  }

  "EmployeeService" should {
    "create and find" in {
      //      db.userServicep.yo()
      regCode = db.employeeService.createEmpWithRole(Employee(java.util.UUID.randomUUID(),
        "AG", java.util.UUID.randomUUID(), departmentId, java.time.LocalDateTime.now(), java.time.LocalDateTime.now()), "teacher").futureValue
      println(regCode)
      regCode should have length(6)

    }
  }

  "UserService" should {
    "find user with the regcode" in {
      val userIdentity = db.userService.findUserByProvideKey(regCode).futureValue

      println(userIdentity)
      userIdentity should matchPattern {case Some(userIdentity) => }
    }
  }


}
