package com.softwaremill.realworld.common
import com.softwaremill.realworld.articles.ArticlesEndpointsSpec.{suite, test}
import com.softwaremill.realworld.articles.{Article, ArticleAuthor, ArticleData}
import com.softwaremill.realworld.users.{User, UserData}
import zio.json.*
import zio.test.*
import zio.test.Assertion.{equalTo, isEmpty, isNegative}

import java.time.Instant

object JsonEncodingSpec extends ZIOSpecDefault {

  override def spec = suite("JSON encoding for data objects") {
    suite("User related objects")(
      test("User fields with None value are present in rendered json as null values") {
        val user: User = User(
          UserData(
            email = "email@domain.com",
            token = None,
            username = "username",
            bio = None,
            image = None
          )
        )
        assert(user.toJson)(
          equalTo("""{"user":{"email":"email@domain.com","token":null,"username":"username","bio":null,"image":null}}""")
        )
      },
      test("Article fields with None value are present in rendered json as null values") {
        val article: Article = Article(
          ArticleData(
            "how-to-train-your-dragon-2",
            "How to train your dragon 2",
            "So toothless",
            "Its a dragon",
            List("dragons", "goats", "training"),
            Instant.ofEpochMilli(1455765776637L),
            Instant.ofEpochMilli(1455767315824L),
            false,
            1,
            ArticleAuthor("jake", None, Some("https://i.stack.imgur.com/xHWG8.jpg"), following = false)
          )
        )
        assert(article.toJson)(
          equalTo(
            """{"article":{"slug":"how-to-train-your-dragon-2","title":"How to train your dragon 2","description":"So toothless","body":"Its a dragon","tagList":["dragons","goats","training"],"createdAt":"2016-02-18T03:22:56.637Z","updatedAt":"2016-02-18T03:48:35.824Z","favorited":false,"favoritesCount":1,"author":{"username":"jake","bio":null,"image":"https://i.stack.imgur.com/xHWG8.jpg","following":false}}}"""
          )
        )
      }
    )
  }
}
