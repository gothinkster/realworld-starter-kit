package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.common.{Exceptions, Pagination}
import zio.{IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class ArticlesService(articlesRepository: ArticlesRepository):

  def list(filters: Map[ArticlesFilters, String], pagination: Pagination): IO[SQLException, List[Article]] = articlesRepository
    .list(filters, pagination)

  def find(slug: String): IO[Exception, Article] = articlesRepository
    .find(slug)
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"Article with slug $slug doesn't exist."))
    }

object ArticlesService:

  val live: ZLayer[ArticlesRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_))
