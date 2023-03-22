package com.softwaremill.realworld.articles

import com.softwaremill.realworld.common.Exceptions.NotFound
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.users.UserMapper.toUserData
import com.softwaremill.realworld.users.{UserData, UserMapper, UsersRepository}
import zio.{Console, IO, ZIO, ZLayer}

import java.sql.SQLException
import java.time.Instant
import javax.sql.DataSource

class ArticlesService(articlesRepository: ArticlesRepository, usersRepository: UsersRepository):

  def list(filters: Map[ArticlesFilters, String], pagination: Pagination): IO[SQLException, List[ArticleData]] = articlesRepository
    .list(filters, pagination)

  def find(slug: String): IO[Exception, ArticleData] = articlesRepository
    .findBySlug(slug)
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"Article with slug $slug doesn't exist."))
    }

  def create(createData: ArticleCreateData, userEmail: String): IO[Exception, ArticleData] = {
    val title = createData.title.trim
    val slug = title.toLowerCase.replace(" ", "-")

    for {
      maybeUser <- usersRepository.findUserRowByEmail(userEmail)
      user <- ZIO.fromOption(maybeUser).mapError(_ => NotFound("User doesn't exist, re-login may be needed!"))
      newArticle = createArticleData(createData, toUserData(user))
      maybeArticle <- articlesRepository.findBySlug(newArticle.slug)
      _ <- ZIO.fail(Exceptions.AlreadyInUse(s"Article with slug $slug already exists!")).when(maybeArticle.isDefined)
      _ <- articlesRepository.add(newArticle, user.userId)
      _ <- ZIO.foreach(createData.tagList)(tag => articlesRepository.addTag(tag, slug))
    } yield newArticle
  }

  def update(articleUpdateData: ArticleUpdateData, slug: String, email: String): IO[Exception, ArticleData] =
    for {
      maybeOldArticle <- articlesRepository.findBySlugAndEmail(slug.trim.toLowerCase, email)
      oldArticle <- ZIO.fromOption(maybeOldArticle).mapError(_ => NotFound(s"Article with slug $slug doesn't exist."))
      updatedArticle = updateArticleData(oldArticle, articleUpdateData)
      _ <- articlesRepository.updateBySlug(updatedArticle, oldArticle.slug)
      _ <- articlesRepository.updateTagSlugs(updatedArticle.slug, oldArticle.slug)
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

  private def createArticleData(createData: ArticleCreateData, userData: UserData): ArticleData = {
    val now = Instant.now()
    ArticleData(
      slug = createData.title.trim.toLowerCase.replace(" ", "-"),
      title = createData.title.trim,
      description = createData.description,
      body = createData.body,
      tagList = createData.tagList,
      createdAt = now,
      updatedAt = now,
      favorited = false,
      favoritesCount = 0,
      author = ArticleAuthor(
        username = userData.username,
        bio = userData.bio,
        image = userData.image,
        following = false
      ) // TODO update when follows are implemented
    )
  }

object ArticlesService:
  val live: ZLayer[ArticlesRepository with UsersRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_, _))
