package services

import com.realworld.shared.models.University
import org.scalatestplus.play.PlaySpec
import test.{AppOneAppPerTest, BaseSpec}
import org.scalatest.Matchers._

class UniversityServiceSpec extends PlaySpec with AppOneAppPerTest with BaseSpec{
  "UniversityService" should {
    "create and find" in {
      val id  = db.universityService.create(University.create(java.util.UUID.randomUUID(),
        "AMU","Aligarh Muslim University","1919","Uttar Pradesh", "Aligarh", java.time.LocalDateTime.now())).futureValue
      val userFound = db.universityService.findById(id).futureValue
      userFound shouldBe defined
      userFound.foreach(_.code.value shouldBe "AMU")
    }
  }
}
