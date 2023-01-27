package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfileRow
import io.getquill.*
import zio.{IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource

class ArticlesRepository(quill: SqliteZioJdbcContext[SnakeCase]):

  import quill._
  def list(): ZIO[DataSource, SQLException, List[Article]] = run(
    for {
      ar <- querySchema[ArticleRow](entity = "articles")
      pr <- querySchema[ProfileRow](entity = "users") if pr.userId == ar.authorId
    } yield (ar, pr)
  )
    .map(_.map(article))

  def find(slug: String): ZIO[DataSource, SQLException, Option[Article]] = run(for {
    ar <- querySchema[ArticleRow](entity = "articles") if ar.slug == lift(slug)
    pr <- querySchema[ProfileRow](entity = "users") if pr.userId == ar.authorId
  } yield (ar, pr))
    .map(_.headOption.map(article))

  private def article(tuple: (ArticleRow, ProfileRow)): Article = {
    val (ar, pr) = tuple
    Article(
      ar.slug,
      ar.title,
      ar.description,
      ar.body,
      // TODO implement tagList
      tagList = List(),
      ar.createdAt,
      ar.updatedAt,
      // TODO implement "favorited", "favoritesCount"
      favorited = false,
      favoritesCount = 0,
      // TODO implement "following"
      ArticleAuthor(pr.username, pr.bio, pr.image, following = false)
    )
  }

object ArticlesRepository:
  val live: ZLayer[SqliteZioJdbcContext[SnakeCase], Nothing, ArticlesRepository] = ZLayer.fromFunction(ArticlesRepository(_))
