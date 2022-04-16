import { Author, ReadonlyArticle } from '../views/views.models'

export class UserNotAllowedToChangeArticle extends Error {
  constructor(user: Author, article: ReadonlyArticle) {
    super(
      `The user ${user.getAuthorID()} not allowed to change the article ${article.getSlug()}`,
    )
    this.name = 'UserNotAllowedToChangeArticle'
  }
}
