package com.softwaremill.realworld.common.model

import com.softwaremill.diffx.Diff
import com.softwaremill.realworld.articles.model.{Article, ArticleAuthor, ArticleData}
import com.softwaremill.realworld.users.{User, UserData, UserWithPassword}

object UserDiff:
  given userDataDiff: Diff[UserData] = Diff.derived[UserData].ignore(_.token)
  given userDiff: Diff[User] = Diff.derived[User]

object UserWithPasswordDiff:
  given userDataDiff: Diff[UserData] = Diff.derived[UserData]
  given UserWithPasswordDiff: Diff[UserWithPassword] = Diff.derived[UserWithPassword].ignore(_.hashedPassword)

object ArticleDiff:

  given articleDiff: Diff[Article] = Diff.derived[Article]
  given articleDataDiff: Diff[ArticleData] = Diff.derived[ArticleData].ignore(_.createdAt).ignore(_.updatedAt)
  given articleAuthorDiff: Diff[ArticleAuthor] = Diff.derived[ArticleAuthor]
