package com.realworld.shared.models

/**
  * Created by shubham on 22/5/17.
  */
/////////////////////////////////////////////////////
// UniversityAllocatedLeaves
/////////////////////////////////////////////////////
case class UniversityAllocatedLeaves(
                                      id: UniversityAllocatedLeaves.Id,
                                      year: UniversityAllocatedLeaves.Year,
                                      universityId: Option[Universities.Id],
                                      numberOfLeaves: UniversityAllocatedLeaves.NumberOfLeaves,
                                      created: UniversityAllocatedLeaves.Created
                                    )

object UniversityAllocatedLeaves {
  def create(
              id: java.util.UUID,
              year: String,
              universityId: Option[java.util.UUID],
              numberOfLeaves: Int,
              created: java.util.Date
            ): UniversityAllocatedLeaves = {
    UniversityAllocatedLeaves(
      Id(id),
      Year(year),
      universityId.map(Universities.Id.apply),
      NumberOfLeaves(numberOfLeaves),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Year(value: String) extends AnyVal

  case class NumberOfLeaves(value: Int) extends AnyVal

  case class Created(value: java.util.Date) extends AnyVal

}
