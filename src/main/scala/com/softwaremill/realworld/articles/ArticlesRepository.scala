package com.softwaremill.realworld.articles

import io.getquill.*
import zio.{IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource

class ArticlesRepository(quill: SqliteZioJdbcContext[SnakeCase]):

  // TODO user proper db or create in-memory thread-safe store
  private val articles: List[StoredArticle] = List(
    StoredArticle(
      1,
      "dummy-article",
      "Dummy Title",
      "Represents a dummy article.",
      "Dummy body",
      List("dummy", "article"),
      Instant.parse("2016-02-18T03:22:56.637Z"),
      Instant.parse("2016-02-18T03:22:56.637Z"),
      10
    ),
    StoredArticle(
      2,
      "dummy-article-2",
      "Dummy Title 2",
      "Represents a dummy article 2.",
      "Dummy body 2",
      List("dummy", "article", "2"),
      Instant.parse("2018-02-18T03:22:56.637Z"),
      Instant.parse("2018-02-18T03:22:56.637Z"),
      10
    )
  )

  def list(): UIO[List[StoredArticle]] = ZIO.succeed(articles)

  def find(slug: String): IO[Option[Nothing], StoredArticle] = ZIO.fromOption(articles.find(sa => sa.slug == slug))

object ArticlesRepository:
  val live: ZLayer[SqliteZioJdbcContext[SnakeCase], Nothing, ArticlesRepository] = ZLayer.fromFunction(ArticlesRepository(_))
