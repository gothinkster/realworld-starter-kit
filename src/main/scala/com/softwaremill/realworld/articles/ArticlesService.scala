package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.utils.Exceptions
import zio.{IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class ArticlesService(articlesRepository: ArticlesRepository):

  def list(): ZIO[Any, Nothing, List[Article]] = articlesRepository
    .list()

  def find(slug: String): ZIO[Any, Exceptions.NotFound, Article] = articlesRepository
    .find(slug)
    .flatMap {
      case Some(a) => ZIO.succeed(a)
      case None    => ZIO.fail(Exceptions.NotFound(s"Article with slug $slug doesn't exist."))
    }

object ArticlesService:
  val live: ZLayer[ArticlesRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_))
