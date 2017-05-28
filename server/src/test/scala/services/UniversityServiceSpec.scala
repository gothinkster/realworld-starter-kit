package services

import com.realworld.shared.models.University
import test.{BaseDBSpec, BaseSpec}
import org.scalatest.Matchers._
import org.scalatestplus.play.PlaySpec
import repositories.{Faculty, University}

//todo improve these test
class UniversityServiceSpec extends PlaySpec with BaseDBSpec with BaseSpec {
  //todo remove mutable reference
  var universityId = java.util.UUID.randomUUID()
  var facultyId = java.util.UUID.randomUUID()
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
}
