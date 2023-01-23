package com.softwaremill.realworld.articles

import zio.{UIO, ZIO, ZLayer}

import java.time.ZonedDateTime

class ArticlesRepository:

  // TODO user proper db or create in-memory thread-safe store
  private val articles: List[StoredArticle] = List(
    StoredArticle(
      1,
      "dummy-article",
      "Dummy Title",
      "Represents a dummy article.",
      "Dummy body",
      List("dummy", "article"),
      ZonedDateTime.parse("2016-02-18T03:22:56.637Z"),
      ZonedDateTime.now(),
      10
    ),
    StoredArticle(
      2,
      "dummy-article-2",
      "Dummy Title 2",
      "Represents a dummy article 2.",
      "Dummy body 2",
      List("dummy", "article", "2"),
      ZonedDateTime.now(),
      ZonedDateTime.now(),
      10
    )
  )

  def list(): UIO[List[StoredArticle]] = ZIO.succeed(articles)

object ArticlesRepository:
  val live: ZLayer[Any, Nothing, ArticlesRepository] = ZLayer.succeed(ArticlesRepository())
