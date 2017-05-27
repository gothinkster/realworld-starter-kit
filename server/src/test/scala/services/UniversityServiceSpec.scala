package services

import com.realworld.shared.models.University
import org.scalatestplus.play.PlaySpec
import test.{BaseSpec, BaseDBSpec}
import org.scalatest.Matchers._

class UniversityServiceSpec extends PlaySpec with BaseDBSpec with BaseSpec  {
  "UniversityService" should {
    "create and find" in {
      val id = db.universityService.create(University(java.util.UUID.randomUUID(),
        "AMU", "Aligarh Muslim University", "1919", "Uttar Pradesh", "Aligarh", java.time.LocalDateTime.now())).futureValue
      val userFound = db.universityService.findById(id).futureValue
      userFound shouldBe defined
      userFound.foreach(_.code shouldBe "AMU")
    }
  }
}
