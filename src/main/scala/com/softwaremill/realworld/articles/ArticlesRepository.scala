package com.softwaremill.realworld.articles

import com.softwaremill.realworld.articles.ArticlesFilters.{Author, Favorited, Tag}
import com.softwaremill.realworld.articles.ArticlesTags.{explodeTags, tagsConcat}
import com.softwaremill.realworld.articles.comments.CommentRow
import com.softwaremill.realworld.articles.model.*
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.users.UserRow
import io.getquill.*
import org.sqlite.{SQLiteErrorCode, SQLiteException}
import zio.{Console, IO, Task, UIO, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource
import scala.collection.immutable

class ArticlesRepository(quill: SqliteZioJdbcContext[SnakeCase], dataSource: DataSource):

  private val dsLayer: ZLayer[Any, Nothing, DataSource] = ZLayer.succeed(dataSource)

  import quill.*

  private inline def queryArticle = quote(querySchema[ArticleRow](entity = "articles"))
  private inline def queryTagArticle = quote(querySchema[ArticleTagRow](entity = "tags_articles"))
  private inline def queryFavoriteArticle = quote(querySchema[ArticleFavoriteRow](entity = "favorites_articles"))
  private inline def queryProfile = quote(querySchema[ProfileRow](entity = "users"))
  private inline def queryUser = quote(querySchema[UserRow](entity = "users"))
  private inline def queryCommentArticle = quote(querySchema[CommentRow](entity = "comments_articles"))

  def list(filters: Map[ArticlesFilters, String], pagination: Pagination): IO[SQLException, List[ArticleData]] = {
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
      tr <- queryTagArticle
        .groupByMap(_.articleSlug)(atr => (atr.articleSlug, tagsConcat(atr.tag)))
        .leftJoin(a => a._1 == ar.slug)
      fr <- queryFavoriteArticle
        .groupByMap(_.articleSlug)(fr => (fr.articleSlug, count(fr.profileId)))
        .leftJoin(f => f._1 == ar.slug)
      pr <- queryProfile if ar.authorId == pr.userId
    } yield (ar, pr, tr.map(_._2), fr.map(_._2)))
      .map(_.map(article))
      .provide(dsLayer)
  }

  def findBySlug(slug: String): IO[SQLException, Option[ArticleData]] =
    run(for {
      ar <- queryArticle if ar.slug == lift(slug)
      tr <- queryTagArticle
        .groupByMap(_.articleSlug)(atr => (atr.articleSlug, tagsConcat(atr.tag)))
        .leftJoin(a => a._1 == ar.slug)
      fr <- queryFavoriteArticle
        .groupByMap(_.articleSlug)(fr => (fr.articleSlug, count(fr.profileId)))
        .leftJoin(f => f._1 == ar.slug)
      pr <- queryProfile if ar.authorId == pr.userId
    } yield (ar, pr, tr.map(_._2), fr.map(_._2), false))
      .map(_.headOption)
      .map(_.map(mapToArticleData))
      .provide(dsLayer)

  def findBySlugAsSeenBy(slug: String, viewerEmail: String): IO[SQLException, Option[ArticleData]] =
    run(for {
      ar <- queryArticle if ar.slug == lift(slug)
      tr <- queryTagArticle
        .groupByMap(_.articleSlug)(atr => (atr.articleSlug, tagsConcat(atr.tag)))
        .leftJoin(a => a._1 == ar.slug)
      fr <- queryFavoriteArticle
        .groupByMap(_.articleSlug)(fr => (fr.articleSlug, count(fr.profileId)))
        .leftJoin(f => f._1 == ar.slug)
      isFavorite = queryUser
        .join(queryFavoriteArticle)
        .on((u, f) => u.email == lift(viewerEmail) && (f.articleSlug == ar.slug) && (f.profileId == u.userId))
        .map(_ => 1)
        .nonEmpty
      pr <- queryProfile if ar.authorId == pr.userId
    } yield (ar, pr, tr.map(_._2), fr.map(_._2), isFavorite))
      .map(_.headOption)
      .map(_.map(mapToArticleData))
      .provide(dsLayer)

  def addTag(tag: String, slug: String): IO[Exception, Unit] = run(
    queryTagArticle
      .insert(
        _.tag -> lift(tag),
        _.articleSlug -> lift(slug)
      )
  ).unit
    .provide(dsLayer)

  def add(article: ArticleRow): Task[Unit] =
    run(queryArticle.insertValue(lift(article))).unit
      .mapError {
        case e: SQLiteException if e.getResultCode == SQLiteErrorCode.SQLITE_CONSTRAINT_PRIMARYKEY =>
          Exceptions.AlreadyInUse("Article name already exists")
        case e => e
      }
      .provide(dsLayer)

  def updateBySlug(updateData: ArticleData, slug: String): IO[Exception, Unit] = run(
    queryArticle
      .filter(_.slug == lift(slug.toLowerCase()))
      .update(
        record => record.slug -> lift(updateData.slug),
        record => record.title -> lift(updateData.title),
        record => record.description -> lift(updateData.description),
        record => record.body -> lift(updateData.body)
      )
  ).unit
    .mapError {
      case e: SQLiteException if e.getResultCode == SQLiteErrorCode.SQLITE_CONSTRAINT_PRIMARYKEY =>
        Exceptions.AlreadyInUse("Article name already exists")
      case e => e
    }
    .provide(dsLayer)

  def makeFavorite(slug: String, userId: Int) = run(
    queryFavoriteArticle.insertValue(lift(ArticleFavoriteRow(userId, slug))).onConflictIgnore
  ).unit.provide(dsLayer)

  def removeFavorite(slug: String, userId: Int) = run(
    queryFavoriteArticle.filter(a => (a.profileId == lift(userId)) && (a.articleSlug == lift(slug))).delete
  ).provide(dsLayer)

  def addComment(slug: String, authorId: Int, comment: String) = {
    val now = Instant.now()
    run {
      queryCommentArticle
        .insert(
          _.articleSlug -> lift(slug),
          _.createdAt -> lift(now),
          _.updatedAt -> lift(now),
          _.authorId -> lift(authorId),
          _.body -> lift(comment)
        )
        .returningGenerated(_.commentId)
    }.provide(dsLayer)
  }

  def findComment(commentId: Int) = run(queryCommentArticle.filter(_.commentId == lift(commentId)))
    .map(_.headOption)
    .provide(dsLayer)
    .someOrFail(Exceptions.NotFound(s"Comment with ID=$commentId doesn't exist"))

  def deleteComment(commentId: Int) = run(queryCommentArticle.filter(_.commentId == lift(commentId)).delete).provide(dsLayer)

  private def article(tuple: (ArticleRow, ProfileRow, Option[String], Option[Int])): ArticleData = {
    val (ar, pr, tags, favorites) = tuple
    ArticleData(
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
      ArticleAuthor(pr.username, Option(pr.bio), Option(pr.image), following = false)
    )
  }

  private val mapToArticleData: ((ArticleRow, ProfileRow, Option[String], Option[Int], Boolean)) => ArticleData = {
    case (ar, pr, tags, favorites, isFavorite) =>
      ArticleData(
        ar.slug,
        ar.title,
        ar.description,
        ar.body,
        tags.map(explodeTags).getOrElse(List()),
        ar.createdAt,
        ar.updatedAt,
        favorited = isFavorite,
        favorites.getOrElse(0),
        // TODO implement "following" (after authentication is ready)
        ArticleAuthor(pr.username, Option(pr.bio), Option(pr.image), following = false)
      )
  }

object ArticlesRepository:

  val live: ZLayer[SqliteZioJdbcContext[SnakeCase] with DataSource, Nothing, ArticlesRepository] =
    ZLayer.fromFunction(new ArticlesRepository(_, _))
