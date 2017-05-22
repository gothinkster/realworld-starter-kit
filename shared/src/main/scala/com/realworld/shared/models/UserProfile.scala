package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// UserProfile
/////////////////////////////////////////////////////
case class UserProfile(
                        userId: Users.Id,
                        address: Option[UserProfile.Address],
                        phoneNumber: Option[UserProfile.PhoneNumber],
                        firstName: Option[UserProfile.FirstName],
                        lastName: Option[UserProfile.LastName],
                        imgUrl: Option[UserProfile.ImgUrl],
                        nationality: Option[UserProfile.Nationality],
                        fatherName: Option[UserProfile.FatherName],
                        motherName: Option[UserProfile.MotherName],
                        created: UserProfile.Created
                      )

object UserProfile {
  def create(
              userId: java.util.UUID,
              address: Option[String],
              phoneNumber: Option[String],
              firstName: Option[String],
              lastName: Option[String],
              imgUrl: Option[String],
              nationality: Option[String],
              fatherName: Option[String],
              motherName: Option[String],
              created: java.util.Date
            ): UserProfile = {
    UserProfile(
      Users.Id(userId),
      address.map(Address.apply),
      phoneNumber.map(PhoneNumber.apply),
      firstName.map(FirstName.apply),
      lastName.map(LastName.apply),
      imgUrl.map(ImgUrl.apply),
      nationality.map(Nationality.apply),
      fatherName.map(FatherName.apply),
      motherName.map(MotherName.apply),
      Created(created)
    )
  }

  case class Address(value: String) extends AnyVal

  case class PhoneNumber(value: String) extends AnyVal

  case class FirstName(value: String) extends AnyVal

  case class LastName(value: String) extends AnyVal

  case class ImgUrl(value: String) extends AnyVal

  case class Nationality(value: String) extends AnyVal

  case class FatherName(value: String) extends AnyVal

  case class MotherName(value: String) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
