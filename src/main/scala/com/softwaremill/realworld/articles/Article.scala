package com.softwaremill.realworld.articles

import java.time.ZonedDateTime


case class Article(slug: String,
                   title: String,
                   description: String,
                   body: String,
                   tagList: List[String],
                   createdAt: ZonedDateTime,
                   updatedAt: ZonedDateTime,
                   favorited: Boolean,
                   favoritesCount: Int,
                   author: ArticleAuthor)

case class StoredArticle(id: Int,
                         slug: String,
                         title: String,
                         description: String,
                         body: String,
                         tagList: List[String],
                         createdAt: ZonedDateTime,
                         updatedAt: ZonedDateTime,
                         authorId: Int)

case class ArticleAuthor(username: String, bio: String, image: String, following: Boolean)
