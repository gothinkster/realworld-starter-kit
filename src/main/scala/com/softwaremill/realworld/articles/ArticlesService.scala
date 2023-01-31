package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfileRow
import com.softwaremill.realworld.utils.Exceptions
import zio.{IO, ZIO, ZLayer}

import java.sql.SQLException
import javax.sql.DataSource

class ArticlesService(articlesRepository: ArticlesRepository):

  def list(): ZIO[Any, Nothing, List[Article]] = articlesRepository
    .list()

  def find(slug: String): ZIO[Any, Nothing, Article] = articlesRepository
    .find(slug)
    .some
    .mapError(_ => Exceptions.NotFound(s"Article with slug $slug doesn't exist."))
    .orDie

object ArticlesService:
  val live: ZLayer[ArticlesRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_))
