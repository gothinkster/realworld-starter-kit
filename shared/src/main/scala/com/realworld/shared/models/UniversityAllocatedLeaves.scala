package com.realworld.shared.models

/**
  *.
  */
/////////////////////////////////////////////////////
// UniversityAllocatedLeaves
/////////////////////////////////////////////////////
case class UniversityAllocatedLeaves(
                                      id: UniversityAllocatedLeaves.Id,
                                      year: UniversityAllocatedLeaves.Year,
                                      universityId: University.Id,
                                      numberOfLeaves: UniversityAllocatedLeaves.NumberOfLeaves,
                                      created: UniversityAllocatedLeaves.Created
                                    )

object UniversityAllocatedLeaves {
  def create(
              id: java.util.UUID,
              year: String,
              universityId: java.util.UUID,
              numberOfLeaves: Int,
              created: java.time.LocalDateTime
            ): UniversityAllocatedLeaves = {
    UniversityAllocatedLeaves(
      Id(id),
      Year(year),
      University.Id(universityId),
      NumberOfLeaves(numberOfLeaves),
      Created(created)
    )
  }

  case class Id(value: java.util.UUID) extends AnyVal

  case class Year(value: String) extends AnyVal

  case class NumberOfLeaves(value: Int) extends AnyVal

  case class Created(value: java.time.LocalDateTime) extends AnyVal

}
