package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.utils.Exceptions
import zio.{IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class ArticlesService(articlesRepository: ArticlesRepository):

  def list(): ZIO[DataSource, Exception, List[Article]] = articlesRepository
    .list()
    .onError(err => ZIO.logError(err.prettyPrint))

  def find(slug: String): ZIO[DataSource, Exception, Article] = articlesRepository
    .find(slug)
    .foldZIO(
      ex => ZIO.fail(ex),
      r =>
        r match
          case Some(value) => ZIO.succeed(value)
          case None        => ZIO.fail(Exceptions.NotFound(s"Article with slug $slug doesn't exist."))
    )

object ArticlesService:
  val live: ZLayer[ArticlesRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_))
