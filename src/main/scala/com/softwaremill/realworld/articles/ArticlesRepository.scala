package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesFilters.{Author, Favorited, Tag}
import com.softwaremill.realworld.articles.ArticlesTags.{explodeTags, tagsConcat}
import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.common.Pagination
import io.getquill.*
import zio.{IO, UIO, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource
import scala.collection.immutable

class ArticlesRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*
  def list(filters: Map[ArticlesFilters, String], pagination: Pagination): IO[SQLException, List[Article]] = {
    val tagFilter = filters.getOrElse(Tag, "")
    val favoritedFilter = filters.getOrElse(Favorited, "")
    val authorFilter = filters.getOrElse(Author, "")
    run(for {
      ar <- sql"""
                     SELECT a.slug, a.title, a.description, a.body, a.created_at, a.updated_at, a.author_id
                     FROM articles a
                     LEFT JOIN users authors ON authors.user_id = a.author_id
                     LEFT JOIN favorites_articles fa ON fa.article_slug = a.slug
                     LEFT JOIN users fu ON fu.user_id = fa.profile_id
                     LEFT JOIN tags_articles ta ON a.slug = ta.article_slug
                     WHERE (${lift(tagFilter)} = '' OR ${lift(tagFilter)} = ta.tag)
                          AND (${lift(favoritedFilter)} = '' OR ${lift(favoritedFilter)} = fu.username)
                          AND (${lift(authorFilter)} = '' OR ${lift(authorFilter)} = authors.username)
                     GROUP BY a.slug, a.title, a.description, a.body, a.created_at, a.updated_at, a.author_id
                   """
        .as[Query[ArticleRow]]
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
      .provide(dsLayer)
  }

  def find(slug: String): IO[SQLException, Option[Article]] = run(for {
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
