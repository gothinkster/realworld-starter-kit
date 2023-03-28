package com.softwaremill.realworld.articles

import com.softwaremill.realworld.common.Exceptions.{NotFound, Unauthorized}
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.users.UserMapper.toUserData
import com.softwaremill.realworld.users.{UserData, UserMapper, UserRow, UsersRepository}
import org.sqlite.SQLiteException
import zio.{Console, IO, Task, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource

class ArticlesService(articlesRepository: ArticlesRepository, usersRepository: UsersRepository):

  def list(filters: Map[ArticlesFilters, String], pagination: Pagination): IO[SQLException, List[ArticleData]] = articlesRepository
    .list(filters, pagination)

  def findBySlugAsSeenBy(slug: String, email: String): IO[Exception, ArticleData] = articlesRepository
    .findBySlugAsSeenBy(slug, email)
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"Article with slug $slug doesn't exist."))
    }

  def create(createData: ArticleCreateData, userEmail: String): Task[ArticleData] =
    for {
      user <- userByEmail(userEmail)
      newArticle = createArticleRow(createData, user)
      _ <- articlesRepository.add(newArticle)
      _ <- ZIO.foreach(createData.tagList)(tag => articlesRepository.addTag(tag, newArticle.slug))
      articleData <- findBySlugAsSeenBy(newArticle.slug, userEmail)
    } yield articleData

  private def createArticleRow(createData: ArticleCreateData, userRow: UserRow): ArticleRow = {
    val now = Instant.now()
    ArticleRow(
      slug = createData.title.trim.toLowerCase.replace(" ", "-"),
      title = createData.title.trim,
      description = createData.description,
      body = createData.body,
      createdAt = now,
      updatedAt = now,
      authorId = userRow.userId
    )
  }

  def update(articleUpdateData: ArticleUpdateData, slug: String, email: String): Task[ArticleData] =
    for {
      user <- userByEmail(email)
      maybeOldArticle <- articlesRepository.findBySlugAsSeenBy(slug.trim.toLowerCase, email)
      oldArticle <- ZIO.fromOption(maybeOldArticle).mapError(_ => NotFound(s"Article with slug $slug doesn't exist."))
      _ <- ZIO
        .fail(Unauthorized(s"You're not an author of article that you're trying to update"))
        .when(user.username != oldArticle.author.username)
      updatedArticle = updateArticleData(oldArticle, articleUpdateData)
      _ <- articlesRepository.updateBySlug(updatedArticle, oldArticle.slug)
    } yield updatedArticle

  private def updateArticleData(articleData: ArticleData, updatedData: ArticleUpdateData): ArticleData = {
    articleData.copy(
      slug = updatedData.title
        .map(_.toLowerCase)
        .map(_.trim)
        .map(title => title.replace(" ", "-"))
        .getOrElse(articleData.slug),
      title = updatedData.title.map(_.trim).getOrElse(articleData.title),
      description = updatedData.description.getOrElse(articleData.description),
      body = updatedData.body.getOrElse(articleData.body)
    )
  }

  def makeFavorite(slug: String, email: String): Task[ArticleData] = for {
    user <- userByEmail(email)
    _ <- articlesRepository.makeFavorite(slug, user.userId)
    articleData <- findBySlugAsSeenBy(slug, email)
  } yield articleData

  def removeFavorite(slug: String, email: String): Task[ArticleData] = for {
    user <- userByEmail(email)
    _ <- articlesRepository.removeFavorite(slug, user.userId)
    articleData <- findBySlugAsSeenBy(slug, email)
  } yield articleData

  private def userByEmail(email: String): Task[UserRow] =
    usersRepository.findUserRowByEmail(email).someOrElseZIO(ZIO.fail(NotFound("User doesn't exist, re-login may be needed!")))

object ArticlesService:
  val live: ZLayer[ArticlesRepository with UsersRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_, _))
