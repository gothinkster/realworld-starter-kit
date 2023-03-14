package com.softwaremill.realworld.common

import com.softwaremill.diffx.Diff
import com.softwaremill.realworld.users.{User, UserData, UserWithPassword}

object UserDiff:
  given userDataDiff: Diff[UserData] = Diff.derived[UserData].ignore(_.token)
  given userDiff: Diff[User] = Diff.derived[User]

object UserWithPasswordDiff:
  given userDataDiff: Diff[UserData] = Diff.derived[UserData]
  given UserWithPasswordDiff: Diff[UserWithPassword] = Diff.derived[UserWithPassword].ignore(_.hashedPassword)
