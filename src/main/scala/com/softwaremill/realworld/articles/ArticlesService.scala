package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfilesRepository
import zio.{IO, ZIO, ZLayer}

class ArticlesService(articlesRepository: ArticlesRepository, profilesRepository: ProfilesRepository):

  def list(): IO[String, List[Article]] = articlesRepository
    .list()
    .flatMap(sas => ZIO.collectAll(sas.map(article)))
    .onError(err => ZIO.logError(err.prettyPrint))

  private def article(a: StoredArticle): IO[String, Article] = {
    profilesRepository
      .find(a.authorId)
      // TODO implement "following"
      .map(p => ArticleAuthor(p.username, p.bio, p.image, following = false))
      .map(author =>
        Article(
          a.slug,
          a.title,
          a.description,
          a.body,
          a.tagList,
          a.createdAt,
          a.updatedAt,
          // TODO implement "favorited", "favoritesCount"
          favorited = false,
          favoritesCount = 0,
          author
        )
      )
      .mapError(_ => s"Author (id: ${a.authorId} not found for article '${a.slug}'.")
  }

object ArticlesService:

  val live: ZLayer[ArticlesRepository with ProfilesRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_, _))
