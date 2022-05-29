import { UnauthorizedException } from '@nestjs/common'
import { Author, ReadonlyArticle } from '../articles.models'

export class UserNotAllowedToChangeArticle extends UnauthorizedException {
  constructor(user: Author, article: ReadonlyArticle) {
    super(
      `The user ${user.getAuthorID()} not allowed to change the article ${article.getSlug()}`,
    )
    this.name = 'UserNotAllowedToChangeArticle'
  }
}
