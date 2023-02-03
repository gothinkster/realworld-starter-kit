package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfileRow
import Tags.{explodeTags, tagsConcat}
import com.softwaremill.realworld.articles.ArticlesFilters.{Author, Favorited, Tag}
import com.softwaremill.realworld.utils.Pagination
import io.getquill.*
import zio.{IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource
import scala.collection.immutable

class ArticlesRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill._
  // TODO use filters in query
  def list(filters: Map[ArticlesFilters.Filter, String], pagination: Pagination): ZIO[Any, Nothing, List[Article]] = run(for {
    ar <- querySchema[ArticleRow](entity = "articles")
      .drop(lift(pagination.offset))
      .take(lift(pagination.limit))
      .sortBy(ar => ar.slug)
    tr <- querySchema[ArticleTagRow](entity = "tags_articles")
      .groupByMap(_.articleSlug)(atr => (atr.articleSlug, tagsConcat(atr.tag)))
      .leftJoin(a => a._1 == ar.slug)
    fr <- querySchema[ArticleFavoriteRow](entity = "favorites_articles")
      .groupByMap(_.articleSlug)(fr => (fr.articleSlug, count(fr.profileId)))
      .leftJoin(f => f._1 == ar.slug)
    pr <- querySchema[ProfileRow](entity = "users") if ar.authorId == pr.userId
  } yield (ar, pr, tr.map(_._2), fr.map(_._2)))
    .map(_.map(article))
    .orDie
    .provide(dsLayer)

  def find(slug: String): ZIO[Any, Nothing, Option[Article]] = run(for {
    ar <- querySchema[ArticleRow](entity = "articles") if ar.slug == lift(slug)
    tr <- querySchema[ArticleTagRow](entity = "tags_articles")
      .groupByMap(_.articleSlug)(atr => (atr.articleSlug, tagsConcat(atr.tag)))
      .leftJoin(a => a._1 == ar.slug)
    fr <- querySchema[ArticleFavoriteRow](entity = "favorites_articles")
      .groupByMap(_.articleSlug)(fr => (fr.articleSlug, count(fr.profileId)))
      .leftJoin(f => f._1 == ar.slug)
    pr <- querySchema[ProfileRow](entity = "users") if ar.authorId == pr.userId
  } yield (ar, pr, tr.map(_._2), fr.map(_._2)))
    .map(_.headOption)
    .map(_.map(article))
    .orDie
    .provide(dsLayer)

  private def article(tuple: (ArticleRow, ProfileRow, Option[String], Option[Int])): Article = {
    val (ar, pr, tags, favorites) = tuple
    Article(
      ar.slug,
      ar.title,
      ar.description,
      ar.body,
      tags.map(explodeTags).getOrElse(List()),
      ar.createdAt,
      ar.updatedAt,
      // TODO implement "favorited" (after authentication is ready)
      favorited = false,
      favorites.getOrElse(0),
      // TODO implement "following" (after authentication is ready)
      ArticleAuthor(pr.username, pr.bio, pr.image, following = false)
    )
  }

object ArticlesRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, ArticlesRepository] =
    ZLayer.fromFunction(new ArticlesRepository(_, _))
