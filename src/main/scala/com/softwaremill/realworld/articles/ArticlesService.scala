package com.softwaremill.realworld.articles

import com.softwaremill.realworld.profiles.ProfilesRepository
import zio.ZLayer

class ArticlesService(articlesRepository: ArticlesRepository, profilesRepository: ProfilesRepository) {

  def list(): Either[String, List[Article]] = {
    val articles: Seq[Option[Article]] = articlesRepository.list()
      .map(article => profilesRepository.find(article.authorId)
          // TODO implement "following"
          .map(p => ArticleAuthor(p.username, p.bio, p.image, following = false))
          .map(author => Article(
            article.slug,
            article.title,
            article.description,
            article.body,
            article.tagList,
            article.createdAt,
            article.updatedAt,
            // TODO implement "favorited", "favoritesCount"
            favorited = false,
            favoritesCount = 0,
            author
          ))
      )

    def reducer(a: Option[Article], eas: Either[String, List[Article]]): Either[String, List[Article]] = a match
      case Some(value) => eas.map(value :: _)
      case None => Left("Inconsistency: author of one of the articles does not exist.")

    articles.foldRight(Right(List()): Either[String, List[Article]])(reducer)
  }
}

object ArticlesService {

  val live: ZLayer[ArticlesRepository with ProfilesRepository, Nothing, ArticlesService] = ZLayer.fromFunction(ArticlesService(_, _))
}
