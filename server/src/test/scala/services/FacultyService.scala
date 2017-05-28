package services

import com.realworld.shared.models.Faculty
import org.scalatestplus.play.PlaySpec
import test.{BaseDBSpec, BaseSpec}
import org.scalatest.Matchers._

/**
  * Created by shubham.k on 28-05-2017.
  */
class FacultyServiceSpec extends PlaySpec with BaseDBSpec with BaseSpec {
  "FacultyService" should {
    "create and find" in {
//      db.userServicep.yo()
      /*val facultyId = db.facultyService.create(Faculty(java.util.UUID.randomUUID(),
        java.util.UUID.randomUUID(),"AMUFCS", "Faculty Of Computer Application", "Aligarh Muslim University", "1995", java.time.LocalDateTime.now())).futureValue
      val facultyFound = db.facultyService.findById(facultyId).futureValue
      facultyFound shouldBe defined
      facultyFound.foreach(_.code shouldBe "AMUFCS")*/
    }
  }
}
